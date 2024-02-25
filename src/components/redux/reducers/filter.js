import { INIT_STATE } from "../../constant";
import { createFilter, getType } from "../actions";

export default function filterReducers(state = INIT_STATE.filter, action) {
  switch (action.type) {
    case getType(createFilter.createFilterSuccess):
      return (state = action.payload);
    default:
      return state;
  }
}
