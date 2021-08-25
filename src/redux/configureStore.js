import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
  applyMiddleware,
} from "@reduxjs/toolkit";
import popupSlice from "./popupSlice";
import signUpSlice from "./signUpSlice";
import userSlice from "./userSlice";
import productSlice from "./productSlice";
import createSagaMiddleware from "redux-saga";
import { watcherSaga } from "./sagas/rootSaga";
// import { applyMiddleware } from "redux";

const reducer = combineReducers({
  popup: popupSlice,
  signin: signUpSlice,
  user: userSlice,
  product: productSlice,
});

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

// const store = configureStore({
//   reducer,
//   middleware: [...getDefaultMiddleware({ thunk: false })],
// });

const store = configureStore({
  reducer,
  middleware: [...getDefaultMiddleware({ thunk: false }), sagaMiddleware],
});

sagaMiddleware.run(watcherSaga);

export default store;
