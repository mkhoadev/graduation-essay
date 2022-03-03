import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import productAPI from "../api/productAPI";

export const product = createAsyncThunk("product/list", async () => {
  const data = await productAPI.getListProducts();

  localStorage.setItem("productlist", JSON.stringify(data));

  return data;
});

const productSlice = createSlice({
  name: "product",
  initialState: {
    productlist: JSON.parse(localStorage.getItem("product")) || [{}],
  },
  reducers: {},
  extraReducers: {
    [product.fulfilled]: (state, action) => {
      state.productlist = action.payload;
    },
  },
});

const {reducer} = productSlice;
export default reducer;
