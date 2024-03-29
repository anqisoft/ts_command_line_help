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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
exports.__esModule = true;
var index_ts_1 = require("../index.ts");
(function () { return __awaiter(void 0, void 0, void 0, function () {
    // showHelpOrVersionOrCallback('test', 'v0.0.1', 0,async () => {
    //    const NUMBERS = [];
    //    for(let i =0; i < 10; ++i) {
    //     NUMBERS.push(i);
    //    }
    //    for await (const n of NUMBERS)  {
    //     console.log(n);
    //         for(let i = 0; i < 1000; ++i) {
    //             for(let j = 0; j < 1000; ++j) {
    //                 console.log(i, j , i * j);
    //             }
    //         }
    //    }
    // });
    function normalLoop() {
        return __awaiter(this, void 0, void 0, function () {
            var NUMBERS, TIMES, COUNT, i;
            return __generator(this, function (_a) {
                NUMBERS = [];
                TIMES = 2;
                COUNT = 4;
                for (i = 0; i < TIMES; ++i) {
                    NUMBERS.push(i);
                }
                NUMBERS.forEach(function (n) {
                    console.log(n);
                    for (var i = 0; i < COUNT; ++i) {
                        for (var j = 0; j < COUNT; ++j) {
                            console.log('loop', i, j, i * j);
                        }
                    }
                });
                return [2 /*return*/];
            });
        });
    }
    function done() {
        var e_1, _a;
        return __awaiter(this, void 0, void 0, function () {
            var NUMBERS, TIMES, COUNT, i, NUMBERS_1, NUMBERS_1_1, n, i, j, e_1_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        NUMBERS = [];
                        TIMES = 2;
                        COUNT = 5;
                        for (i = 0; i < TIMES; ++i) {
                            NUMBERS.push(i);
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, 7, 12]);
                        NUMBERS_1 = __asyncValues(NUMBERS);
                        _b.label = 2;
                    case 2: return [4 /*yield*/, NUMBERS_1.next()];
                    case 3:
                        if (!(NUMBERS_1_1 = _b.sent(), !NUMBERS_1_1.done)) return [3 /*break*/, 5];
                        n = NUMBERS_1_1.value;
                        console.log(n);
                        for (i = 0; i < COUNT; ++i) {
                            for (j = 0; j < COUNT; ++j) {
                                console.log('for await', i, j, i * j);
                            }
                        }
                        _b.label = 4;
                    case 4: return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 12];
                    case 6:
                        e_1_1 = _b.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 12];
                    case 7:
                        _b.trys.push([7, , 10, 11]);
                        if (!(NUMBERS_1_1 && !NUMBERS_1_1.done && (_a = NUMBERS_1["return"]))) return [3 /*break*/, 9];
                        return [4 /*yield*/, _a.call(NUMBERS_1)];
                    case 8:
                        _b.sent();
                        _b.label = 9;
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 11: return [7 /*endfinally*/];
                    case 12: return [2 /*return*/];
                }
            });
        });
    }
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: 
            // showHelpOrVersionOrCallback('done', 'v0.0.1', 0, done);
            return [4 /*yield*/, index_ts_1.showHelpOrVersionOrCallbackAndShowUsedTime('done', 'v0.0.1', 0, done)];
            case 1:
                // showHelpOrVersionOrCallback('done', 'v0.0.1', 0, done);
                _a.sent();
                // showHelpOrVersionOrCallback('normalLoop', 'v0.0.1', 0, normalLoop);
                return [4 /*yield*/, index_ts_1.showHelpOrVersionOrCallbackAndShowUsedTime('normalLoop', 'v0.0.1', 0, normalLoop)];
            case 2:
                // showHelpOrVersionOrCallback('normalLoop', 'v0.0.1', 0, normalLoop);
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })();
/*
    https://stackoverflow.com/questions/37576685/using-async-await-with-a-foreach-loop
  for await (const results of array) {
    await longRunningTask()
  }
  console.log('I will wait')
*/ 
