"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const profileReducer_1 = __importDefault(require("./profileReducer"));
const messagesReducer_1 = __importDefault(require("./messagesReducer"));
const navigtionReducer_1 = __importDefault(require("./navigtionReducer"));
const usersReducer_1 = __importDefault(require("./usersReducer"));
const authReducer_1 = __importDefault(require("./authReducer"));
const redux_thunk_1 = require("redux-thunk");
const redux_form_1 = require("redux-form");
const appReduser_1 = __importDefault(require("./appReduser"));
let reducers = (0, redux_1.combineReducers)({
    ProfilePage: profileReducer_1.default,
    MessagesPage: messagesReducer_1.default,
    Navigation: navigtionReducer_1.default,
    Users: usersReducer_1.default,
    Auth: authReducer_1.default,
    App: appReduser_1.default,
    form: redux_form_1.reducer
});
// для работы с redux-devtools
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({trace:true, traceLimit:25}) || compose;
// const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));
let store = (0, redux_1.legacy_createStore)(reducers, (0, redux_1.applyMiddleware)(redux_thunk_1.thunk));
window.Storage = store;
exports.default = store;
