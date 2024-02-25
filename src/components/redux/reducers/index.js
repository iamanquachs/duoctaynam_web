import { combineReducers } from "redux";
import giohang from "./giohang";
import filter from "./filter";
import modal from "./modal";
import modalImage from "./modalImage";
import modalDKMoi from "./modaldangkimoi";
import modalDangXuat from "./modaldangxuat";
import checked from "./checked";
import isLogin from "./login";
import modalHistory from "./modalHistory";
import history from "./history";
import modalDHTC from "./modalDHTC";
import modalFind from "./modalFind";

export default combineReducers({
  giohang,
  filter,
  modal,
  modalImage,
  modalDKMoi,
  modalDangXuat,
  checked,
  isLogin,
  modalHistory,
  modalDHTC,
  modalFind,
  history,
});
