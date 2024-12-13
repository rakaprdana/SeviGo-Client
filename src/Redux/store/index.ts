import { configureStore } from "@reduxjs/toolkit";
import historyReducer from "../reducer/historySlice";
import complaintsReducer from "../reducer/complaintsSlice";
const store = configureStore({
  reducer: {
    history: historyReducer,
    complaints: complaintsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
