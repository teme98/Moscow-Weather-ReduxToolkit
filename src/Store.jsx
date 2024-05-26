import { configureStore } from "@reduxjs/toolkit";
import myWeather from "./ApiSlice.jsx";

export const store = configureStore({
  reducer: {
    x: myWeather,
  },
});
