import { INIT_STATE } from "../../constant";
import { getType, isChecked, hideCheck } from "../actions";

export default function checkReducers(state = INIT_STATE.checked, action) {
  switch (action.type) {
    case getType(isChecked):
      return {
        isCheck: true,
      };
    case getType(hideCheck):
      return {
        isCheck: false,
      };
    default:
      return state;
  }
}
