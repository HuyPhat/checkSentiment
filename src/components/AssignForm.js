import React from "react";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import CustomTable from "./CustomTable";

class AssignForm extends React.PureComponent {
  state = {
    numberRecords: 0,
    userAssignList: []
  }

  render() {
    return (
      <div>
        {this.props.users ? (
          <CustomTable headers={this.props.headers}>
            {this.showDataContent()}
            <tr>
              <td colSpan={`${this.props.headers.length}`}>
                <InputGroup style={{ margin: "0 auto" }}>
                  <FormControl
                    value={this.state.numberRecords}
                    min={0}
                    onChange={e => this.inputChanged(e)}
                    type="number"
                    placeholder="Enter number records"
                  />
                  <InputGroup.Button>
                    <Button bsStyle="primary" onClick={this.handleAssignClick}>
                      Assign
                    </Button>
                  </InputGroup.Button>
                </InputGroup>
              </td>
            </tr>
          </CustomTable>
        ) : null}
      </div>
    );
  }

  inputChanged = e => {
    this.setState({
      numberRecords: e.target.value
    });
  };

  doCheck = e => {
    if (e.target.checked) {
      this.setState({
        userAssignList: [...this.state.userAssignList, e.target.value]
      });
    } else {
      let newList = this.state.userAssignList.filter(email => {
        return email !== e.target.value;
      });
      this.setState({
        userAssignList: newList
      });
    }
  };

  handleAssignClick = () => {
    const { userAssignList, numberRecords } = this.state;
    if (userAssignList.length <= 0) {
      alert("Please check user want to assign !");
    }
    else if (numberRecords <= 0) {
      alert("Number of assign records must more than 0 !");
    }
    else {
      this.props.onAssign(userAssignList, numberRecords);
    }
  }

  // doAsssign = () => {
  //   if (this.state.userAssignList.length <= 0) {
  //     alert("Please check user want to assign !");
  //   } else if (this.state.numberRecords <= 0) {
  //     alert("Number of assign records must more than 0 !");
  //   } else {
  //     this.props.onAssign(this.state.userAssignList, this.state.numberRecords);
  //     // const fromEmail = this.props.loginInfo.userInfo.email;
  //     // const { date, service } = this.props
  //     // const { userAssignList, numberRecords } = this.state;
  //     // this.props.dispatch(assignmentActs.requestAssign(service, fromEmail, userAssignList, numberRecords, date.ffrom, date.fto))
  //     //   .then(rs => {
  //     //     this.props.requestContentAfterAssignSuccess();
  //     //   });
  //     // this.props.doAsssign(
  //     //   serviceName,
  //     //   fromEmail,
  //     //   this.state.userAssignList,
  //     //   this.state.numberRecords,
  //     //   this.props.date.ffrom,
  //     //   this.props.date.fto
  //     // ).then(rs => {
  //     //   this.props.assgined();
  //     // });
  //   }
  // };

  showDataContent = () => {
    if (this.props.users) {
      return this.props.users.map((user, index) => {
        return (
          <tr key={index} style={{ textAlign: "center" }}>
            <td>{user.email}</td>
            <td>{user.username}</td>
            <td>
              <input
                type="checkbox"
                value={user.email}
                onChange={e => this.doCheck(e)}
              />
            </td>
          </tr>
        );
      });
    }
  };
}

export default AssignForm
