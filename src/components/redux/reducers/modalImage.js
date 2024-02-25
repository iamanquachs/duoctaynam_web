import { INIT_STATE } from "../../constant";
import { getType, hideModalImage, showModalImage } from "../actions";

export default function modalReducers(state = INIT_STATE.modalImage, action) {
  switch (action.type) {
    case getType(showModalImage):
      return {
        isShow: true,
      };
    case getType(hideModalImage):
      return {
        isShow: false,
      };
    default:
      return state;
  }
}
