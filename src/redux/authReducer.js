import { stopSubmit } from "redux-form";
import { AuthAPI} from "../api/api";

const SET_USER_DATA = "SET_USER_DATA";
const SET_CAPTCHA = "SET_CAPTCHA";

let defaultState = {
    id: null,
    login: null,
    email: null,
    isAuth: false,
    captcha: null
}

const authReducer = (state = defaultState, action) =>{
    switch(action.type){
        case SET_USER_DATA:
            return {...state, ...action.data}
        case SET_CAPTCHA:
            return {...state, captcha: action.captcha}
        default:
            return state ;
        
    }
}   

export const setUserData = (id, login, email, isAuth) =>{
    return {type: SET_USER_DATA, data: {id, login, email, isAuth}}
}

export const setCaptcha = (captcha) =>{
    return {type: SET_CAPTCHA, captcha}
}

export const setAuthUser = () => async (dispatch) => {

    let response = await AuthAPI.authMe()

    if (response.resultCode === 0){
        let {id, login, email} = response.data;
        dispatch(setUserData(id, login, email, true));
    } 
}

export const getCaptcha = () => async (dispatch) => {

    let response = await AuthAPI.getCaptchaUrl()
    debugger
    
    dispatch(setCaptcha(response.data.url)); 
}

export const loginUser = (login, password, rememberMe, captcha) => async (dispatch) =>{

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

export const logoutUser = () => async (dispatch) =>{

    let response = await AuthAPI.logoutMe()

    if (response.data.resultCode === 0){
        dispatch(setUserData(null, null, null, false));
    }
}


export default authReducer;