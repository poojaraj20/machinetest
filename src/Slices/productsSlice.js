import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const res = await axios.get("https://fakestoreapi.com/products");
    return res.data;
  }
);
const savedProducts = JSON.parse(localStorage.getItem("products")) || [];


const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: savedProducts,
    loading: false,
    error: null,
  },

  reducers: {
    addProduct: (state, action) => {
      state.items.push(action.payload);
      localStorage.setItem("products", JSON.stringify(state.items));
    },
    updateProduct: (state, action) => {
      const index = state.items.findIndex(p => p.id === action.payload.id);
      if (index !== -1) state.items[index] = action.payload;
      localStorage.setItem("products", JSON.stringify(state.items));
    },
    deleteProduct: (state, action) => {
      state.items = state.items.filter(p => p.id !== action.payload);
      localStorage.setItem("products", JSON.stringify(state.items));
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {

        const localData = JSON.parse(localStorage.getItem("products")) || [];
        const merged = [...action.payload, ...localData.filter(lp => !action.payload.find(ap => ap.id === lp.id))];
        state.items = merged;
        localStorage.setItem("products", JSON.stringify(merged));
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, state => {
        state.loading = false;
        state.error = "Failed to load products";
      });
  },
});

export const { addProduct, updateProduct, deleteProduct } = productsSlice.actions;
export default productsSlice.reducer;
