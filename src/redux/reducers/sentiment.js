import * as sentimentAct from '../constants/sentiment';

const initState = {
    checking: false,
    checked: false,
    error: null
}

const sentimentReducer  = (state = initState, action) => {
    switch(action.type){
        case sentimentAct.DO_CHECK_SENTIMENT: {
            return {
                ...state,
                checking: true
            }
        }
        case sentimentAct.CHECK_SENTIMENT_SUCCESSED: {
            return {
                ...state,
                checking: false,
                checked: true
            }
        }
        case sentimentAct.CHECK_SENTIMENT_FAILED: {
            return {
                ...state,
                checking: false,
                checked: false,
                error: action.payload
            }
        }
        default: {
            return state;
        }
    }
}

export default sentimentReducer;