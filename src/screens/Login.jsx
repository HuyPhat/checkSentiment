import React, { Component } from "react";
import LoginForm from "../components/Login";
import * as loginActs from "../redux/actions/login";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			alert: {
				type: "",
				message: "",
			},
		};
	}
	doLogin = (loginInfo) => {
		this.props
			.requestLogin(loginInfo)
			.then((logined) => {
				console.log("Login successed !");
			})
			.catch((err) => {
				this.setState({
					alert: {
						type: "danger",
						message: this.props.loginInfo.error,
					},
				});
			});
	};
	render() {
		// this.props.location.state.from.pathname
		if (this.props.loginInfo.logined && this.props.loginInfo.userInfo) {
			return (
				<Redirect
					to={
						this.props.location.state
							? this.props.location.state.from.pathname
							: "/"
					}
				/>
			);
		}
		return (
			<div className="loginPage">
				<h1 style={{ textAlign: "center" }}>
					Welcome to sentiment for multi branches
				</h1>
				<LoginForm doLogin={this.doLogin} alert={this.state.alert} />
			</div>
		);
	}
}

const mapStateToProps = (rootState) => {
	return {
		loginInfo: rootState.loginInfo,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		requestLogin: (loginInfo) => {
			return dispatch(loginActs.requestLogin(loginInfo));
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Login);
