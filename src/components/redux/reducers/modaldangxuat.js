import { INIT_STATE } from "../../constant";
import { getType, hideModalDangXuat, showModalDangXuat } from "../actions";

export default function modalReducers(state = INIT_STATE.modalDangXuat, action) {
  switch (action.type) {
    case getType(showModalDangXuat):
      return {
        isShowDangXuat: true,
      };
    case getType(hideModalDangXuat):
      return {
        isShowDangXuat: false,
      };
    default:
      return state;
  }
}
