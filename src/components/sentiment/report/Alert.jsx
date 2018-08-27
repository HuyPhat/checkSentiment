import React from 'react';
import { connect } from 'react-redux';
import { Alert, Button } from 'react-bootstrap';
import selectors from '../../../redux/selectors/index';

class SentimentReportAlert extends React.PureComponent {

    constructor(props, context) {
        super(props, context);

        this.handleDismiss = this.handleDismiss.bind(this);
        this.handleShow = this.handleShow.bind(this);

        this.state = {
            show: false
        };
    }

    render() {
        const { sentimentReport: { sentimentCount, percentage } } = this.props;
        if (this.state.show) {
            return (
                <Alert bsStyle="info" onDismiss={this.handleDismiss}>
                    <h4>Sentiment Report</h4>
                    <p>Total Count: {sentimentCount.total}</p>
                    <p>Positive Count: {sentimentCount.positive}</p>
                    <p>Negative Count: {sentimentCount.negative}</p>
                    <p>Neutral Count: {sentimentCount.neutral}</p>
                    <p>Unknown Count: {sentimentCount.unknown}</p>
                    <p>Positive percentage: {percentage.positive}%</p>
                    <p>Negative percentage: {percentage.negative}%</p>
                    <p>Neutral percentage: {percentage.neutral}%</p>
                    <p>Unknown percentage: {percentage.unknown}%</p>
                    <p>
                        <Button onClick={this.handleDismiss}>Hide</Button>
                    </p>
                </Alert>
            );
        }

        return <Button onClick={this.handleShow}>Show Sentiment Report</Button>;
    }

    handleDismiss() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }
}

function mapState(state, props) {
    const sentimentReport = selectors.getSentimentReport(state);
    return {
        sentimentReport
    }
}

export default connect(mapState)(SentimentReportAlert);