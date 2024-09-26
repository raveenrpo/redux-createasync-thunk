import { configureStore } from "@reduxjs/toolkit";
import notereducer from "./Noteslice";
const Store = configureStore({
  reducer: {
    note: notereducer,
  },
});

export default Store;
