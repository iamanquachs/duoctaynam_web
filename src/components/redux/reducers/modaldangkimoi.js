import { INIT_STATE } from "../../constant";
import { getType, hideModalDKMoi, showModalDKMoi } from "../actions";

export default function modalReducers(state = INIT_STATE.modalDKMoi, action) {
  switch (action.type) {
    case getType(showModalDKMoi):
      return {
        isShowDKMoi: true,
      };
    case getType(hideModalDKMoi):
      return {
        isShowDKMoi: false,
      };
    default:
      return state;
  }
}
