import { INIT_STATE } from "../../constant";
import { createGiohang, getType } from "../actions";

export default function giohangReducers(state = INIT_STATE.giohang, action) {
  switch (action.type) {
    case getType(createGiohang.createGiohangSuccess):
      return (state = action.payload);
    default:
      return state;
  }
}
