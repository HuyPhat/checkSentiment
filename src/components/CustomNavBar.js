import React, { Component } from 'react';
import { Nav, Navbar, NavDropdown, MenuItem, NavItem } from 'react-bootstrap';
import app from '../feathers-client/app';
import { connect } from 'react-redux';
import * as loginActs from '../redux/actions/login';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

const linkStyle = { lineHeight: '50px', margin: '0 15px' };

class CustomNavBar extends React.PureComponent {
  doLogout = () => {
    window.localStorage.removeItem('sentiment_multi_access_token');
    app.logout();
    this.props.doLogout();
    window.location.reload();
  };
  render() {
    const { loginInfo } = this.props;
    return (
      <Navbar collapseOnSelect fixedTop fluid className="bs-docs-nav">
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Sentiment for multiple brands</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>

        <Navbar.Collapse>
          <Nav>
            <LinkContainer to='/content-list'>
              <NavItem eventKey={1} className='nav-item'>
                Contents
              </NavItem>
            </LinkContainer>
            {/* <LinkContainer to='/sentiment-list'>
              <NavItem eventKey={2} className='nav-item'>
                Sentiments
              </NavItem>
            </LinkContainer>
            <LinkContainer to='/history'>
              <NavItem eventKey={1} className='nav-item'>
                History
              </NavItem>
            </LinkContainer> */}
          </Nav>
          <Nav pullRight>
            <NavDropdown
              eventKey={3}
              title={this.props.loginInfo.userInfo.email}
              id="basic-nav-dropdown">
              {loginInfo.userInfo.role === 0 && (
                <MenuItem eventKey={3.1} href="/new-user">New User</MenuItem>
              )}
              <MenuItem divider />
              <MenuItem eventKey={3.2} onClick={this.doLogout}>
                Sign out
              </MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doLogout: () => {
      dispatch(loginActs.doLogout());
    }
  };
};

const mapState = state => ({
  loginInfo: state.loginInfo
});

export default connect(
  mapState,
  mapDispatchToProps
)(CustomNavBar);
