import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import ActionTypes from '../constants/index';

const { REQUEST_SENTIMENT_REPORT_PENDING, REQUEST_SENTIMENT_REPORT_SUCCESS, REQUEST_SENTIMENT_REPORT_FAILURE } = ActionTypes;

const DEFAULT_STATE = fromJS({
  status: 'idle',
  error: false,
  meta: {
    error: {},
  },
  sentimentCount: {
    total: 0,
    positive: 0,
    negative: 0,
    neutral: 0,
    unknown: 0,
  },
  percentage: {
    positive: 0.00,
    negative: 0.00,
    neutral: 0.00,
    unknown: 0.00,
  },
});

const reducer = handleActions(
  {
    REQUEST_SENTIMENT_REPORT_PENDING: (state, action) => state.set('status', 'pending'),
    REQUEST_SENTIMENT_REPORT_SUCCESS: (state, action) => {
      const { sentimentCount, percentage } = action.payload;
      let newState = state.set('sentimentCount', sentimentCount);
      newState = newState.set('percentage', percentage);
      return newState;
    },
    REQUEST_SENTIMENT_REPORT_FAILURE: (state, action) => {
      // payload: error,
      // error: true
      const { payload, error } = action;
      let newState = state.setIn(['meta', 'error'], payload);
      newState = newState.set('error', true);
      return newState;
    },
  },
  DEFAULT_STATE,
);

export default reducer;
