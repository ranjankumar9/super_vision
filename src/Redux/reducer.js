import { UPDATE_VALUE } from "./actionType";

const initialState = {
    value: "",
    isLoading: false,
    isError: true
}

const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case UPDATE_VALUE:
            return {
                ...state,
                value: payload,
            };
        default:
            return state;
    }
}

export { reducer };