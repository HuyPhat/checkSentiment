import * as React from 'react';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  PageHeader,
  ButtonToolbar,
  Button,
  Panel,
  Grid,
  Row,
  Col,
  Alert,
  Glyphicon
} from 'react-bootstrap';
import CustomNavBar from '../components/CustomNavBar';
import { connect } from 'react-redux';
import feathers from '../feathers-client/app';

class NewUser extends React.PureComponent {
  state = {
    form: {
      email: '',
      password: '',
      username: ''
    },
    processingNewUser: false,
    displayingAlert: false,
    createStatus: false,
    errorCreateUser: ''
  };

  // getValidationState() {
  //   let length = this.state.form.email.length;
  //   if (length > 10) return 'success';
  //   else if (length > 5) return 'warning';
  //   else if (length > 0) return 'error';
  //   return null;
  // }

  handleChange = fieldname => e => {
    this.setState({
      form: { ...this.state.form, [fieldname]: e.target.value }
    });
  };

  doAddNewUser = async e => {
    e.preventDefault();
    this.setState({ processingNewUser: true });
    try {
      const record = await feathers
        .service('users')
        .create({ ...this.state.form, role: 1 });
      this.setState({
        displayingAlert: true,
        processingNewUser: false,
        createStatus: true
      });
    } catch (error) {
      this.setState({
        displayingAlert: true,
        processingNewUser: false,
        createStatus: false,
        errorCreateUser: error.message,
        form: { email: '', password: '', username: '' }
      });
    }
  };

  render() {
    return (
      <section>
        <CustomNavBar userEmail={this.props.loginInfo.userInfo.username} />
        <Grid>
          <Row className="show-grid">
            <Col md={4} />
            <Col xs={12} md={4} style={{ marginTop: '2rem' }}>
              <Panel className="new-user-panel">
                <Panel.Body>
                  <PageHeader style={{ marginTop: 0 }}>Add New User</PageHeader>
                  <form onSubmit={this.doAddNewUser}>
                    <FormGroup controlId="formBasicText">
                      <ControlLabel>Email</ControlLabel>
                      <FormControl
                        type="email"
                        value={this.state.form.email}
                        onChange={this.handleChange('email')}
                      />
                      <FormControl.Feedback />
                    </FormGroup>
                    <FormGroup controlId="password">
                      <ControlLabel>Password</ControlLabel>
                      <FormControl
                        type="password"
                        value={this.state.form.password}
                        onChange={this.handleChange('password')}
                      />
                      <FormControl.Feedback />
                    </FormGroup>
                    <FormGroup controlId="username">
                      <ControlLabel>Username</ControlLabel>
                      <FormControl
                        type="text"
                        value={this.state.form.username}
                        onChange={this.handleChange('username')}
                      />
                      <FormControl.Feedback />
                    </FormGroup>
                    <ButtonToolbar>
                      <Button
                        bsStyle="primary"
                        type="submit"
                        disabled={this.state.processingNewUser}>
                        {this.state.processingNewUser
                          ? 'Creating User...'
                          : 'Create'}
                      </Button>
                      <Button
                        bsStyle="danger"
                        onClick={() =>
                          this.setState({
                            form: { email: '', password: '', username: '' }
                          })
                        }>
                        Reset
                      </Button>
                    </ButtonToolbar>
                    {this.state.displayingAlert && (
                      <Alert
                        style={{ marginTop: '2rem' }}
                        bsStyle={
                          this.state.createStatus ? 'success' : 'danger'
                        }>
                        {this.state.createStatus
                          ? 'User is created!'
                          : this.state.errorCreateUser}
                      </Alert>
                    )}
                  </form>
                </Panel.Body>
              </Panel>
            </Col>
            <Col md={4} />
          </Row>
        </Grid>
      </section>
    );
  }
}

const mapStateToProps = rootState => {
  return {
    loginInfo: rootState.loginInfo
  };
};

export default connect(
  mapStateToProps,
  null
)(NewUser);
