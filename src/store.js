import { configureStore } from "@reduxjs/toolkit";
import { api } from "./services/UserData";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(api.middleware);
  },
});
