import ThemeProvider from "./layout/provider/Theme";
import {Provider, useDispatch, useSelector} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {configureApp} from "./redux/configs";
import i18next from "i18next";
import {I18nextProvider} from "react-i18next";
import {IconContext} from "react-icons";
import * as en_US from "./locales/en_US.json";
import * as fa_IR from "./locales/fa_IR.json";
import Router from "./route";
import React, {useEffect} from "react";
import {Toaster} from "react-hot-toast";
import {
  selectActiveChatId,
  selectActiveChatMessages,
  selectChats
} from "./redux/store/services/socket/store/socket-selector";
import {
  connectSocket, disconnectSocket,
  receiveAllChats, receiveAllMessages,
  receiveMessage,
  receiveNewChat, sendMessage, switchChat
} from "./redux/store/services/socket/store/socket-actions";
import {selectAuthToken} from "./redux/store/services/auth/store/auth-selectors";
import {io} from "socket.io-client";

const configs = configureApp();
export const { store, persistor } = configs;
i18next.init({
  lng: "fa", // if you're using a language detector, do not define the lng option
  fallbackLng: "fa",
  interpolation: {
    escapeValue: false
  },
  resources: {
    en: en_US,
    fa: fa_IR
  }// React already does escaping
});

const AppWrapper = () => {


  return (
      <Provider store={configs.store}>
        <App />
      </Provider>
  )
}



const App = () => {


  const dispatch = useDispatch();

  // Redux Selector
  const socket = useSelector((state) => state.socket.socket);
  const profile = useSelector((state) => state.profile);
  // const chats = useSelector(selectChats);
  const token = useSelector(selectAuthToken);
  const activeChatId = useSelector(selectActiveChatId);
  const activeChatMessages = useSelector(selectActiveChatMessages);

  useEffect(() => {


    const socket = io(process.env.REACT_APP_WEBSOCKET_URL, {
      autoConnect: true,
      secure: true,
      // transports: ['websocket'],
      extraHeaders: {
        authorization: token
      },
    });

    socket.connect()
    socket.on('connect', () => {
      console.log('connect', socket)
      dispatch(connectSocket(socket));
    });

    socket.on('addMessage', (message) => {
      console.log('receiveMessage', message)
      dispatch(receiveMessage(message.conversationId, {
        ...message,
        isMine: message.userId === profile.userId
      }));
    });

    socket.on('conversations', (e) => {
      console.log('receiveAllChats', e)
      dispatch(receiveAllChats(e.items.filter(item => item.lastMessage && item.lastMessageAt)));
    });

    socket.on('conversationMessages', (e) => {
      console.log('receiveAllMessages', e)
      dispatch(receiveAllMessages(e.items));
    });

    socket.on('updateConversation', (newChat) => {
      console.log('receiveNewChat', newChat)
      dispatch(receiveNewChat(newChat));
    });

    return () => {
      socket.disconnect();
      dispatch(disconnectSocket());
    };
  }, [token]);



  const handleSendMessage = (chatId, message) => {
    dispatch(sendMessage(chatId, message));
  };




  return (
    <ThemeProvider>
      <IconContext.Provider value={{ color: "blue", className: "global-class-name" }}>

          <PersistGate loading={null} persistor={configs.persistor}>
            <Toaster
              position="top-center"
              reverseOrder={true}
            />
            <I18nextProvider i18n={i18next}>
              <Router />
            </I18nextProvider>
          </PersistGate>

      </IconContext.Provider>
    </ThemeProvider>
  );
};


export default AppWrapper;