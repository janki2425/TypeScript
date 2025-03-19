import {User, UserActionTypes, UserActions} from '../types';
import {Dispatch} from 'redux';
import axios from 'axios';

export const fetchUsersRequest = ():UserActions =>({
    type:UserActionTypes.FETCH_USERS_REQUEST,
});
export const fetchUserSuccess = (users: User[]):UserActions =>({
    type:UserActionTypes.FETCH_USERS_SUCCESS,
    payload:users,
});
export const fetchUserFailure = (error : string):UserActions =>({
    type:UserActionTypes.FETCH_USERS_FAILURE,
    payload:error,
});

export const fetchUsers = () => async (dispatch: Dispatch<UserActions>) => {
    dispatch({type:UserActionTypes.FETCH_USERS_REQUEST});

    try{
        const response = await axios.get("https://jsonplaceholder.typicode.com/users");
        dispatch({type:UserActionTypes.FETCH_USERS_SUCCESS,payload:response.data});
    }
    catch(error){
        dispatch({type:UserActionTypes.FETCH_USERS_FAILURE,payload:error instanceof Error ? error.message:'an error occurred'})
    }
}
