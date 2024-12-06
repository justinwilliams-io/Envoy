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
exports.default = (maxRunning) => {
    let queue = [];
    let dequeue = [];
    let running = 0;
    return (request) => {
        queue.push(() => __awaiter(void 0, void 0, void 0, function* () {
            running++;
            try {
                yield request();
            }
            finally {
                running--;
                if (queue.length > dequeue.length && running < maxRunning) {
                    dequeue.push(queue[dequeue.length]());
                }
                if (queue.length === dequeue.length) {
                    queue = [];
                    dequeue = [];
                }
            }
        }));
        if (queue.length <= maxRunning) {
            dequeue.push(queue[dequeue.length]());
        }
    };
};
