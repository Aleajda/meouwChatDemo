import { stopSubmit } from "redux-form";
import { AuthAPI } from "../api/api";

const SET_USER_DATA = "SET_USER_DATA";
const SET_CAPTCHA = "SET_CAPTCHA";


export type DefaultStateType = {
    id: number | null,
    login: string | null,
    email: string | null,
    isAuth: boolean,
    captcha: string | null
}

let defaultState:DefaultStateType = {
    id: null,
    login: null,
    email: null,
    isAuth: false,
    captcha: null
}

const authReducer = (state = defaultState, action:any):DefaultStateType =>{
    switch(action.type){
        case SET_USER_DATA:
            return {...state, ...action.data}
        case SET_CAPTCHA:
            return {...state, captcha: action.captcha}
        default:
            return state ;
        
    }
}


type setUserDataActionType = {
    type: typeof SET_USER_DATA,
    data:{
        id: number | null,
        login: string | null,
        email: string | null,
        isAuth: boolean
    }
}

export const setUserData = (id: number|null, login: string|null, email: string|null, isAuth: boolean):setUserDataActionType =>{
    return {type: SET_USER_DATA, data: {id, login, email, isAuth}}
}


type setCaptchaActionType = {
    type: typeof SET_CAPTCHA,
    captcha: string | null
}

export const setCaptcha = (captcha:string|null):setCaptchaActionType =>{
    return {type: SET_CAPTCHA, captcha}
}

export const setAuthUser = () => async (dispatch:any) => {

    let response = await AuthAPI.authMe()

    if (response.resultCode === 0){
        let {id, login, email} = response.data;
        dispatch(setUserData(id, login, email, true));
    } 
}

export const getCaptcha = () => async (dispatch:any) => {

    let response = await AuthAPI.getCaptchaUrl()
    debugger
    
    dispatch(setCaptcha(response.data.url)); 
}

export const loginUser = (login: string, password: string, rememberMe: boolean|undefined, captcha: string) => async (dispatch:any) =>{

    let response = await AuthAPI.logMe(login, password, rememberMe, captcha)

    if (response.data.resultCode === 0){
        dispatch(setAuthUser());
        dispatch(setCaptcha(null));
    }
    else if (response.data.resultCode === 10){
        dispatch(getCaptcha());
    }
    else{
        let message = response.data.messages.length > 0 ? response.data.messages[0] : "something wrong";
        dispatch(stopSubmit("login", {_error: message}));
    }
    
}

export const logoutUser = () => async (dispatch:any) =>{
    let response = await AuthAPI.logoutMe()

    if (response.data.resultCode === 0){
        dispatch(setUserData(null, null, null, false));
    }
}


export default authReducer;