import * as loginConst from '../constants/login';

const initState = {
    logined: false,
    doLogin: false,
    error: null,
    userInfo: null,
    authenticating: false
}

const loginReducer = (state = initState, action) => {
    switch(action.type){
        case loginConst.DO_LOGIN: {
            return {
                ...state,
                doLogin: true
            }
        }
        case loginConst.LOGIN_SUCCESSED:{
            return {
                ...state,
                doLogin: false,
                logined: true,
                userInfo: action.payload
            }
        }
        case loginConst.LOGIN_FAILED:{
            return {
                ...state,
                doLogin: false,
                error: action.payload
            }
        }
        case loginConst.DO_LOGOUT:{
            return {
                ...state,
                doLogin: false,
                userInfo: null,
                logined: false
            }
        }
        case loginConst.DO_AUTHENTICATE: {
            return {
                ...state,
                authenticating: true
            }
        }
        case loginConst.AUTH_SUCCESSED:{
            return {
                ...state,
                logined: true,
                userInfo: action.payload,
                authenticating: false
            }
        }
        case loginConst.AUTH_FAILED:{
            return {
                ...state,
                authenticating: false,
                error: action.payload
            }
        }
        default: {
            return state;
        }
    }
}

export default loginReducer;