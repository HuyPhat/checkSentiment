import { fromJS } from 'immutable';
import { subDays } from 'date-fns';
import ActionTypes from '../constants/index';

const today = new Date();
const twoDaysAgo = subDays(today, 2);

const DEFAULT_STATE = fromJS({
  service: 'post',
  dateFrom: twoDaysAgo.toISOString(),
  dateTo: today.toISOString(),
  sentiment: 'all',
});

const filter = {
  reducer: (state = DEFAULT_STATE, action) => {
    switch (action.type) {
      case ActionTypes.USER_CHANGE_SERVICE:
        return state.set('service', action.payload.service);
      case ActionTypes.USER_CHANGE_DATE_RANGE:
        return state.merge({ dateFrom: action.payload.dateFrom, dateTo: action.payload.dateTo });
      case ActionTypes.CHANGE_SENTIMENT_STATUS:
        return state.set('sentiment', action.payload.sentiment);
      default:
        return state;
    }
  },
};

export default filter;
