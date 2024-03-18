"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMessageActionCreator = void 0;
const add_message = "ADD-MESSAGE";
let defaultState = {
    messagesData: [
        { id: "1", message: "Hi i am a TIGER CAT" },
        { id: "2", message: "Hi i am a BROWN CAT" },
        { id: "3", message: "Hi i am a SMALL CAT" },
    ],
    dialogsData: [
        { id: "1", name: "TIGER CAT" },
        { id: "2", name: "BROWN CAT" },
        { id: "3", name: "SMALL CAT" },
    ]
};
const messagesReducer = (state = defaultState, action) => {
    let stateCopy = Object.assign({}, state);
    switch (action.type) {
        case add_message:
            let newMessage = {
                id: "0",
                message: action.text
            };
            stateCopy.messagesData = [...state.messagesData];
            stateCopy.messagesData.push(newMessage);
            return stateCopy;
        default:
            return stateCopy;
    }
};
const addMessageActionCreator = (text) => {
    return { type: add_message, text };
};
exports.addMessageActionCreator = addMessageActionCreator;
exports.default = messagesReducer;
