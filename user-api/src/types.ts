export interface User {
    id: number;
    name: string;
    email: string;
}
export interface UserState{
    users:User[];
    loading:boolean;
    error:string | null;
}

export enum UserActionTypes {
    FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST",
    FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS",
    FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE",
}

interface FetchUserRequestAction{
    type:UserActionTypes.FETCH_USERS_REQUEST;
}
interface FetchUserSuccessAction{
    type:UserActionTypes.FETCH_USERS_SUCCESS;
    payload:User[]
}
interface FetchUserFailureAction{
    type:UserActionTypes.FETCH_USERS_FAILURE;
    payload:string;
}

export type UserActions = FetchUserRequestAction | FetchUserSuccessAction | FetchUserFailureAction;