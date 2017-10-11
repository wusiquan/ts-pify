"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../src/index");
const chai_1 = require("chai");
const fixture = cb => setImmediate(() => cb(null, 'onion'));
describe('promisify', () => {
    it('promisify fixture', () => {
        index_1.default(fixture)().then((data) => {
            chai_1.expect(data).to.equal('onion');
        });
    });
});
