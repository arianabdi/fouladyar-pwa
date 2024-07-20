import React from "react";
// import { ChatContext } from "./ChatContext";

const ChatBody = ({
                      id,
                      name,
                      avatar,
                      replyMsg,
                      onSendMessage,
                      onReplyMessage,
                      onReplyMessageClose,
                      onForwardMessage,
                      // chat
                  }) => {
    // const { deleteConvo, propAction, chatState } = useContext(ChatContext);
    // const [chat, setChat] = chatState;


    // const activeChatMessages = useSelector(selectActiveChatMessages);

    // useEffect(() => {
    //     activeChatMessages.forEach((item) => {
    //         if (item.id === id) {
    //             setUchat(item);
    //         }
    //     });
    // }, [id, activeChatMessages]);


    const onRemoveMessage = (idx, id) => {
        // let allChat = chat;
        // let cindex = allChat.find((item) => item.id === id);
        // let defaultChat = Uchat;
        // let newConvo = defaultChat.conversations;
        // let index = newConvo.findIndex((item) => item.id === id);
        // newConvo[index].chat[idx] = "deleted";
        //
        // allChat[cindex] = defaultChat;
        // setChat([...allChat]);
    };


    // useEffect(() => {
    //     if (lastMessageRef.current) {
    //         lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    //     }
    // }, [activeChatMessages]);


    return (
        <React.Fragment>
            {/*<ModalHelper*/}
            {/*    open={isModalOpen}*/}
            {/*    onOpen={() => setIsModalOpen(true)}*/}
            {/*    onClose={() => setIsModalOpen(false)}*/}
            {/*    component={modalComponent}*/}
            {/*/>*/}
            {/*<MessageActionMenu/>*/}

        </React.Fragment>
    );
};

export default ChatBody;
