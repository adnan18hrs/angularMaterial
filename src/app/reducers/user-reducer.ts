import { UserData } from "../model/userData";
import { USER_ADD, USER_DELETE, USER_LIST_ERROR, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_UPDATE, USER_LOGOUT_SUCCESS } from "src/app/actions/user-action";
import { Action } from "src/app/actions";

export interface UserReducerState{
    loading:boolean;
    loaded:boolean;
    error:boolean;
    logout:boolean;
    users:UserData;
}
const initialState:UserReducerState={
    loaded:false,
    loading:false,
    error:false,
    logout:true,
    users:null
}
// 3. this reducer will be called because "new UserListRequestAction()" action is dispatched from user.component.ts 
export function UserReducer(state=initialState, action:Action):UserReducerState{
    switch(action.type){
        case USER_LIST_REQUEST:{
            return {...state, loading:true};
        }
        case USER_LIST_SUCCESS:{
            //const updatedUsers = state.users.concat(action.payload.data);
            console.log("action.payload.data = ", action.payload.data.email);
            const updatedUsers = action.payload.data;
            return {...state, loading:false, loaded:true, users:updatedUsers, error:false, logout:false};
        }
        case USER_DELETE:{
            //const users = state.users.filter(data=>data.id!==action.payload.id);
            //return {...state, ...{users}};
        }
        case USER_ADD:{
            //const users = state.users.concat(action.payload.data);
            //return {...state, ...{users}};
        }
        case USER_LOGOUT_SUCCESS:{
            //const users = state.users.filter(data=>data.id!==action.payload.data.id);
            //const updateUser = users.concat(action.payload.data);
            return {...state, users:null, loading:false, loaded:false, error:false, logout:true};
        }
        case USER_LIST_ERROR:{
            return {...state, error:true, loading:false};
        }
        default:{
            return state;
        }
    }
}
//selectors (used to access the value present inside state, (it is a kind of BehaviralSubject))
export const getLoading = (state:UserReducerState) => state.loading;
export const getLoaded = (state:UserReducerState) => state.loaded;
export const getLogout = (state:UserReducerState) => state.logout;
export const getError = (state:UserReducerState) => state.error;
export const getUsers = (state:UserReducerState) => state.users;


