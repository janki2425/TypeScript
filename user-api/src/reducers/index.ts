import {UserState, UserActionTypes, UserActions} from '../types';

const initialState:UserState={
    users:[],
    loading:false,
    error:null,
}

const rootReducer = (state=initialState,action:UserActions): UserState => {
    switch(action.type){
        case UserActionTypes.FETCH_USERS_REQUEST:
            return {...state,loading:true,error:null}
        case UserActionTypes.FETCH_USERS_SUCCESS:
            return { ...state, loading: false, users: action.payload };
        
        case UserActionTypes.FETCH_USERS_FAILURE:
        return { ...state, loading: false, error: action.payload };
    
        default:
        return state;
    }
}

export { rootReducer}