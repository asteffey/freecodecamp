import { RECIEVE_QUOTE } from "../actions/fetchQuote"

const quote = (state = { text: "", author: "" }, action) => {
    switch (action.type) {
        case RECIEVE_QUOTE:
            return Object.assign({}, action.quote);
        default:
            return state;
    }
}

export default quote