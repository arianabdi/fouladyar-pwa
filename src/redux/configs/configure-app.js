import {configureStore} from "./index";


export default function configureApp() {
  const {store, persistor} = configureStore();


  return {
    store,
    persistor
  };
}
