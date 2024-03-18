"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveProfile = exports.updatePhoto = exports.updateStatus = exports.getStatus = exports.setProfile = exports.setStatus = exports.setUserProfile = exports.addPostActionCreator = void 0;
const redux_form_1 = require("redux-form");
const api_1 = require("../api/api");
const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const SET_PHOTOS = "SET_PHOTO";
let defaultState = {
    MyPostsData: [
        { likes: "18", message: "MEU MEU MEU" },
        { likes: "6", message: "MEOW WORLD" },
        { likes: "15", message: "I MEOW YOU" }
    ],
    profile: null,
    status: ""
};
const profileReducer = (state = defaultState, action) => {
    let stateCopy = Object.assign({}, state);
    switch (action.type) {
        case ADD_POST:
            stateCopy.MyPostsData = [...state.MyPostsData];
            let newPost = {
                message: action.text,
                likes: "0"
            };
            stateCopy.MyPostsData.push(newPost);
            return stateCopy;
        case SET_USER_PROFILE:
            return Object.assign(Object.assign({}, state), { profile: action.profile });
        case SET_STATUS:
            return Object.assign(Object.assign({}, state), { status: action.status });
        case SET_PHOTOS:
            return Object.assign(Object.assign({}, state), { profile: Object.assign(Object.assign({}, state.profile), { photos: action.photos }) });
        default:
            return stateCopy;
    }
};
const addPostActionCreator = (text) => {
    return { type: ADD_POST, text };
};
exports.addPostActionCreator = addPostActionCreator;
const setUserProfile = (profile) => {
    return { type: SET_USER_PROFILE, profile };
};
exports.setUserProfile = setUserProfile;
const setStatus = (status) => {
    return { type: SET_STATUS, status };
};
exports.setStatus = setStatus;
const setPhoto = (photos) => {
    return { type: SET_PHOTOS, photos };
};
const setProfile = (userId) => (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
    let response = yield api_1.profileAPI.getProfile(userId);
    dispatch((0, exports.setUserProfile)(response));
});
exports.setProfile = setProfile;
const getStatus = (userId) => (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
    let response = yield api_1.profileAPI.getStatus(userId);
    let status = response;
    dispatch((0, exports.setStatus)(status));
});
exports.getStatus = getStatus;
const updateStatus = (status) => (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
    let response = yield api_1.profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
        dispatch((0, exports.setStatus)(status));
    }
});
exports.updateStatus = updateStatus;
const updatePhoto = (file) => (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
    let response = yield api_1.profileAPI.updatePhoto(file);
    if (response.data.resultCode === 0) {
        dispatch(setPhoto(response.data.data.photos));
    }
});
exports.updatePhoto = updatePhoto;
const saveProfile = (profileData) => (dispatch, getState) => __awaiter(void 0, void 0, void 0, function* () {
    let id = getState().Auth.id;
    let response = yield api_1.profileAPI.saveProfile(profileData);
    if (response.data.resultCode === 0) {
        dispatch((0, exports.setProfile)(id));
        return true;
    }
    else {
        let message = response.data.messages.length > 0 ? response.data.messages[0] : "something wrong";
        dispatch((0, redux_form_1.stopSubmit)("profileData", { _error: message }));
        return false;
    }
});
exports.saveProfile = saveProfile;
exports.default = profileReducer;
