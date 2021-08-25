import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    isLoading: true,

    product: {},
    isUpdateLoading: true,
    createProductResult: null,

    createProductMessage: null,
    createProductAlertStatus: false,
    createProductAlertType: null,
  },
  reducers: {
    getProducts: () => {},

    setProducts: (state, action) => {
      state.products = action.payload;
      state.isLoading = false;
    },

    getSpecificProduct: (state, action) => {},

    setSpecificProduct: (state, action) => {
      state.product = action.payload;
      state.isUpdateLoading = false;
    },

    createProduct: () => {},

    setCreateProducts: (state, action) => {
      state.createProductMessage = action.payload.message;
      state.createProductAlertType = "success";
      state.createProductResult = true;

      console.log("responsessss", state.createProductSuccess);
    },

    setCreateProductFailier: (state, action) => {
      state.createProductMessage = action.payload;
      state.createProductAlertType = "error";
      state.createProductAlertStatus = true;

      console.log("responsessss", state.createProductSuccess);
    },

    clearProductStates: (state, action) => {
      state.createProductMessage = "";
      state.createProductAlertType = "";
      state.createProductAlertStatus = "";
    },

    clearProductStatesAndCreate: (state, action) => {
      state.createProductMessage = "";
      state.createProductAlertType = "";
      state.createProductAlertStatus = "";
      state.createProductResult = false;
    },

    // UPDATE STATES
    update_setProductName: (state, action) => {
      state.product.name = action.payload;
    },

    update_setProductType: (state, action) => {
      state.product.category = action.payload;
    },
    update_setProductPrice: (state, action) => {
      state.product.prices.price = action.payload;
    },
    update_setProductDiscount: (state, action) => {
      state.product.prices.discount = action.payload;
    },
    update_setProductQty: (state, action) => {
      state.product.qty = action.payload;
    },
    update_setProductActive: (state, action) => {
      state.product.isActive = action.payload;
    },

    update_setProductImageUrl: (state, action) => {
      state.product.imgUrl = action.payload;
    },

    update_setProductDescription: (state, action) => {
      state.product.description = action.payload;
    },

    update_setProductWeight: (state, action) => {
      state.product.weight = action.payload;
    },
  },
});

export const {
  getProducts,
  setProducts,
  createProduct,
  setCreateProducts,
  getSpecificProduct,
  setSpecificProduct,
  update_setProductName,
  update_setProductType,
  update_setProductPrice,
  update_setProductDiscount,
  update_setProductQty,
  update_setProductActive,
  update_setProductImageUrl,
  setCreateProductFailier,
  clearProductStates,
  clearProductStatesAndCreate,
  update_setProductDescription,
  update_setProductWeight,
} = productSlice.actions;

export default productSlice.reducer;
