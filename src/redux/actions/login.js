import * as loginConst from "../constants/login";
import app from "../../feathers-client/app";

export const requestLogin = (loginInfo) => {
	return async (dispatch) => {
		try {
			dispatch(doLogin());
			let authStt = await app.authenticate({
				strategy: "local",
				email: loginInfo.email,
				password: loginInfo.password,
			});
			let secondAuth = await app.passport.verifyJWT(authStt.accessToken);
			let userInfo = await app.service("users").get(secondAuth.userId);
			dispatch(loginSuccessed(userInfo));
			window.localStorage.setItem(
				"sentiment_multi_access_token",
				authStt.accessToken,
			);
			return Promise.resolve();
		} catch (e) {
			dispatch(loginFailed(e.message));
			return Promise.reject();
		}
	};
};

export const doLogin = () => {
	return {
		type: loginConst.DO_LOGIN,
	};
};

export const loginSuccessed = (userInfo) => {
	return {
		type: loginConst.LOGIN_SUCCESSED,
		payload: userInfo,
	};
};

export const loginFailed = (error) => {
	return {
		type: loginConst.LOGIN_FAILED,
		payload: error,
	};
};

export const doLogout = () => {
	return {
		type: loginConst.DO_LOGOUT,
	};
};

export const requestAuthenticate = (accessToken) => {
	return async (dispatch) => {
		try {
			dispatch(doAuthenticate());
			let authStep1 = await app.authenticate({
				strategy: "jwt",
				accessToken,
			});
			let secondAuth = await app.passport.verifyJWT(authStep1.accessToken);
			let userInfo = await app.service("users").get(secondAuth.userId);
			dispatch(authSuccessed(userInfo));
			window.localStorage.setItem(
				"sentiment_multi_access_token",
				authStep1.accessToken,
			);
		} catch (e) {
			dispatch(authFailed());
		}
	};
};

export const doAuthenticate = () => {
	return {
		type: loginConst.DO_AUTHENTICATE,
	};
};

export const authSuccessed = (userInfo) => {
	return {
		type: loginConst.AUTH_SUCCESSED,
		payload: userInfo,
	};
};

export const authFailed = () => {
	return {
		type: loginConst.AUTH_FAILED,
	};
};
