import * as postConst from '../constants/posts';
import app from '../../feathers-client/app';
import selector from '../selectors/index';

export const requestGetAllPosts = (from, to) => {
  const queryCondition = {
    query: {
      $limit: null,
      sentiments: {
        $elemMatch: {
          brand: { $ne: 'PTO' }
        }
      },
    }
  }
  if (from && from.length && to && to.length) {
    queryCondition.query.created_date = { $gte: from, $lt: to };
  }
  return async (dispatch, getState) => {
    const { userInfo } = getState().loginInfo;
    if (userInfo.role !== 0) {
      queryCondition.query.assign_to = userInfo.email
    }
    try {
      dispatch(doGetAllPosts());
      let countQuery = {
        $limit: 1
      };
      const r = await app.service('posts').find({ query: countQuery });
      console.log(">>>> ", r);
      const rs = await app.service('posts').find(queryCondition);
      dispatch(getAllPostsSuccessed(rs.data));
    } catch (e) {
      dispatch(getAllPostsFailed(e.message));
    }
  };
};

export const doGetAllPosts = () => {
  return {
    type: postConst.DO_GET_ALL_POSTS
  };
};

export const getAllPostsSuccessed = posts => {
  return {
    type: postConst.GET_ALL_POSTS_SUCCESSED,
    payload: posts
  };
};

export const getAllPostsFailed = error => {
  return {
    type: postConst.GET_ALL_POSTS_FAILED,
    payload: error
  };
};

export const requestGetAllPostsNotSentiment = (from, to) => {
  const queryCondition = {
    query: {
      $limit: null,
      sentiments: {
        $elemMatch: {
          brand: { $ne: 'PTO' },
          sentiment: ""
        }
      },
    }
  }
  if (from && from.length && to && to.length) {
    // const ffrom = new Date(from).toISOString().substring(0, 10);
    // const fto = new Date(to).toISOString().substring(0, 10);
    queryCondition.query.created_date = { $gte: from, $lt: to };
  }
  return async dispatch => {
    try {
      dispatch(doGetNotSentiment());
      const rs = await app.service('posts').find(queryCondition);
      dispatch(doGetNotSentimentSuccessed(rs.total));
    } catch (e) {
      dispatch(doGetNotSentimentFailed());
    }
  };
};

export const doGetNotSentiment = () => {
  return {
    type: postConst.DO_GET_ALL_POSTS_NOT_SENTIMENT
  };
};

export const doGetNotSentimentSuccessed = number => {
  return {
    type: postConst.GET_ALL_POSTS_NOT_SENTIMENT_SUCCESSED,
    payload: number
  };
};

export const doGetNotSentimentFailed = () => {
  return {
    type: postConst.GET_ALL_POSTS_NOT_SENTIMENT_FAILED
  };
};

export const getAllContent = (from, to) => {
  const queryCondition = {
    query: {
      $limit: null,
      content_type: 'post',
      sentiments: {
        $elemMatch: {
          brand: { $ne: 'PTO' }
        }
      },
    }
  };
  if (from && from.length && to && to.length) {
    // const ffrom = new Date(from).toISOString().substring(0, 10);
    // const fto = new Date(to).toISOString().substring(0, 10);
    queryCondition.query.created_date = { $gte: from, $lt: to };
  }
  return async dispatch => {
    try {
      dispatch(doGetAllContent());
      const rs = await app
        .service('contents')
        .find(queryCondition);
      dispatch(getAllContentSuccessed(rs.data));
    } catch (e) {
      dispatch(getAllContentFailed());
    }
  };
};

export const doGetAllContent = () => {
  return {
    type: postConst.GET_ALL_CONTENT
  };
};

export const getAllContentSuccessed = contents => {
  return {
    type: postConst.GET_ALL_CONTENT_SUCCESSED,
    payload: contents
  };
};

export const getAllContentFailed = () => {
  return {
    type: postConst.GET_ALL_CONTENT_FAILED
  };
};

export const getAllAssignedContent = (from, to) => {
  const queryCondition = {
    query: {
      $limit: null,
      content_type: 'post',
      assigned: true,
      sentiments: {
        $elemMatch: {
          brand: { $ne: 'PTO' }
        }
      },
    }
  };
  if (from && from.length && to && to.length) {
    // const ffrom = new Date(from).toISOString().substring(0, 10);
    // const fto = new Date(to).toISOString().substring(0, 10);
    queryCondition.query.created_date = { $gte: from, $lt: to };
  }
  return async dispatch => {
    try {
      dispatch(doGetAllAssignedContent());
      let rs = await app
        .service('contents')
        .find(queryCondition);
      dispatch(getAllAssignedContentSuccessed(rs.total));
    } catch (e) {
      dispatch(getAllAssignedContentFailed());
    }
  };
};

export const doGetAllAssignedContent = number => {
  return {
    type: postConst.GET_ALL_CONTENT_ASSIGNED
  };
};

export const getAllAssignedContentSuccessed = number => {
  return {
    type: postConst.GET_ALL_CONTENT_ASSIGNED_SUCCESSED,
    payload: number
  };
};

export const getAllAssignedContentFailed = () => {
  return {
    type: postConst.GET_ALL_CONTENT_ASSIGNED_FAILED
  };
};

export const getTotalContent = () => async (dispatch, getState) => {
  try {
    const admin = selector.getUserRole(getState()) === "admin"; // admin or user
    const { email } = selector.getUserInfo(getState()).userInfo;
    const query = {
      $limit: 0,
      content_type: 'post',
      sentiments: {
        $elemMatch: {
          brand: { $ne: 'PTO' }
        }
      },
    }
    if (!admin) {
      console.log('i am a normal user');
      // user
      query.assign_to = email
    }
    const rs = await app.service('contents').find({ query });
    console.log("content -> post -> rs -> ", rs.total);
    dispatch({
      type: postConst.GET_TOTAL_CONTENT_SUCCESS,
      payload: {
        total: rs.total
      }
    });
  } catch (error) {
    dispatch({
      type: postConst.GET_TOTAL_CONTENT_FAILURE,
      payload: {
        error
      }
    });
  }
}