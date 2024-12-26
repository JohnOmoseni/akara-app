import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AppStateReducer from "./features/appSlice";
import api from "@/server/api";

const rootReducer = combineReducers({
  appState: AppStateReducer,

  [api.reducerPath]: api.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(api.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
