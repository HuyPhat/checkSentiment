// import { createSelector } from 'reselect';
import { format } from 'date-fns';

const getFilter = state => state.filter.toJS();

const getUserInfo = s => s.loginInfo;

const getUserRole = (s) => {
  let role = '';
  if (s.loginInfo.userInfo.role === 0) {
    role = 'admin';
  } else {
    role = 'user';
  }
  return role;
};

const getPostOfComments = s => s.postsOfComment.toJS();

const getTotalContentWithoutLimitDate = (s) => {
  const { service } = getFilter(s);
  if (service === 'post') {
    return s.posts.totalContentWithoutLimitDate.total;
  }
  if (service === 'comment') {
    return s.comments.totalContentWithoutLimitDate.total;
  }

  return 0;
};


const getPostState = state => state.posts;

const getCommentState = state => state.comments;

const getContentForTable = (state) => {
  const admin = getUserRole(state) === 'admin';
  const filter = getFilter(state);
  if (admin) {
    if (filter.service === 'post') {
      return getPostState(state).contents;
    }

    return getCommentState(state).contents;
  }

  const { userInfo } = getUserInfo(state);
  let newContent;
  if (filter.service === 'post') {
    newContent = getPostState(state).contents.filter(item => item.assign_to === userInfo.email);
  } else {
    newContent = getCommentState(state).contents.filter(item => item.assign_to === userInfo.email);
  }
  return newContent;
};

const getPostsCount = state => getPostState(state).posts.length;

const getCommentsCount = state => getCommentState(state).comments.length;

const getTotalNewContentWillInsert = (state) => {
  const { service } = getFilter(state);
  let count;
  if (service === 'post') {
    count = getPostsCount(state);
  } else if (service === 'comment') {
    count = getCommentsCount(state);
  } else {
    count = 0;
  }
  return count;
};

const getTotalInsertedContent = (state) => {
  const { service } = getFilter(state);
  let count;
  if (service === 'post') {
    count = getPostState(state).contents.length;
  } else if (service === 'comment') {
    count = getCommentState(state).contents.length;
  } else {
    count = 0;
  }
  return count;
};

const getTotalAssignedContent = (state) => {
  const { service } = getFilter(state);
  let count;
  if (service === 'post') {
    count = getPostState(state).assignedContents;
  } else if (service === 'comment') {
    count = getCommentState(state).assignedContents;
  } else {
    count = 0;
  }
  return count;
};

const getFormatDate = (state) => {
  let { dateFrom, dateTo } = getFilter(state);
  dateFrom = format(dateFrom, 'YYYY-MM-DD');
  dateTo = format(dateTo, 'YYYY-MM-DD');
  return {
    dateFrom,
    dateTo,
  };
};

const getSentimentReport = state => state.sentimentReport.toJS();

export default {
  getUserInfo,
  getUserRole,
  getPostOfComments,
  getTotalContentWithoutLimitDate,
  getFilter,
  getContentForTable,
  getPostState,
  getCommentState,
  getPostsCount,
  getCommentsCount,
  getTotalNewContentWillInsert,
  getTotalInsertedContent,
  getTotalAssignedContent,
  getFormatDate,
  getSentimentReport,
};
