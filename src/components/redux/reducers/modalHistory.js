import { INIT_STATE } from "../../constant";
import { getType, hideShowHistory, isShowHistory } from "../actions";

export default function modalReducers(state = INIT_STATE.modalHistory, action) {
  switch (action.type) {
    case getType(isShowHistory):
      return {
        isShowHistory: true,
      };
    case getType(hideShowHistory):
      return {
        isShowHistory: false,
      };
    default:
      return state;
  }
}
