import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import gameSlice from "./gameSlice";
import adminSlice from "./adminSlice";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // Using localStorage

// ✅ Step 1: Create a combined reducer
const rootReducer = combineReducers({
  auth: authSlice,
  game: gameSlice,
  admin: adminSlice,
});

// ✅ Step 2: Persist only the necessary reducers
const persistConfig = {
  key: "auth",
  version: 1,
  storage,
  whitelist: ["auth"], // Persist only authSlice
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// ✅ Step 3: Create store with persisted reducer
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
