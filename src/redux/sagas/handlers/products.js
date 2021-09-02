import { call, put } from "redux-saga/effects";
import {
  setProducts,
  setCreateProducts,
  setSpecificProduct,
  setCreateProductFailier,
} from "../../productSlice";
import {
  requestGetProducts,
  requestCreateProduct,
  requestSpecificProduct,
} from "../requests/products";

export function* handleGetProducts(action) {
  try {
    const response = yield call(requestGetProducts);
    const { data } = response;
    yield put(setProducts([...data]));
  } catch (error) {
    console.log(error);
  }
}

export function* handleCreateProduct(action) {
  try {
    const response = yield call(requestCreateProduct, action.payload);
    const { data } = response;
    yield put(setCreateProducts({ ...data }));
  } catch (error) {
    yield put(setCreateProductFailier(error.response.data));
  }
}

export function* handleGetSpecificProduct(action) {
  try {
    const response = yield call(requestSpecificProduct, action.payload);
    const { data } = response;
    yield put(setSpecificProduct({ ...data }));
  } catch (error) {
    console.log(error.message);
  }
}
