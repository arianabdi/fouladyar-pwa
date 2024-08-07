import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import {persistStore, persistReducer, createTransform} from 'redux-persist'
import thunkMiddleware from 'redux-thunk';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { axios, Storage, Linking } from '../tools';
import settings from '../settings.json';
import {injectServices} from "../store/utils";

// Define a transform to handle serialization


const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['socket'], // اینجا گفتیم اطلاعات چت رو پرسیست نکن و نگه ندار
}

function storeConfiguration(reducers, initialState = {}) {
  const composeWithDev = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const extraArguments = {
    axios,
    settings,
    Storage,
    Linking,
  };

  const enhancers = composeWithDev(
    applyMiddleware(thunkMiddleware.withExtraArgument(extraArguments)),
  );
  const rootReducer = combineReducers(reducers);
  const persistedReducer = persistReducer(persistConfig, rootReducer)

  const store = createStore(persistedReducer, initialState, enhancers);
  const persistor = persistStore(store);

  return { store, persistor };
}

export default injectServices('reducer')(storeConfiguration);
