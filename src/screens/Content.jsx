import React from 'react';
// import ReactLoading from 'react-loading';
import { connect } from 'react-redux';
import { Badge } from 'react-bootstrap';

import selectors from '../redux/selectors/index';
import ActionCreators from '../redux/actions/index';

import Dashboard from './Dashboard';
import ContentTable from 'components/content/table/index';
import FormFetchContent from 'components/form/fetch/Content';
import SentimentReportAlert from 'components/sentiment/report/Alert';

class Content extends React.PureComponent {
  // componentDidMount() {
  //   this.props.dispatch(ActionCreators.requestSentimentReport());
  // }
  render() {
    return (
      <Dashboard>
        <div id='content-page' className="contentPage">
          <h1>Content List</h1>
          {/* <button onClick={this.handleTest}>Test</button> */}
          <FormFetchContent />
          <div style={{ margin: '10px 10px', display: 'flex' }}>
            <p style={{ marginRight: '1rem' }}>
              Total Records Without Limit Date <Badge>{this.props.totalContentWithoutLimitDate}</Badge>
            </p>
            {/* {this.state.getting && <ReactLoading type="spin" color={"#2196f3"} height={16} width={16} />} */}
          </div>
          <div>
            <SentimentReportAlert />
          </div>
          <ContentTable />
        </div>
      </Dashboard>
    );
  }
  handleTest = () => {
    this.props.dispatch(ActionCreators.requestSentimentReport());
  }
}

const mapStateToProps = state => {
  const totalContentWithoutLimitDate = selectors.getTotalContentWithoutLimitDate(state);
  // const sentimentReport = selectors.getSentimentReport(state);
  return {
    totalContentWithoutLimitDate,
    // sentimentReport,
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     changeDateRangeForService: (payload) => {
//       dispatch(ActionCreators.changeDateRangeForService({ payload }));
//     },
//     changeService: (payload) => {
//       dispatch(ActionCreators.changeService({ payload }));
//     },
//   };
// };

export default connect(mapStateToProps)(Content);
