// import { combineReducers } from 'redux';
import loginReducer from './login';
import allCmtReducer from './comments';
import postsReducer from './posts';
import sentimentReducer from './sentiment';
import generalReducer from './general';
import assignmentReducer from './assignment';
import filter from './filter.reducer';
import sentimentReport from './sentimentReport.reducer';

const rootReducer = {
  general: generalReducer,
  loginInfo: loginReducer,
  comments: allCmtReducer.cmtReducer,
  postsOfComment: allCmtReducer.postsOfComment,
  posts: postsReducer,
  sentiment: sentimentReducer,
  assignment: assignmentReducer,
  filter: filter.reducer,
  sentimentReport,
};

export default rootReducer;
