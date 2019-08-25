import { RECIEVE_QUOTE } from '../constants';

const quote = (state = { text: "", author: "" }, action) => {
    switch (action.type) {
        case RECIEVE_QUOTE:
            return { ...action.quote };
        default:
            return state;
    }
}

export default quote