"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (params) => {
    let x = '';
    Object.keys(params).forEach((key, i) => {
        x = `${x}${i === 0 ? '?' : '&'}${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`;
    });
    return x;
};
