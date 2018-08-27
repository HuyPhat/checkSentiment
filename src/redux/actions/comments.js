// import * as cmtConst from '../constants/comments';
import app from '../../feathers-client/app';
import service from '../../feathers-client/services';
import ActionTypes from '../constants/index';
import selector from '../selectors/index';

export const doGetAllComments = () => ({
  type: ActionTypes.DO_GET_ALL_COMMENTS,
});

export const getAllCommentsSuccessed = comments => ({
  type: ActionTypes.GET_ALL_COMMENTS_SUCCESSED,
  payload: comments,
});

export const getAllCommentsFailed = error => ({
  type: ActionTypes.GET_ALL_COMMENTS_FAILED,
  payload: error,
});

export const requestGetAllComments = (from, to) => {
  const queryCondition = {
    query: {
      $limit: null,
      sentiments: {
        $elemMatch: {
          brand: { $ne: 'PTO' },
        },
      },
    },
  };
  if (from && from.length && to && to.length) {
    queryCondition.query.created_date = { $gte: from, $lt: to };
  }
  return async (dispatch, getState) => {
    const { userInfo } = getState().loginInfo;
    if (userInfo.role !== 0) {
      queryCondition.query.assign_to = userInfo.email;
    }
    // console.log('queryCondition ', queryCondition);
    try {
      dispatch(doGetAllComments());
      const rs = await app.service('comments').find(queryCondition);
      dispatch(getAllCommentsSuccessed(rs.data));
    } catch (e) {
      dispatch(getAllCommentsFailed(e.message));
    }
  };
};

export const doGetNotSentiment = () => ({
  type: ActionTypes.DO_GET_ALL_COMMENTS_NOT_SENTIMENT,
});

export const doGetNotSentimentSuccessed = number => ({
  type: ActionTypes.GET_ALL_COMMENTS_NOT_SENTIMENT_SUCCESSED,
  payload: number,
});

export const doGetNotSentimentFailed = () => ({
  type: ActionTypes.GET_ALL_COMMENTS_NOT_SENTIMENT_FAILED,
});


export const requestGetAllCommentsNotSentiment = (from, to) => {
  const queryCondition = {
    query: {
      $limit: null,
      sentiments: {
        $elemMatch: {
          brand: { $ne: 'PTO' },
          sentiment: '',
        },
      },
    },
  };

  if (from && from.length && to && to.length) {
    queryCondition.query.created_date = { $gte: from, $lt: to };
  }
  return async (dispatch) => {
    try {
      dispatch(doGetNotSentiment());
      const rs = await app.service('comments').find(queryCondition);
      // console.log("requestGetAllCommentsNotSentiment data");
      // console.log(rs.data);
      dispatch(doGetNotSentimentSuccessed(rs.total));
    } catch (e) {
      dispatch(doGetNotSentimentFailed());
    }
  };
};

export const getAllContentSuccessed = contents => ({
  type: ActionTypes.GET_ALL_CONTENT_SUCCESSED,
  payload: contents,
});

export const getAllContentFailed = () => ({
  type: ActionTypes.GET_ALL_CONTENT_FAILED,
});

export const getAllContent = (from, to) => {
  const queryCondition = {
    query: {
      $limit: null,
      content_type: 'comment',
      sentiments: {
        $elemMatch: {
          brand: { $ne: 'PTO' },
        },
      },
    },
  };

  if (from && from.length && to && to.length) {
    queryCondition.query.created_date = { $gte: from, $lt: to };
  }
  return async (dispatch) => {
    try {
      const rs = await app.service('contents').find(queryCondition);
      dispatch(getAllContentSuccessed(rs.data));
    } catch (e) {
      dispatch(getAllContentFailed());
    }
  };
};

export const getTotalContent = () => async (dispatch, getState) => {
  try {
    const admin = selector.getUserRole(getState()) === 'admin'; // admin or user
    const { email } = selector.getUserInfo(getState()).userInfo;
    const query = {
      $limit: 0,
      content_type: 'comment',
      sentiments: {
        $elemMatch: {
          brand: { $ne: 'PTO' },
        },
      },
    };
    if (!admin) {
      //   console.log('i am a normal user');
      // user
      query.assign_to = email;
    }
    const rs = await app.service('contents').find({ query });
    // console.log('content -> comment -> rs -> ', rs.total);
    // console.log(rs);
    dispatch({
      type: ActionTypes.GET_TOTAL_CONTENT_SUCCESS,
      payload: {
        total: rs.total,
      },
    });
  } catch (error) {
    dispatch({
      type: ActionTypes.GET_TOTAL_CONTENT_FAILURE,
      payload: {
        error,
      },
    });
  }
};

export const getAllAssignedContentPending = () => ({
  type: ActionTypes.GET_ALL_CONTENT_ASSIGNED_PENDING,
  payload: {},
});

export const getAllAssignedContentSuccessed = number => ({
  type: ActionTypes.GET_ALL_CONTENT_ASSIGNED_SUCCESSED,
  payload: number,
});

export const getAllAssignedContentFailed = () => ({
  type: ActionTypes.GET_ALL_CONTENT_ASSIGNED_FAILED,
});

export const getAllAssignedContent = (from, to) => async (dispatch) => {
  dispatch(getAllAssignedContentPending());
  const queryCondition = {
    query: {
      $limit: null,
      content_type: 'comment',
      assigned: true,
      sentiments: {
        $elemMatch: {
          brand: { $ne: 'PTO' },
        },
      },
    },
  };

  if (from && from.length && to && to.length) {
    queryCondition.query.created_date = { $gte: from, $lt: to };
  }
  try {
    const rs = await app.service('contents').find(queryCondition);
    // console.log(rs.data.length);
    dispatch(getAllAssignedContentSuccessed(rs.total));
  } catch (e) {
    dispatch(getAllAssignedContentFailed());
  }
};

export const getPostOfCommentRequest = ({ fid }) => ({
  type: ActionTypes.GET_POST_OF_COMMENT_REQUEST,
  payload: {
    fid,
  },
});

export const getPostOfCommentSuccess = ({ commentId, post }) => ({
  type: ActionTypes.GET_POST_OF_COMMENT_SUCCESS,
  payload: {
    commentId,
    post,
  },
});

export const getPostOfCommentFailure = ({ error }) => ({
  type: ActionTypes.GET_POST_OF_COMMENT_FAILURE,
  payload: {
    error,
  },
});


export const getPostOfComment = fid => async (dispatch) => {
  try {
    dispatch(getPostOfCommentRequest({ fid }));
    const response = await service.getPostOfComment.get(fid);
    // console.log('get post of comment -> ', response);
    dispatch(getPostOfCommentSuccess({ commentId: fid, post: response.post }));
  } catch (error) {
    console.log(error);
    dispatch(getPostOfCommentFailure({ error }));
  }
};
