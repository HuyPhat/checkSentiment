import React from "react";
import { SplitButton, MenuItem, DropdownButton } from "react-bootstrap";

class CustomDropDown extends React.PureComponent {
  state = {
    title: this.props.title
  }

  onChange = (eventKey) => {
    this.setState({
      title: eventKey
    });
    this.props.doSelected(eventKey);
  };

  render() {
    const allOptions = this.props.options.map((option, index) => {
      return (
        <MenuItem onSelect={e => this.onChange(e)} key={index} eventKey={option}>
          {option}
        </MenuItem>
      );
    });
    // return (
    //   <SplitButton
    //     title={this.state.title}
    //     pullRight
    //     id="split-button-pull-right"
    //     style={{minWidth: '100px'}}
    //     disabled={this.props.disabled}
    //   >
    //     {allOptions}
    //   </SplitButton>
    // );
    return (
      <DropdownButton
        bsStyle={'default btn-group-content-type'}
        title={this.state.title || 'Content Type'}
        id={'dropdown-basic-content-type'}
      >
        {allOptions}
      </DropdownButton>
    )
  }
}

export default CustomDropDown;
