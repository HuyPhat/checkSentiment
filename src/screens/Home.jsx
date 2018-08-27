import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row } from 'react-bootstrap';
import { format } from 'date-fns';
import { Redirect } from 'react-router'

import * as cmtActs from '../redux/actions/comments';
import * as postActs from '../redux/actions/posts';
import * as generalActs from '../redux/actions/general';
import Dashboard from './Dashboard';
import FormFetchContent from 'components/form/fetch/Content';
import AssignForm from '../components/AssignForm';
import selectors from '../redux/selectors/index';
import ContentFormInsert from 'components/content/form/Insert';
import ContentFormAssign from 'components/content/form/Assign';

class Home extends React.PureComponent {
  state = {
    inserting: false,
    fetching: false,
  };

  componentDidMount() {
    this.props.getUserList();
  }

  render() {
    const { normaluser } = this.props;
    if (normaluser) {
      return <Redirect
        to={{
          pathname: "/content-list",
          state: { from: '/' }
        }}
      />
    }
    return (
      <Dashboard>
        <section id='home-page'>
          <Grid>
            <h1>Hi! Admin</h1>
            <FormFetchContent />
            <ContentFormInsert />
            <Row>
              <ContentFormAssign />
              {/* <AssignForm
                headers={['Email', 'Username', 'Select For Assign']}
                users={this.props.userList}
                assgined={this.assigned}
                service={this.props.filter.service}
                date={{
                  ffrom: format(this.props.filter.dateFrom, 'YYYY-MM-DD'),
                  fto: format(this.props.filter.dateTo, 'YYYY-MM-DD'),
                }}
              /> */}
            </Row>
          </Grid>
        </section>
      </Dashboard>
    );
  }

  assigned = () => {
    const { dateFrom, dateTo, service } = this.props.filter;
    const fmtDateFrom = format(dateFrom, 'YYYY-MM-DD');
    const fmtDateTo = format(dateTo, 'YYYY-MM-DD');
    this.props.getContentInfoFromTo(fmtDateFrom, fmtDateTo, service);
  };
}

const mapStateToProps = rootState => {
  const filter = selectors.getFilter(rootState);
  const normaluser = selectors.getUserRole(rootState) === 'user';
  const userList = rootState.general.userList;
  return {
    // comments: rootState.comments,
    // posts: rootState.posts,
    // general: rootState.general,
    userList,
    normaluser,
    filter,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getContentInfoFromTo: (from, to, service) => {
      if ("comment" === service) {
        dispatch(cmtActs.requestGetAllComments(from, to));
        dispatch(cmtActs.requestGetAllCommentsNotSentiment(from, to));
        dispatch(cmtActs.getAllContent(from, to));
        dispatch(cmtActs.getAllAssignedContent(from, to));
      }
      if ("post" === service) {
        dispatch(postActs.requestGetAllPosts(from, to));
        dispatch(postActs.requestGetAllPostsNotSentiment(from, to));
        dispatch(postActs.getAllContent(from, to));
        dispatch(postActs.getAllAssignedContent(from, to));
      }
    },
    getUserList: () => {
      return dispatch(generalActs.requestAllUser());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
