import { UPDATE_VALUE } from "./actionType";


export const updateValue = (value) => {
    return {
      type: UPDATE_VALUE,
      payload: value,
    };
};