"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let defaultState = {
    Friends: [
        { name: "Barsik", imgSrc: "https://cs6.livemaster.ru/storage/51/8d/e9304e78c01418b5ea956d3be36a.jpg" },
        { name: "Barsik", imgSrc: "https://cs6.livemaster.ru/storage/51/8d/e9304e78c01418b5ea956d3be36a.jpg" },
        { name: "Barsik", imgSrc: "https://cs6.livemaster.ru/storage/51/8d/e9304e78c01418b5ea956d3be36a.jpg" },
        { name: "Persik", imgSrc: "https://static.life.ru/publications/2023/9/11/812587366614.6013.jpg" },
        { name: "Persik", imgSrc: "https://static.life.ru/publications/2023/9/11/812587366614.6013.jpg" },
        { name: "Persik", imgSrc: "https://static.life.ru/publications/2023/9/11/812587366614.6013.jpg" }
    ]
};
const navigationReducer = (state = defaultState, action) => {
    return state;
};
exports.default = navigationReducer;
