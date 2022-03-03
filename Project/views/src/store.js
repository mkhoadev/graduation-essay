import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./redux/userSlice";
import employeeReducer from "./redux/employeeSlice";
import productReducer from "./redux/productSlice";
import colorReducer from "./redux/colorSlice";
import brandReducer from "./redux/brandSlice";
import sizeReducer from "./redux/sizeSlice";
import typeProductReducer from "./redux/typeProductSlice";

const rootReducer = {
  user: userReducer,
  employee: employeeReducer,
  product: productReducer,
  color: colorReducer,
  brand: brandReducer,
  size: sizeReducer,
  typeProduct: typeProductReducer,
};
const store = configureStore({
  reducer: rootReducer,
});

export default store;
