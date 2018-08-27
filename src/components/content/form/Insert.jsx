import React from 'react';
import { connect } from 'react-redux';
import { Button, Jumbotron } from 'react-bootstrap';
import { format } from 'date-fns';

import * as cmtActs from '../../../redux/actions/comments';
import * as postActs from '../../../redux/actions/posts';
import selectors from '../../../redux/selectors/index';
import featherService from '../../../feathers-client/services';

async function importToContent(type, from, to, skip) {
    try {
        const sourceService = featherService[type];
        const desService = featherService.content;
        const dateFrom = format(from, 'YYYY-MM-DD');
        const dateTo = format(to, 'YYYY-MM-DD');
        const rs = await sourceService.find({
            query: {
                $limit: null,
                created_date: { $gte: dateFrom, $lt: dateTo }
            }
        });
        let insertDatas = [];
        if (rs.data.length > 0) {
            insertDatas = rs.data.map(async item => {
                if (await isExists(desService, item.fid)) {
                    return null;
                }
                return {
                    _id: item._id,
                    fid: item.fid,
                    created_date: item.created_date,
                    content_type: type,
                    content: item.message,
                    raw_content: item.raw_message,
                    sentiments: item.sentiments
                };
            });
        }
        insertDatas = insertDatas.filter(x => x !== null);
        insertDatas = await Promise.all(insertDatas);

        await desService.create(insertDatas);
        return Promise.resolve();
    } catch (e) {
        console.log('[importToContent] is failed', e);
        return Promise.reject();
    }
}

async function isExists(services, fid) {
    const rs = await services.find({ query: { fid: fid } });
    if (rs.total > 0) {
        return true
    }
    return false;
}

class ContentFormInsert extends React.PureComponent {
    state = {
        inserting: false,
    }

    render() {
        const { inserting } = this.state;
        const { totalNewContentWillInsert, totalInsertedContent, totalAssignedContent } = this.props;
        const willAssignCount = totalNewContentWillInsert - totalInsertedContent;
        const buttonContent = willAssignCount > 0 ? 'Insert' : 'Nothing For Insert';
        return (
            <section className='form-insert-content'>
                <Jumbotron>
                    <h2>Content Information</h2>
                    <p>New Contents: {totalNewContentWillInsert}</p>
                    <p>Inserted Contents: {totalInsertedContent}</p>
                    <p>Assigned Contents: {totalAssignedContent}</p>
                    <Button bsStyle="default" onClick={this.handleInsertClick} disabled={inserting || willAssignCount <= 0}>{buttonContent}</Button>
                </Jumbotron>
            </section>
        )
    }

    handleInsertClick = () => {
        const { totalNewContentWillInsert, totalInsertedContent, filter, dispatch } = this.props;
        if (totalNewContentWillInsert > totalInsertedContent) {
            this.setState({
                inserting: true
            });
            const skip = totalNewContentWillInsert - totalInsertedContent;
            const dateFrom = format(filter.dateFrom, 'YYYY-MM-DD');
            const dateTo = format(filter.dateTo, 'YYYY-MM-DD');

            return importToContent(filter.service, dateFrom, dateTo, skip)
                .then(inserted => {
                    this.setState({
                        inserting: false
                    });
                    if (filter.service === 'comment') {
                        dispatch(cmtActs.requestGetAllComments(dateFrom, dateTo));
                        dispatch(cmtActs.requestGetAllCommentsNotSentiment(dateFrom, dateTo));
                        dispatch(cmtActs.getAllContent(dateFrom, dateTo));
                        dispatch(cmtActs.getAllAssignedContent(dateFrom, dateTo));
                        dispatch(cmtActs.getTotalContent());
                    }
                    else {
                        dispatch(postActs.requestGetAllPosts(dateFrom, dateTo));
                        dispatch(postActs.requestGetAllPostsNotSentiment(dateFrom, dateTo));
                        dispatch(postActs.getAllContent(dateFrom, dateTo));
                        dispatch(postActs.getAllAssignedContent(dateFrom, dateTo));
                        dispatch(postActs.getTotalContent());
                    }
                })
                .catch(err => {
                    console.log('insert failed ', err);
                    this.setState({
                        inserting: false
                    });
                });
        }
    };
}

function mapState(state, props) {
    const totalNewContentWillInsert = selectors.getTotalNewContentWillInsert(state);
    const totalInsertedContent = selectors.getTotalInsertedContent(state);
    const totalAssignedContent = selectors.getTotalAssignedContent(state);
    const filter = selectors.getFilter(state);
    return {
        totalNewContentWillInsert,
        totalInsertedContent,
        totalAssignedContent,
        filter
    }
}

export default connect(mapState)(ContentFormInsert);