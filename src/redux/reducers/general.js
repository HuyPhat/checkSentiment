import * as generalConst from '../constants/general';

const initState = {
    homePageSelector: null,
    userList: []
}

const generalReducer = (state = initState, action) => {
    switch(action.type){
        case generalConst.SET_SELECT_TYPE_HOME_PAGE: {
            return {
                ...state,
                homePageSelector: action.payload
            }
        }
        case generalConst.GET_ALL_USERS: {
            return {
                ...state,
                userList: action.payload
            }
        }
        default: {
            return state;
        }
    }
}

export default generalReducer;