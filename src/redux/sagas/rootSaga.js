import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { getUser } from "../userSlice";
import { handleGetUser } from "./handlers/user";
import {
  getProducts,
  createProduct,
  getSpecificProduct,
} from "../productSlice";
import {
  handleGetProducts,
  handleCreateProduct,
  handleGetSpecificProduct,
} from "./handlers/products";

export function* watcherSaga() {
  yield takeLatest(getUser.type, handleGetUser);
  yield takeLatest(getProducts.type, handleGetProducts);
  yield takeLatest(createProduct.type, handleCreateProduct);
  yield takeLatest(getSpecificProduct.type, handleGetSpecificProduct);
}
