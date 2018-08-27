import * as generalConst from '../constants/general';
import app from '../../feathers-client/app';

export const setSelectorHomePage = value => {
    return {
        type: generalConst.SET_SELECT_TYPE_HOME_PAGE,
        payload: value
    }
}

export const requestAllUser = () => {
    return async dispatch => {
        try{
            let allUser = await app.service("users").find({ query: { $limit: null } });
            let finalResult = allUser.data.map(user => {
                return {
                    email: user.email,
                    username: user.username
                };
            })
            dispatch(getUserList(finalResult));
            return Promise.resolve();
        }catch(e){
            return Promise.reject();
        }
    }
}

export const getUserList = userList => {
    return {
        type: generalConst.GET_ALL_USERS,
        payload: userList
    }
}