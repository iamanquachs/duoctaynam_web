import { INIT_STATE } from "../../constant";
import { getType, hideHistory, isHistory } from "../actions";

export default function modalReducers(state = INIT_STATE.history, action) {
  switch (action.type) {
    case getType(isHistory):
      return {
        isHistory: true,
      };
    case getType(hideHistory):
      return {
        isHistory: false,
      };
    default:
      return state;
  }
}
