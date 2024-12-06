"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (params) => {
    let x = '?';
    Object.keys(params).forEach(key => {
        x = `${x}&key=${params[key]}`;
    });
    return x;
};
