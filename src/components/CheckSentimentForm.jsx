import React from "react";
import { Panel, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import ActionCreators from '../redux/actions/index';
import * as sentimentActs from "../redux/actions/sentiment";
import * as cmtActs from "../redux/actions/comments";
import * as postActs from "../redux/actions/posts";
import SentimentStatus from "components/SentimentStatus";
import Brand from 'components/brand/index';


const getStatus = (status) => {
  if (status === '10') {
    return 'unknown'
  }
  if (status === '0') {
    return 'neutral'
  }
  if (status === '1') {
    return 'positive'
  }
  if (status === '-1') {
    return "negative"
  }
}

// function IconButtonWithTooltip({ id, children, buttonName, iconName, tooltip, sentiment, doCheckSentiment, color }) {
//   return (
//     <OverlayTrigger
//       overlay={<Tooltip id={id}>{tooltip}</Tooltip>}
//       placement="top"
//       delayShow={300}
//       delayHide={150}
//     >
//       <Button name={buttonName} onClick={doCheckSentiment} disabled={buttonName === sentiment}>
//         <FontAwesomeIcon icon={iconName} color={color} />
//       </Button>
//     </OverlayTrigger>
//   );
// }

class CheckSentimentForm extends React.PureComponent {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     sentiment: props.item.sentiment
  //   }
  //   // console.log('>>> props >>>> ', props.item.sentiment);
  //   // console.log('>>> state >>>> ', this.state);
  //   // if (props.item.fid === '1830413997261588_1830488340587487') {
  //   //   console.log(props.item);
  //   // }
  // }

  state = {
    sentiment: this.props.item.sentiment
  }

  checkSentiment = sentiment => async () => {
    let sentimentData = {
      id: this.props.item.id,
      fid: this.props.item.fid,
      branchName: this.props.item.branchName,
      industryName: this.props.item.industryName,
      serviceName: this.props.item.serviceName
    };
    sentimentData["sentimentPoint"] = sentiment;
    try {
      const checkStatus = await this.props.doCheckSentiment(sentimentData);
      // console.log(checkStatus);
      if (checkStatus.data.status) {
        this.setState({ sentiment });
        // this.props.dispatch(ActionCreators.updateSentiment({ updatedSentiment: checkStatus.data.content }));
        this.props.updateSentiment(checkStatus.data.content);
      }
      else {
        alert("Check sentiment failed, please try again !");
      }
    }
    catch (error) {
      alert(error);
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.item.sentiment !== this.state.sentiment) {
      this.setState({ sentiment: nextProps.item.sentiment });
    }
  }

  render() {
    // if (this.props.item.fid === "205400663141440_654203071594528") {
    //   console.log(this.props.item.sentiment);
    //   console.log(getStatus(this.state.sentiment))
    // }
    return (
      <Panel>
        <Panel.Heading>
          <Brand brand={this.props.item.brand} alt={this.props.item.brand} />
          <p>
            <strong>Industry: {this.props.item.industry}</strong>
          </p>
          {this.state.sentiment.length > 0 && <SentimentStatus sentiment={getStatus(this.state.sentiment)} />}
        </Panel.Heading>
        <Panel.Body
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          {/* <IconButtonWithTooltip id='unknown-tooltip' tooltip="unknown" buttonName='unknown' iconName="question" sentiment={this.state.sentiment} doCheckSentiment={this.doCheckSentiment} />
          <IconButtonWithTooltip id='positive-tooltip' tooltip="positive" buttonName='positive' iconName="smile" sentiment={this.state.sentiment} doCheckSentiment={this.doCheckSentiment} color="green" />
          <IconButtonWithTooltip id='negative-tooltip' tooltip="negative" buttonName='negative' iconName="frown" sentiment={this.state.sentiment} doCheckSentiment={this.doCheckSentiment} color="red" />
          <IconButtonWithTooltip id='neutral-tooltip' tooltip="neutral" buttonName='neutral' iconName="meh" sentiment={this.state.sentiment} doCheckSentiment={this.doCheckSentiment} color="orange" /> */}
          <Button
            name="unknown"
            bsStyle="default"
            onClick={this.checkSentiment('10')}
            disabled={"unknown" === this.state.sentiment}
          >
            <FontAwesomeIcon icon="question" />
          </Button>
          <Button
            name="positive"
            bsStyle="success"
            onClick={this.checkSentiment('1')}
            disabled={"positive" === this.state.sentiment}
          >
            <FontAwesomeIcon icon="smile" />
          </Button>
          <Button
            name="negative"
            bsStyle="danger"
            onClick={this.checkSentiment('-1')}
            disabled={"negative" === this.state.sentiment}
          >
            <FontAwesomeIcon icon="frown" />
          </Button>
          <Button
            name="neutral"
            bsStyle="warning"
            onClick={this.checkSentiment('0')}
            disabled={"neutral" === this.state.sentiment}
          >
            <FontAwesomeIcon icon="meh" />
          </Button>
        </Panel.Body>
      </Panel>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doCheckSentiment: sentimentData => {
      return dispatch(sentimentActs.requestCheckSentiment(sentimentData));
    },
    doRefreshComments: (from, to) => {
      dispatch(cmtActs.requestGetAllComments(from, to));
      dispatch(cmtActs.requestGetAllCommentsNotSentiment(from, to));
      dispatch(cmtActs.getAllContent(from, to));
      dispatch(cmtActs.getAllAssignedContent(from, to));
      dispatch(cmtActs.getTotalContent());
    },
    doRefreshPosts: (from, to) => {
      dispatch(postActs.requestGetAllPosts(from, to));
      dispatch(postActs.requestGetAllPostsNotSentiment(from, to));
      dispatch(postActs.getAllContent(from, to));
      dispatch(postActs.getAllAssignedContent(from, to));
      dispatch(postActs.getTotalContent());
    },
    updateSentiment: (updatedSentiment) => {
      dispatch(ActionCreators.updateSentiment({ updatedSentiment }));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(CheckSentimentForm);
