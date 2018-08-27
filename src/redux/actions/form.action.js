import ActionTypes from '../constants/index';

export const changeService = ({ payload }) => {
    return {
        type: ActionTypes.USER_CHANGE_SERVICE,
        payload: {
            service: payload.service
        }
    }
}

export const changeDateRangeForService = ({ payload }) => {
    return {
        type: ActionTypes.USER_CHANGE_DATE_RANGE,
        payload: {
            dateFrom: payload.dateFrom,
            dateTo: payload.dateTo
        }
    }
}