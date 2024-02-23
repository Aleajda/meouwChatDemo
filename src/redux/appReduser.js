import { setAuthUser } from "./authReducer";

const SET_INITIALIZED = "SET_INITIALIZED";

let defaultState = {
    initialized: false,
}

const appReducer = (state = defaultState, action) =>{
    switch(action.type){
        case SET_INITIALIZED:
            return {...state, initialized: true}
        default:
            return state ;
        
    }
}   

export const initializedSuccess = () => ({type: SET_INITIALIZED});

export const initializeApp = () => async (dispatch) =>{
    let promise = dispatch(setAuthUser());
    await Promise.all([promise]);
    dispatch(initializedSuccess());
}

export default appReducer;