import * as React from 'react';
import { connect } from 'react-redux';
import { FormGroup, ControlLabel, Grid, Row, Col, Button } from 'react-bootstrap';
import DatePicker from 'react-16-bootstrap-date-picker';
import { format } from 'date-fns';

import * as cmtActs from '../../../redux/actions/comments';
import * as postActs from '../../../redux/actions/posts';
import ActionCreators from '../../../redux/actions/index';
import selectors from '../../../redux/selectors/index';

import CustomDropDown from 'components/CustomDropDown';

class FormFetchContent extends React.PureComponent {
    render() {
        return (
            <Grid fluid>
                <Row>
                    <Col xs={12} sm={3}>
                        <FormGroup controlId="fromdate">
                            <ControlLabel>From</ControlLabel>
                            <DatePicker dateFormat="DD-MM-YYYY" onChange={this.handleDateChange('dateFrom')} placeholder="From Date" value={this.props.filter.dateFrom} id="fromdate" showClearButton={false} />
                        </FormGroup>
                    </Col>
                    <Col xs={12} sm={3}>
                        <FormGroup controlId="todate">
                            <ControlLabel>To</ControlLabel>
                            <DatePicker dateFormat="DD-MM-YYYY" onChange={this.handleDateChange('dateTo')} placeholder="To Date" value={this.props.filter.dateTo} id="todate" showClearButton={false} />
                        </FormGroup>
                    </Col>
                    <Col xs={12} sm={6}>
                        <label>Service name: </label>
                        <FormGroup controlId="disabled">
                            <CustomDropDown
                                title={this.props.filter.service}
                                doSelected={this.handleServiceChange}
                                options={['post', 'comment']}
                            />
                            <Button className='round-border-button primary-button' onClick={this.handleFinish} disabled={!this.props.filter.dateFrom || !this.props.filter.dateTo}>Get Content</Button>
                        </FormGroup>
                    </Col>
                </Row>
            </Grid>
        )
    }

    handleServiceChange = service => {
        this.props.dispatch(ActionCreators.changeService({ payload: { service } }));
    };

    handleDateChange = (type) => (value) => {
        const { filter } = this.props;
        const payload = {
            dateFrom: filter.dateFrom,
            dateTo: filter.dateTo,
        };
        payload[type] = value;
        this.props.dispatch(ActionCreators.changeDateRangeForService({ payload }));
    }

    _requestSentimentReport = () => {
        this.props.dispatch(ActionCreators.requestSentimentReport());
    }

    handleFinish = () => {
        const { dispatch, filter: { service, dateFrom, dateTo } } = this.props;
        const ftfromdate = format(dateFrom, 'YYYY-MM-DD');
        const fttodate = format(dateTo, 'YYYY-MM-DD');
        if (service === 'comment') {
            dispatch(cmtActs.requestGetAllComments(ftfromdate, fttodate));
            dispatch(cmtActs.requestGetAllCommentsNotSentiment(ftfromdate, fttodate));
            dispatch(cmtActs.getAllContent(ftfromdate, fttodate));
            dispatch(cmtActs.getAllAssignedContent(ftfromdate, fttodate));
            dispatch(cmtActs.getTotalContent());
        } else if (service === 'post') {
            dispatch(postActs.requestGetAllPosts(ftfromdate, fttodate));
            dispatch(postActs.requestGetAllPostsNotSentiment(ftfromdate, fttodate));
            dispatch(postActs.getAllContent(ftfromdate, fttodate));
            dispatch(postActs.getAllAssignedContent(ftfromdate, fttodate));
            dispatch(postActs.getTotalContent());
        }
        this._requestSentimentReport();
    }
}

function mapStateToProps(state, props) {
    const filter = selectors.getFilter(state);
    // const sentimentReport = selectors.getSentimentReport(state);
    return {
        filter,
        // sentimentReport,
    }
}

export default connect(mapStateToProps)(FormFetchContent);