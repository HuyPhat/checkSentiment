import _ from 'lodash';
import featherService from 'feathers-client/services';
import ActionTypes from '../constants/index';
import selectors from '../selectors/index';

export const fetchContentBySentimentType = (sentimentType, service = 'content') => async (dispatch, getState) => {
  const rootstate = getState();
  const filterState = selectors.getFilter(rootstate);
  const date = selectors.getFormatDate(rootstate);
  const backendService = featherService[service];

  try {
    dispatch({
      type: ActionTypes.FETCH_CONTENT_BY_SENTIMENT_TYPE_PENDING,
      payload: {},
    });

    // const optionQuery = {
    //     brand: { $ne: 'PTO' }
    // }

    // if (sentimentType !== 'all') {
    //     optionQuery.sentiment = sentimentType
    // }

    // console.log('optionQuery ', optionQuery);
    // 1
    // const response = await backendService.find({
    //     query: {
    //         _aggregate: [
    //             {
    //                 $match: {
    //                     content_type: filterState.service,
    //                     created_date: {
    //                         $gte: date.dateFrom,
    //                         $lt: date.dateTo
    //                     },
    //                     sentiments: {
    //                         $elemMatch: optionQuery
    //                     }
    //                 }
    //             },
    //             { $unwind: "$sentiments" },
    //             {
    //                 $match: {
    //                     "sentiments.brand": { $ne: 'PTO' }
    //                 }
    //             }
    //         ]
    //     }
    // });

    const optionQuery = {
      brand: { $ne: 'PTO' },
    };
    if (sentimentType !== 'all') {
      optionQuery.sentiment = sentimentType;
    }

    const response = await backendService.find({
      query: {
        $limit: null,
        content_type: filterState.service,
        created_date: {
          $gte: date.dateFrom,
          $lt: date.dateTo,
        },
        sentiments: {
          $elemMatch: optionQuery,
        },
      },
    });
    // console.log('response -> ', response);
    let result;
    if (sentimentType !== 'all') {
      result = _.flatMap(response.data, (row) => {
        const filterSentiments = _.filter(row.sentiments, item => item.sentiment === sentimentType);
        row.sentiments = filterSentiments;
        return row;
      });
    } else {
      result = response.data;
    }

    let type;
    if (filterState.service === 'post') {
      type = ActionTypes.FETCH_POST_CONTENT_BY_SENTIMENT_TYPE_SUCCESS;
    } else {
      type = ActionTypes.FETCH_COMMENT_CONTENT_BY_SENTIMENT_TYPE_SUCCESS;
    }
    dispatch({
      type,
      payload: {
        data: result,
      },
    });
  } catch (error) {
    // console.log(error);
    let type;
    if (filterState.service === 'post') {
      type = ActionTypes.FETCH_POST_CONTENT_BY_SENTIMENT_TYPE_FAILURE;
    } else {
      type = ActionTypes.FETCH_COMMENT_CONTENT_BY_SENTIMENT_TYPE_FAILURE;
    }
    dispatch({
      type,
      payload: {
        error,
      },
    });
  }
};
