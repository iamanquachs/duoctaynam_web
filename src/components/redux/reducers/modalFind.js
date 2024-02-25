import { INIT_STATE } from "../../constant";
import { getType, hideShowFind, isShowFind } from "../actions";

export default function modalFind(state = INIT_STATE.modalFind, action) {
  switch (action.type) {
    case getType(isShowFind):
      return {
        isShowFind: true,
      };
    case getType(hideShowFind):
      return {
        isShowFind: false,
      };
    default:
      return state;
  }
}
