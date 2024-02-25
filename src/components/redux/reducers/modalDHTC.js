import { INIT_STATE } from "../../constant";
import { getType, hideShowDHTC, isShowDHTC } from "../actions";

export default function modalDHTC(state = INIT_STATE.modalDHTC, action) {
  switch (action.type) {
    case getType(isShowDHTC):
      return {
        isShowDHTC: true,
      };
    case getType(hideShowDHTC):
      return {
        isShowDHTC: false,
      };
    default:
      return state;
  }
}
