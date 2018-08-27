import feathers from './app';

export default {
  getPostOfComment: feathers.service('get-post-of-comments'),
  content: feathers.service('contents'),
  comment: feathers.service('comments'),
  post: feathers.service('posts'),
  assignment: feathers.service('assignments'),
  sentimentReport: feathers.service('sentiment-report'),
};
