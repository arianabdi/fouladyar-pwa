import ThemeProvider from "./layout/provider/Theme";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { configureApp } from "./redux/configs";
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
import { IconContext } from "react-icons";
import * as en_US from "./locales/en_US.json";
import * as fa_IR from "./locales/fa_IR.json";
import Router from "./route";
import React from "react";
import { Toaster } from "react-hot-toast";

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


const App = () => {

  return (
    <ThemeProvider>
      <IconContext.Provider value={{ color: "blue", className: "global-class-name" }}>
        <Provider store={configs.store}>
          <PersistGate loading={null} persistor={configs.persistor}>
            <Toaster
              position="top-center"
              reverseOrder={true}
            />
            <I18nextProvider i18n={i18next}>
              <Router />
            </I18nextProvider>
          </PersistGate>
        </Provider>
      </IconContext.Provider>
    </ThemeProvider>
  );
};
export default App;
