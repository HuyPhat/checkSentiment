import { fromJS } from 'immutable';
import _ from 'lodash';
// import * as cmtConst from '../constants/comments';
import ActionTypes from '../constants/index';

const initState = {
  getting: false,
  comments: [],
  commentsNotSentiment: 0,
  gettingNotSentiment: false,
  gettingAllContents: false,
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

const cmtReducer = (state = initState, action) => {
  switch (action.type) {
    case ActionTypes.DO_GET_ALL_COMMENTS: {
      return {
        ...state,
        getting: true,
      };
    }
    case ActionTypes.GET_ALL_COMMENTS_SUCCESSED: {
      return {
        ...state,
        getting: false,
        comments: action.payload,
      };
    }
    case ActionTypes.GET_ALL_COMMENTS_FAILED: {
      return {
        ...state,
        getting: false,
        comments: [],
        error: action.payload,
      };
    }
    case ActionTypes.DO_GET_ALL_COMMENTS_NOT_SENTIMENT: {
      return {
        ...state,
        gettingNotSentiment: true,
      };
    }
    case ActionTypes.GET_ALL_COMMENTS_NOT_SENTIMENT_SUCCESSED: {
      return {
        ...state,
        gettingNotSentiment: false,
        commentsNotSentiment: action.payload,
      };
    }
    case ActionTypes.GET_ALL_COMMENTS_NOT_SENTIMENT_FAILED: {
      return {
        ...state,
        gettingNotSentiment: false,
        commentsNotSentiment: -1,
      };
    }
    case ActionTypes.GET_ALL_CONTENT: {
      return {
        ...state,
        gettingAllContents: true,
      };
    }
    case ActionTypes.GET_ALL_CONTENT_SUCCESSED: {
      return {
        ...state,
        gettingAllContents: false,
        contents: action.payload,
      };
    }
    case ActionTypes.GET_ALL_CONTENT_FAILED: {
      return {
        ...state,
        gettingAllContents: false,
        contents: [],
      };
    }
    case ActionTypes.GET_ALL_CONTENT_ASSIGNED_SUCCESSED: {
      return {
        ...state,
        assignedContents: action.payload,
      };
    }
    case ActionTypes.GET_ALL_CONTENT_ASSIGNED_FAILED: {
      return {
        ...state,
        assignedContents: -1,
      };
    }
    case ActionTypes.GET_TOTAL_CONTENT_REQUEST: {
      return {
        ...state,
        totalContentWithoutLimitDate: {
          ...initState.totalContentWithoutLimitDate,
          status: 'await',
        },
      };
    }
    case ActionTypes.GET_TOTAL_CONTENT_SUCCESS: {
      return {
        ...state,
        totalContentWithoutLimitDate: {
          ...initState.totalContentWithoutLimitDate,
          status: 'loaded',
          total: action.payload.total,
        },
      };
    }
    case ActionTypes.GET_TOTAL_CONTENT_FAILURE: {
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
    case ActionTypes.FETCH_COMMENT_CONTENT_BY_SENTIMENT_TYPE_SUCCESS: {
      return {
        ...state,
        fetchingContentBySentimentType: 'loaded',
        contents: action.payload.data,
      };
    }
    case ActionTypes.FETCH_COMMENT_CONTENT_BY_SENTIMENT_TYPE_FAILURE: {
      return {
        ...state,
        fetchingContentBySentimentType: 'loaded',
        errorFetchingContentBySentimentType: action.payload.error,
      };
    }
    case ActionTypes.UPDATE_COMMENT_SENTIMENT: {
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

const DEFAULT_STATE_POST_OF_COMMENTS = fromJS({
  fetchingStatus: 'idle',
  data: [
    // {
    // commentId: '',
    // postContent: ''
    // }
  ],
  error: {},
});

const postsOfComment = (state = DEFAULT_STATE_POST_OF_COMMENTS, action) => {
  switch (action.type) {
    case ActionTypes.GET_POST_OF_COMMENT_REQUEST: {
      return state.merge({ fetchingStatus: 'awaiting', error: {} });
    }
    case ActionTypes.GET_POST_OF_COMMENT_SUCCESS: {
      // const newState = state.set('data', state.get('data').push({
      //     commentId: action.payload.commentId,
      //     post: action.payload.post
      // }))
      let newState = state.set(['fetchingStatus'], 'loaded');
      newState = newState.update('data', data => data.push({
        commentId: action.payload.commentId,
        postMessage: action.payload.post.message,
      }));
      return newState;
    }
    case ActionTypes.GET_POST_OF_COMMENT_FAILURE: {
      return state.merge({ fetchingStatus: 'loaded', error: action.payload.error });
    }
    default: {
      return state;
    }
  }
};

export default { cmtReducer, postsOfComment };
