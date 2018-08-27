import ActionTypes from '../constants/index';

export const changeSentimentFilter = ({ payload }) => {
    return {
        type: ActionTypes.CHANGE_SENTIMENT_STATUS,
        payload: {
            sentiment: payload
        }
    }
}
