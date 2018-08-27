import { createAction } from 'redux-actions';
import axios from 'axios';
import featherService from 'feathers-client/services';
import * as sentimentConst from '../constants/sentiment';
import config from '../../config';
import ActionTypes from '../constants/index';
import selectors from '../selectors/index';

const { apiDomain } = config;
const host = apiDomain;

// sentimentData = {
//   id: this.props.item.id, // _id of record
//   branchName: this.props.item.branchName, // branch name
//   industryName: this.props.item.industryName, // industry
//   serviceName: this.props.item.serviceName // service name
// };

export const doCheckSentiment = () => ({
  type: sentimentConst.DO_CHECK_SENTIMENT,
});

export const checkSentimentSuccessed = () => ({
  type: sentimentConst.CHECK_SENTIMENT_SUCCESSED,
});

export const checkSentimentFailed = err => ({
  type: sentimentConst.CHECK_SENTIMENT_FAILED,
  payload: err,
});

export const requestCheckSentiment = sentimentData => async (dispatch) => {
  try {
    dispatch(doCheckSentiment());
    const checkStt = await axios.post(
      `${host}/do-check-sentiment`,
      sentimentData,
    );
    dispatch(checkSentimentSuccessed());
    return Promise.resolve(checkStt);
  } catch (e) {
    dispatch(checkSentimentFailed(e.message));
    return Promise.reject(e);
  }
};

export const updateSentiment = (payload) => {
  const { updatedSentiment } = payload;
  if (updatedSentiment.contentType === 'post') {
    return {
      type: ActionTypes.UPDATE_POST_SENTIMENT,
      payload: {
        updatedSentiment,
      },
    };
  }
  return {
    type: ActionTypes.UPDATE_COMMENT_SENTIMENT,
    payload: {
      updatedSentiment,
    },
  };
};

export const requestSentimentReportPending = createAction(ActionTypes.REQUEST_SENTIMENT_REPORT_PENDING);
export const requestSentimentReportSuccess = createAction(ActionTypes.REQUEST_SENTIMENT_REPORT_SUCCESS);
export const requestSentimentReportFailure = createAction(ActionTypes.REQUEST_SENTIMENT_REPORT_FAILURE);
export const requestSentimentReport = data => async (dispatch, getState) => {
  const rootstate = getState();
  const { dateFrom, dateTo } = selectors.getFormatDate(rootstate);
  const contentType = selectors.getFilter(rootstate).service;
  // queryCondition.query.created_date = { $gte: from, $lt: to };
  dispatch(requestSentimentReportPending());
  try {
    const query = {
      content_type: contentType,
      created_date: { $gte: new Date(dateFrom), $lt: new Date(dateTo) },
      assigned: true,
      // sentiments: {
      //   $elemMatch: {
      //     brand: {$ne: 'PTO'}
      //   }
      // }
    };
    const result = await featherService.sentimentReport.find({ query });
    console.log(result);
    dispatch(requestSentimentReportSuccess(result));
  } catch (error) {
    console.log(error);
    dispatch(requestSentimentReportFailure(error));
  }
};
