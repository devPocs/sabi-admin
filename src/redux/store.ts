import { configureStore, combineReducers } from "@reduxjs/toolkit";
import usersReducer from "./reducers/usersSlice";
import { persistReducer, persistStore } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";

const persistConfig = {
  key: "root",
  storage: storageSession,
  whitelist: ["user", "theme"],
};

const rootReducer = combineReducers({
  user: usersReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"], // Ignore serializability checks for certain actions
        ignoredPaths: ["register"], // If `register` contains a non-serializable value
      },
    }),
});

export const persistor = persistStore(store);
