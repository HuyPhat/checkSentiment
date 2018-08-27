import React, { Component } from "react";
import Datetime from "react-datetime";
import { Button } from "react-bootstrap";

class SelectDate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      from_date: new Date(),
      to_date: new Date()
    };
  }
  fromDateChanged = e => {
    this.setState({
      from_date: e
    });
  };
  toDateChanged = e => {
    this.setState({
      to_date: e
    });
  };
  doFilter = () => {
    let frDate = null;
    let tDate = null;
    if (this.state.from_date._d) {
      frDate =
        this.state.from_date._d.getFullYear() +
        "-" +
        (this.state.from_date._d.getMonth()+1) +
        "-" +
        this.state.from_date._d.getDate() +
        " 00:00:01";
    } else {
      frDate =
        this.state.from_date.getFullYear() +
        "-" +
        (this.state.from_date.getMonth()+1) +
        "-" +
        this.state.from_date.getDate() +
        " 00:00:01";
    }
    if (this.state.to_date._d) {
      tDate =
        this.state.to_date._d.getFullYear() +
        "-" +
        (this.state.to_date._d.getMonth()+1) +
        "-" +
        this.state.to_date._d.getDate() +
        " 23:23:59";
    } else {
      tDate =
        this.state.to_date.getFullYear() +
        "-" +
        (this.state.to_date.getMonth()+1) +
        "-" +
        this.state.to_date.getDate() +
        " 23:23:59";
    }
    let filterData = {
      fromDate: frDate,
      toDate: tDate
    };
    this.props.doFilter(filterData);
  };
  render() {
    let validFromDate = function(current) {
      return current < new Date();
    };
    let fromDate = this.state.from_date;
    let validToDate = function(current) {
      return fromDate < current && current < new Date();
    };
    return (
      <div
        className="selectDate"
        style={{
          display: "flex",
          justifyContent: "space-around",
          width: "500px"
        }}
      >
        <div className="selectDateItem">
          <label>From date:</label>
          <Datetime
            dateFormat="YYYY-MM-DD"
            timeFormat={false}
            value={this.state.from_date}
            onChange={e => this.fromDateChanged(e)}
            isValidDate={validFromDate}
          />
        </div>
        <div className="selectDateItem">
          <label>To date:</label>
          <Datetime
            dateFormat="YYYY-MM-DD"
            timeFormat={false}
            value={this.state.to_date}
            onChange={e => this.toDateChanged(e)}
            isValidDate={validToDate}
          />
        </div>
        <div className="selectDateItem" style={{ alignSelf: "flex-end" }}>
          <Button onClick={this.doFilter}>Filter</Button>
        </div>
      </div>
    );
  }
}

export default SelectDate;
