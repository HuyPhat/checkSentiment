import * as assignConst from '../constants/assignment';

const initState = {
    assigning: false,
    assigned: false,
    error: null
}

const assignReducer = (state = initState, action) => {
    switch(action.type){
        case assignConst.DO_ASSIGN: {
            return {
                ...state,
                assigning: true
            }
        }
        case assignConst.ASSIGN_SUCCESSED:{
            return {
                ...state,
                assigning: false,
                assigned: true
            }
        }
        case assignConst.ASSIGN_FAILED:{
            return {
                ...state,
                assigning: false,
                assigned: false,
                error: action.payload
            }
        }
        default: {
            return state;
        }
    }
}

export default assignReducer;