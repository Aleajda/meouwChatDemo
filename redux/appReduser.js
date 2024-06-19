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
exports.initializeApp = exports.initializedSuccess = void 0;
const authReducer_1 = require("./authReducer");
const SET_INITIALIZED = "SET_INITIALIZED";
let defaultState = {
    initialized: false
};
const appReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_INITIALIZED:
            return Object.assign(Object.assign({}, state), { initialized: true });
        default:
            return state;
    }
};
const initializedSuccess = () => ({ type: SET_INITIALIZED });
exports.initializedSuccess = initializedSuccess;
const initializeApp = () => (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
    let promise = dispatch((0, authReducer_1.setAuthUser)());
    yield Promise.all([promise]);
    dispatch((0, exports.initializedSuccess)());
});
exports.initializeApp = initializeApp;
exports.default = appReducer;
