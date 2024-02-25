import { createActions, createAction } from "redux-actions";

export const getType = (reduxAction) => {
  return reduxAction().type;
};

//todo push gio hang
export const createGiohang = createActions({
  createGiohangRequest: (payload) => payload,
  createGiohangSuccess: (payload) => payload,
  createGiohangFailure: (err) => err,
});

//todo push gio hang
export const createFilter = createActions({
  createFilterRequest: (payload) => payload,
  createFilterSuccess: (payload) => payload,
  createFilterFailure: (err) => err,
});
export const showModal = createAction("SHOW_MODAL");
export const hideModal = createAction("HIDE_MODAL");

export const showModalImage = createAction("SHOW_MODAL_IMG");
export const hideModalImage = createAction("HIDE_MODAL_IMG");

export const showModalDKMoi = createAction("SHOW_DKMOI");
export const hideModalDKMoi = createAction("HIDE_DKMOI");

export const showModalDangXuat = createAction("SHOW_DANGXUAT");
export const hideModalDangXuat = createAction("HIDE_DANGXUAT");

export const isChecked = createAction("IS_CHECK");
export const hideCheck = createAction("HIDE_CHECK");

export const isLogin = createAction("IS_LOGIN");
export const hideLogin = createAction("HIDE_LOGIN");

export const isHistory = createAction("IS_HISTORY");
export const hideHistory = createAction("HIDE_HISTORY");

export const isShowHistory = createAction("IS_HISTORY");
export const hideShowHistory = createAction("HIDE_HISTORY");


export const isShowDHTC = createAction("IS_DHTC");
export const hideShowDHTC = createAction("HIDE_DHTC");

export const isShowFind = createAction("IS_Find");
export const hideShowFind = createAction("HIDE_Find");