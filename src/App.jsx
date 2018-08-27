import React from "react";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFrown, faSmile, faMeh, faQuestion } from '@fortawesome/free-solid-svg-icons'
// import { observable } from 'mobx';
// import { observer } from 'mobx-react';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from "react-router-dom";
import LoginPage from "screens/Login";
import HomePage from "screens/Home";
import ConentListPage from "screens/Content";
import SentimentListPage from "screens/Sentiment";
import HistoryPage from "screens/History";
import AssignmentPage from "screens/Assignment";
import NewUserPage from "screens/NewUser";
import { connect } from "react-redux";
import * as loginAct from "./redux/actions/login";
import NotificationsSystem from 'reapop';
import theme from 'reapop-theme-bootstrap';
import PrivateRoute from 'components/route/private/index';

library.add(faFrown, faSmile, faMeh, faQuestion)

class App extends React.PureComponent {

	componentDidMount() {
		const accessToken = window.localStorage.getItem("sentiment_multi_access_token");
		this.props.doAuthenticate(accessToken);
	}

	render() {
		if (this.props.loginInfo.authenticating === false) {
			return (
				<Router>
					<div className="App">
						<NotificationsSystem theme={theme} />
						<Switch>
							<PrivateRoute
								path="/"
								component={HomePage}
								isLogined={this.props.loginInfo.logined}
								exact={true}
							/>
							<PrivateRoute
								path="/new-user"
								component={NewUserPage}
								isLogined={this.props.loginInfo.logined}
								exact={true}
							/>
							<Route path="/login" component={LoginPage} exact={true} />
							<PrivateRoute
								path="/content-list"
								component={ConentListPage}
								isLogined={this.props.loginInfo.logined}
								exact={true}
							/>
							<PrivateRoute
								path="/sentiment-list"
								component={SentimentListPage}
								isLogined={this.props.loginInfo.logined}
								exact={true}
							/>
							<PrivateRoute
								path="/history"
								component={HistoryPage}
								isLogined={this.props.loginInfo.logined}
								exact={true}
							/>
							<PrivateRoute
								path="/assignment"
								component={AssignmentPage}
								isLogined={this.props.loginInfo.logined}
								exact={true}
							/>
						</Switch>
					</div>
				</Router>
			);
		}
		return null;
	}
}

const mapStateToProps = (rootState) => {
	return {
		loginInfo: rootState.loginInfo,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		doAuthenticate: (accessToken) => {
			return dispatch(loginAct.requestAuthenticate(accessToken));
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(App);
