"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logMe2 = void 0;
const axios_1 = __importDefault(require("axios"));
const instance2 = axios_1.default.create({
    baseURL: "https://dummyjson.com/"
});
const logMe2 = (data) => {
    return (axios_1.default.post('https://dummyjson.com/auth/login', {
        username: data.login,
        password: data.password,
        expiresInMins: 30 // optional, defaults to 60
    })
        .then(response => {
        debugger;
        return response.data;
    }));
    // instance2.post("auth/login", {username: data.login, password: data.password}).then(response => {
    //     return response.data;
    // })
};
exports.logMe2 = logMe2;
