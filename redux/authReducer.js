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
exports.logoutUser = exports.loginUser = exports.getCaptcha = exports.setAuthUser = exports.setCaptcha = exports.setUserData = void 0;
const redux_form_1 = require("redux-form");
const api_1 = require("../api/api");
const SET_USER_DATA = "SET_USER_DATA";
const SET_CAPTCHA = "SET_CAPTCHA";
let defaultState = {
    id: null,
    login: null,
    email: null,
    isAuth: false,
    captcha: null
};
const authReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return Object.assign(Object.assign({}, state), action.data);
        case SET_CAPTCHA:
            return Object.assign(Object.assign({}, state), { captcha: action.captcha });
        default:
            return state;
    }
};
const setUserData = (id, login, email, isAuth) => {
    return { type: SET_USER_DATA, data: { id, login, email, isAuth } };
};
exports.setUserData = setUserData;
const setCaptcha = (captcha) => {
    return { type: SET_CAPTCHA, captcha };
};
exports.setCaptcha = setCaptcha;
const setAuthUser = () => (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
    let response = yield api_1.AuthAPI.authMe();
    if (response.resultCode === 0) {
        let { id, login, email } = response.data;
        dispatch((0, exports.setUserData)(id, login, email, true));
    }
});
exports.setAuthUser = setAuthUser;
const getCaptcha = () => (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
    let response = yield api_1.AuthAPI.getCaptchaUrl();
    debugger;
    dispatch((0, exports.setCaptcha)(response.data.url));
});
exports.getCaptcha = getCaptcha;
const loginUser = (login, password, rememberMe, captcha) => (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
    let response = yield api_1.AuthAPI.logMe(login, password, rememberMe, captcha);
    if (response.data.resultCode === 0) {
        dispatch((0, exports.setAuthUser)());
        dispatch((0, exports.setCaptcha)(null));
    }
    else if (response.data.resultCode === 10) {
        dispatch((0, exports.getCaptcha)());
    }
    else {
        let message = response.data.messages.length > 0 ? response.data.messages[0] : "something wrong";
        dispatch((0, redux_form_1.stopSubmit)("login", { _error: message }));
    }
});
exports.loginUser = loginUser;
const logoutUser = () => (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
    let response = yield api_1.AuthAPI.logoutMe();
    if (response.data.resultCode === 0) {
        dispatch((0, exports.setUserData)(null, null, null, false));
    }
});
exports.logoutUser = logoutUser;
exports.default = authReducer;
