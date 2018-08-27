import * as cmtActs from './comments';
import * as formActions from './form.action';
import * as contentActions from './content.action';
import * as filterActions from './filter.action';
import * as sentimentActions from './sentiment';

export default {
  ...cmtActs,
  ...formActions,
  ...contentActions,
  ...filterActions,
  ...sentimentActions,
};
