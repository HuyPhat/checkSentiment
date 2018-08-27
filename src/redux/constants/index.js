import contentConstant from './content.constant';
import filterConstant from './filter.constant';
import sentimentConstant from './sentiment';
import * as commentConstant from './comments';

export default {
  GET_POST_OF_COMMENT: 'GET_POST_OF_COMMENT',
  GET_POST_OF_COMMENT_REQUEST: 'GET_POST_OF_COMMENT_REQUEST',
  GET_POST_OF_COMMENT_SUCCESS: 'GET_POST_OF_COMMENT_SUCCESS',
  GET_POST_OF_COMMENT_FAILURE: 'GET_POST_OF_COMMENT_FAILURE',
  USER_CHANGE_SERVICE: 'USER_CHANGE_SERVICE',
  USER_CHANGE_DATE_RANGE: 'USER_CHANGE_DATE_RANGE',
  ...contentConstant,
  ...filterConstant,
  ...sentimentConstant,
  ...commentConstant,
};
