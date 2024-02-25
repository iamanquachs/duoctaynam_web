import { takeEvery, call, put } from "redux-saga/effects";
import * as actions from "../actions";
import giohangApi from "../../../pages/api/giohangApi";
import hanghoaApi from "../../../pages/api/hanghoaApi";
function* createGiohangSaga(action) {
  try {
    const giohang = yield call(giohangApi.listgiohang, action.payload);
    yield put(actions.createGiohang.createGiohangSuccess(giohang));
  } catch (err) {
    console.error(err);
  }
}
function* createFilterSaga(action) {
  try {
    const filter = yield call(hanghoaApi.list_filter, action.payload);
    yield put(actions.createFilter.createFilterSuccess(filter));
  } catch (err) {
    console.error(err);
  }
}

function* mySaga() {
  yield takeEvery(
    actions.createGiohang.createGiohangRequest,
    createGiohangSaga
  );
  yield takeEvery(actions.createFilter.createFilterRequest, createFilterSaga);
}

export default mySaga;
