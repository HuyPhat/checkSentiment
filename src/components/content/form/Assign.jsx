import React from 'react';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import AssignForm from 'components/AssignForm';
import selectors from '../../../redux/selectors/index';
import * as cmtActs from '../../../redux/actions/comments';
import * as postActs from '../../../redux/actions/posts';
import * as assignmentActs from '../../../redux/actions/assignment';

class ContentFormAssign extends React.PureComponent {
    render() {
        return (
            <AssignForm
                headers={['Email', 'Username', 'Select For Assign']}
                users={this.props.userList}
                service={this.props.filter.service}
                date={{
                    ffrom: format(this.props.filter.dateFrom, 'YYYY-MM-DD'),
                    fto: format(this.props.filter.dateTo, 'YYYY-MM-DD'),
                }}
                onAssign={this.handleAssignContent}
            />
        )
    }

    handleAssignContent = (userAssignList, numberRecords) => {
        const fromEmail = this.props.userEmail;
        const { dateFrom, dateTo, service } = this.props.filter;
        const fmtDateFrom = format(dateFrom, 'YYYY-MM-DD');
        const fmtDateTo = format(dateTo, 'YYYY-MM-DD');
        this.props.dispatch(assignmentActs.requestAssign(service, fromEmail, userAssignList, numberRecords, fmtDateFrom, fmtDateTo))
            .then(rs => {
                this._requestContentAfterAssignedSuccess();
            });
    }

    _requestContentAfterAssignedSuccess = () => {
        const { dispatch } = this.props;
        const { dateFrom, dateTo, service } = this.props.filter;
        const fmtDateFrom = format(dateFrom, 'YYYY-MM-DD');
        const fmtDateTo = format(dateTo, 'YYYY-MM-DD');
        if ("comment" === service) {
            dispatch(cmtActs.requestGetAllComments(fmtDateFrom, fmtDateTo));
            dispatch(cmtActs.requestGetAllCommentsNotSentiment(fmtDateFrom, fmtDateTo));
            dispatch(cmtActs.getAllContent(fmtDateFrom, fmtDateTo));
            dispatch(cmtActs.getAllAssignedContent(fmtDateFrom, fmtDateTo));
        }
        if ("post" === service) {
            dispatch(postActs.requestGetAllPosts(fmtDateFrom, fmtDateTo));
            dispatch(postActs.requestGetAllPostsNotSentiment(fmtDateFrom, fmtDateTo));
            dispatch(postActs.getAllContent(fmtDateFrom, fmtDateTo));
            dispatch(postActs.getAllAssignedContent(fmtDateFrom, fmtDateTo));
        }
    }

}

function mapStateToProps(state, props) {
    const filter = selectors.getFilter(state);
    const normaluser = selectors.getUserRole(state) === 'user';
    const userList = state.general.userList;
    const userInfo = selectors.getUserInfo(state);
    return {
        userList,
        normaluser,
        filter,
        userEmail: userInfo.email
    };
}

export default connect(mapStateToProps)(ContentFormAssign);