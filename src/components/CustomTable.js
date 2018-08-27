import React, { Component } from "react";
import { Table } from "react-bootstrap";

class CustomTable extends Component {
  showAllHeaders = () => {
    return this.props.headers.map((header, index) => {
      return <th key={index} style={{textAlign:'center'}}>{header}</th>;
    });
  };
  render() {
    return (
      <div className="customTable">
        <Table striped bordered condensed hover>
          <thead>
            <tr>{this.showAllHeaders()}</tr>
          </thead>
          <tbody>{this.props.children}</tbody>
        </Table>
      </div>
    );
  }
}

export default CustomTable;
