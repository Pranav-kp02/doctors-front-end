import { combineReducers, configureStore } from "@reduxjs/toolkit";
import doctorsSlice from "./doctorsSlice";
import adminSlice from "./adminSlice";
import userAuthentication from "./userAuthenticationSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userAth"], // only navigation will be persisted
};

const rootReducer = combineReducers({
  userAth: userAuthentication,
  doctors: doctorsSlice,
  Admin: adminSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;

export const persistor = persistStore(store);
