import _ from 'lodash';
import * as postConst from '../constants/posts';
import ActionTypes from '../constants/index';

const initState = {
  getting: false,
  posts: [],
  postsNotSentiment: 0,
  gettingNotSentiment: false,
  contents: [],
  assignedContents: 0,
  error: null,
  totalContentWithoutLimitDate: {
    status: 'idle',
    total: 0,
    error: false,
  },
  fetchingContentBySentimentTypeStatus: 'idle',
  errorFetchingContentBySentimentType: false,
};

const postsReducer = (state = initState, action) => {
  switch (action.type) {
    case postConst.DO_GET_ALL_POSTS: {
      return {
        ...state,
        getting: true,
      };
    }
    case postConst.GET_ALL_POSTS_SUCCESSED: {
      return {
        ...state,
        getting: false,
        posts: action.payload,
      };
    }
    case postConst.GET_ALL_POSTS_FAILED: {
      return {
        ...state,
        getting: false,
        posts: [],
        error: action.payload,
      };
    }
    case postConst.DO_GET_ALL_POSTS_NOT_SENTIMENT: {
      return {
        ...state,
        gettingNotSentiment: true,
      };
    }
    case postConst.GET_ALL_POSTS_NOT_SENTIMENT_SUCCESSED: {
      return {
        ...state,
        gettingNotSentiment: false,
        postsNotSentiment: action.payload,
      };
    }
    case postConst.GET_ALL_POSTS_NOT_SENTIMENT_FAILED: {
      return {
        ...state,
        gettingNotSentiment: false,
        postsNotSentiment: -1,
      };
    }
    case postConst.GET_ALL_CONTENT_SUCCESSED: {
      return {
        ...state,
        contents: action.payload,
      };
    }
    case postConst.GET_ALL_CONTENT_FAILED: {
      return {
        ...state,
        contents: [],
      };
    }
    case postConst.GET_ALL_CONTENT_ASSIGNED_SUCCESSED: {
      return {
        ...state,
        assignedContents: action.payload,
      };
    }
    case postConst.GET_ALL_CONTENT_ASSIGNED_FAILED: {
      return {
        ...state,
        assignedContents: -1,
      };
    }
    case postConst.GET_TOTAL_CONTENT_REQUEST: {
      return {
        ...state,
        totalContentWithoutLimitDate: {
          ...initState.totalContentWithoutLimitDate,
          status: 'await',
        },
      };
    }
    case postConst.GET_TOTAL_CONTENT_SUCCESS: {
      return {
        ...state,
        totalContentWithoutLimitDate: {
          ...initState.totalContentWithoutLimitDate,
          status: 'loaded',
          total: action.payload.total,
        },
      };
    }
    case postConst.GET_TOTAL_CONTENT_FAILURE: {
      return {
        ...state,
        totalContentWithoutLimitDate: {
          ...initState.totalContentWithoutLimitDate,
          status: 'loaded',
          error: action.payload.error,
        },
      };
    }
    case ActionTypes.FETCH_CONTENT_BY_SENTIMENT_TYPE_PENDING: {
      return {
        ...state,
        fetchingContentBySentimentTypeStatus: 'pending',
      };
    }
    case ActionTypes.FETCH_POST_CONTENT_BY_SENTIMENT_TYPE_SUCCESS: {
      return {
        ...state,
        fetchingContentBySentimentType: 'loaded',
        contents: action.payload.data,
      };
    }
    case ActionTypes.FETCH_POST_CONTENT_BY_SENTIMENT_TYPE_FAILURE: {
      return {
        ...state,
        fetchingContentBySentimentType: 'loaded',
        errorFetchingContentBySentimentType: action.payload.error,
      };
    }
    case ActionTypes.UPDATE_POST_SENTIMENT: {
      const { payload: { updatedSentiment } } = action;
      const contents = _.map(state.contents, item => (_.get(item, '_id') === _.get(updatedSentiment, '_id') ? updatedSentiment : item));
      return {
        ...state,
        contents,
      };
    }
    default: {
      return state;
    }
  }
};

export default postsReducer;
