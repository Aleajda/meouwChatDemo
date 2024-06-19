"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Preloader_module_css_1 = __importDefault(require("./Preloader.module.css"));
const Preloader = () => {
    return (react_1.default.createElement("img", { className: Preloader_module_css_1.default.preloader, src: "https://i.gifer.com/ZKZg.gif" }));
};
exports.default = Preloader;
