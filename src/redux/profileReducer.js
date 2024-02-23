import { profileAPI } from "../api/api";

const add_post_text = "ADD-POST-TEXT";
const add_post = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";

let defaultState = {
    MyPostsData: [
        { likes: "18", message: "MEU MEU MEU" },
        { likes: "6", message: "MEOW WORLD" },
        { likes: "15", message: "I MEOW YOU" }
    ],
    profile: null,
    status: ""
}

const profileReducer = (state = defaultState, action) =>{
    let stateCopy = {...state};
    switch(action.type){
        case add_post:
            stateCopy.MyPostsData = [...state.MyPostsData];
            let newPost = {
                message: action.text,
                likes: "0"
            }
            stateCopy.MyPostsData.push(newPost);
            return stateCopy;  
        case SET_USER_PROFILE:
            return {...state, profile: action.profile};
        case SET_STATUS:
            return {...state, status: action.status};
        default:
            return stateCopy;
    }   
}

export const addPostActionCreator = (text) =>{
    return {type: add_post, text};
}

export const setUserProfile = (profile) =>{
    return {type: SET_USER_PROFILE, profile}
}

export const setStatus = (status) =>{
    return {type: SET_STATUS, status}
}

export const setProfile = (userId) => async (dispatch) => {

    let response =  await profileAPI.getProfile(userId)
    dispatch(setUserProfile(response));
};


export const getStatus = (userId) => async (dispatch) => {

    let response = await profileAPI.getStatus(userId)
    let status = response
    dispatch(setStatus(status));
};

export const updateStatus = (status) => async (dispatch) => {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0){
        dispatch(setStatus(status));
    }
};

export default profileReducer;