"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../src/index");
const chai_1 = require("chai");
const fixture = (cb) => setImmediate(() => cb(null, 'onion'));
const fixture1 = (x, cb) => setImmediate(() => cb(null, x));
const fixture2 = (x, y, cb) => setImmediate(() => cb(null, [x, y]));
describe('promisify', () => {
    it('promisify fixture', () => {
        index_1.default(fixture)().then((data) => {
            chai_1.expect(data).to.equal('onion');
        });
    });
    it('pass one arguments', () => __awaiter(this, void 0, void 0, function* () {
        chai_1.expect(yield index_1.default(fixture1)('tomato')).to.equal('tomato');
    }));
    it('pass two arguments', () => __awaiter(this, void 0, void 0, function* () {
        chai_1.expect(yield index_1.default(fixture2)('tomato', 'egg')).to.eql(['tomato', 'egg']);
    }));
});
