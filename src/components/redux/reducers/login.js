import { INIT_STATE } from "../../constant";
import { getType, hideLogin, isLogin } from "../actions";

export default function modalReducers(state = INIT_STATE.login, action) {
  switch (action.type) {
    case getType(isLogin):
      return {
        isLogin: true,
      };
    case getType(hideLogin):
      return {
        isLogin: false,
      };
    default:
      return state;
  }
}
