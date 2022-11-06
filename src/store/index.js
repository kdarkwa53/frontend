import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducer from "./reducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const middlewares = [thunkMiddleware];
const logger = createLogger({ collapsed: true });
middlewares.push(logger);

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["acceptMortgage", "savings", "login", "profile",]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(...middlewares))
);
let persistor = persistStore(store);

export { persistor, store }; 
