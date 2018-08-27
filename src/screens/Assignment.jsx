import React, { Component } from "react";
import Dashboard from "./Dashboard";
import SelectDate from "../components/SelectDate";
import app from "../feathers-client/app";
import CustomTable from "../components/CustomTable";
import { Button } from "react-bootstrap";

class Assignment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allUser: null,
      assignedUser: []
    };
  }
  showDataContent = () => {
    if (this.state.allUser) {
      return this.state.allUser.map((item, index) => {
        return (
          <tr key={item._id} style={{ textAlign: "center" }}>
            <td>{item.username}</td>
            <td>
              <input type="checkbox" value={item._id} onChange={e => this.doCheck(e)}/>
            </td>
          </tr>
        );
      });
    }
  };
  doCheck = e => {
    let checkStt = e.target.checked;
    let checkedID = e.target.value;
    if(checkStt === true){
      this.setState({
        assignedUser: [...this.state.assignedUser, checkedID]
      });
    }else{
      let currentArr = [...this.state.assignedUser];
      let newArr = currentArr.filter(item => {
        return item !== checkedID
      });
      this.setState({
        assignedUser: newArr
      })
    }
  }
  doFilter = filterData => {
    console.log("test filter data: ", filterData);
  };
  componentDidMount() {
    app
      .service("users")
      .find({ query: { $limit: null } })
      .then(allUser => {
        this.setState({
          allUser: allUser.data
        });
      });
  }
  doAsssign = () => {
    console.log(this.state.assignedUser);
  }
  render() {
    let allHeaders = ["User Name", "Select For Assign"];
    return (
      <Dashboard>
        <div className="assignmentPage">
          <div>
            <SelectDate doFilter={this.doFilter} />
          </div>
          <div>
            {this.state.allUser ? (
              <CustomTable headers={allHeaders}>
                {this.showDataContent()}
                <tr>
                  <td colSpan={`${allHeaders.length}`}>
                    <Button onClick={this.doAsssign} style={{ width: "100%" }}>Assign</Button>
                  </td>
                </tr>
              </CustomTable>
            ) : null}
          </div>
        </div>
      </Dashboard>
    );
  }
}

export default Assignment;
