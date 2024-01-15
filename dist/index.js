"use strict";
/*
 * Copyright (c) 2024 anqisoft@gmail.com
 * index.ts
 *
 * <en_us>
 * Created: January 12, 2024 14:23:52
 * Function: For command line tools, provide display version number (--v, --version, -v, -version, /v, /version) or help (/help, /h, /?, -help, - h, -?, --help, --h, --?) information, or a general function that actually performs the operation.
 * </en_us>
 *
 * <zh_cn>
 * 创建：2024年1月12日 14:23:52
 * 功能：针对于命令行工具，提供显示版本号（--v、--version、-v、-version、/v、/version）或帮助（/help、/h、/?、-help、-h、-?、--help、--h、--?）信息，或真正执行操作的通用功能。
 * showHelpOrVersionOrCallback(help: string, version: string, parameterMinCount: number, callback: (args: string[]) => void) 显示帮助信息或版本号或回调，不显示所用时间
 * showHelpOrVersionOrCallbackAndShowUsedTime(help: string, version: string, parameterMinCount: number, callback: (args: string[]) => void, i18nFlag: I18nFlag = I18nFlag.all) 显示帮助信息或版本号或回调，显示所用时间（可通过参数控制回显耗时所使用的语言）
 * </zh_cn>
 *
 * <zh_tw>
 * 創建：2024年1月12日 14:23:52
 * 功能：針對於命令列工具，提供顯示版本號（--v、--version、-v、-version、/v、/version）或協助（/help、/h、/?、-help、- h、-?、--help、--h、--?）訊息，或真正執行操作的通用功能。
 * </zh_tw>
 */
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
exports.__esModule = true;
exports.showHelpOrVersionOrCallbackAndShowUsedTime = exports.showHelpOrVersionOrCallback = void 0;
var index_ts_1 = require("https://raw.githubusercontent.com/anqisoft/ts_utils/main/index.ts");
// /*
//  * <en_us>en_us</en_us>
//  * <zh_cn>zh_cn</zh_cn>
//  * <zh_tw>zh_tw</zh_tw>
// */
/**
 * <en_us>en_us</en_us>
 * <zh_cn>显示帮助</zh_cn>
 * <zh_tw>zh_tw</zh_tw>
 * @param help <en_us>Version</en_us><zh_cn>帮助信息，可以通过两种格式提供，字符串或i18n对象</zh_cn><zh_tw>版本</zh_tw>
 * @param i18nFlag I18nFlag <en_us>Internationalization</en_us><zh_cn>国际化</zh_cn><zh_tw>國際化</zh_tw>
 */
function showHelp(help, i18nFlag) {
    if (i18nFlag === void 0) { i18nFlag = index_ts_1.I18nFlag.all; }
    if (typeof help === 'string') {
        console.log(help);
        return;
    }
    if (i18nFlag === index_ts_1.I18nFlag.none || (i18nFlag & index_ts_1.I18nFlag.en_us) === index_ts_1.I18nFlag.en_us) {
        console.log(help.en_us, '\n');
    }
    if ((i18nFlag & index_ts_1.I18nFlag.zh_cn) === index_ts_1.I18nFlag.zh_cn) {
        console.log(help.zh_cn, '\n');
    }
    if ((i18nFlag & index_ts_1.I18nFlag.zh_tw) === index_ts_1.I18nFlag.zh_tw) {
        console.log(help.zh_tw, '\n');
    }
}
function isSyncFunc(func) {
    return func instanceof Function && !(func instanceof Promise);
}
function isAsyncFunc(func) {
    return (func instanceof Promise);
}
/**
 * <en_us>Core Code</en_us><zh_cn>核心代码</zh_cn><zh_tw>核心程式碼</zh_tw>
 * @param help string | I18nable <en_us>Help</en_us><zh_cn>帮助信息，可以通过两种格式提供，字符串或i18n对象</zh_cn><zh_tw>幫助</zh_tw>
 * @param version string <en_us>Version</en_us><zh_cn>版本</zh_cn><zh_tw>版本</zh_tw>
 * @param parameterMinCount number <en_us>Minimum number of parameters</en_us><zh_cn>最少参数数量</zh_cn><zh_tw>最少參數數量</zh_tw>
 * @param callback SyncFunc | AsyncFunc <en_us>Callback methods</en_us><zh_cn>回调方法</zh_cn><zh_tw>回呼方法</zh_tw>
 * @param usedTimeShowed boolean <en_us>Whether to display the elapsed time</en_us><zh_cn>是否显示耗用时间</zh_cn><zh_tw>是否顯示耗用時間</zh_tw>
 * @param i18nFlag I18nFlag <en_us>Internationalization</en_us><zh_cn>国际化</zh_cn><zh_tw>國際化</zh_tw>
 */
function done(help, version, parameterMinCount, callback, usedTimeShowed, i18nFlag) {
    var _this = this;
    if (i18nFlag === void 0) { i18nFlag = index_ts_1.I18nFlag.all; }
    var args = index_ts_1.commandLineArgs; // .slice(2);
    args.forEach(function (arg) {
        switch (arg.toLowerCase()) {
            case '/help':
            case '/h':
            case '/?':
            case '-help':
            case '-h':
            case '-?':
            case '--help':
            case '--h':
            case '--?':
                showHelp(help, i18nFlag);
                index_ts_1.exitProcess();
            /* falls through */
            case '--v':
            case '--version':
            case '-v':
            case '-version':
            case '/v':
            case '/version':
                console.log(version);
                index_ts_1.exitProcess();
            /* falls through */
            default:
                break;
        }
    });
    var LENGTH = args.length;
    if (LENGTH < parameterMinCount) {
        showHelp(help, i18nFlag);
        if (i18nFlag === index_ts_1.I18nFlag.none || (i18nFlag & index_ts_1.I18nFlag.en_us) === index_ts_1.I18nFlag.en_us) {
            console.log(parameterMinCount + " parameters are required, but only " + LENGTH + " are passed in.");
        }
        if ((i18nFlag & index_ts_1.I18nFlag.zh_cn) === index_ts_1.I18nFlag.zh_cn) {
            console.log("\u9700" + parameterMinCount + "\u4E2A\u53C2\u6570\uFF0C\u4F46\u4EC5\u4F20\u5165\u4E86" + LENGTH + "\u4E2A\u3002");
        }
        if ((i18nFlag & index_ts_1.I18nFlag.zh_tw) === index_ts_1.I18nFlag.zh_tw) {
            console.log("\u9700" + parameterMinCount + "\u500B\u53C3\u6578\uFF0C\u4F46\u50C5\u50B3\u5165\u4E86" + LENGTH + "\u500B\u3002");
        }
        index_ts_1.exitProcess();
        /* falls through */
    }
    var START_DATE = new Date();
    // callback(args);
    if (isSyncFunc(callback)) {
        callback(args);
    }
    else {
        (function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, callback.async(args)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); })();
    }
    if (!usedTimeShowed || i18nFlag === index_ts_1.I18nFlag.none) {
        return;
    }
    var END_DATE = new Date();
    var USED_MILLISECONDS = END_DATE.getTime() - START_DATE.getTime();
    var USED_SECONDS = parseFloat((USED_MILLISECONDS / 1000).toFixed(4));
    if ((i18nFlag & index_ts_1.I18nFlag.en_us) === index_ts_1.I18nFlag.en_us) {
        console.log('Time consuming: ', USED_MILLISECONDS, 'milliseconds, that is', USED_SECONDS, 'seconds');
    }
    if ((i18nFlag & index_ts_1.I18nFlag.zh_cn) === index_ts_1.I18nFlag.zh_cn) {
        console.log('耗时：', USED_MILLISECONDS, '毫秒，即', USED_SECONDS, '秒');
    }
    if ((i18nFlag & index_ts_1.I18nFlag.zh_tw) === index_ts_1.I18nFlag.zh_tw) {
        console.log('耗時：', USED_MILLISECONDS, '毫秒，即', USED_SECONDS, '秒');
    }
}
/**
 * <en_us>Display help or version number based on parameters, or callback without displaying elapsed time</en_us>
 * <zh_cn>根据参数显示帮助或版本号，或回调而不显示耗用时间</zh_cn>
 * <zh_tw>根據參數顯示幫助或版本號，或回呼而不顯示耗用時間</zh_tw>
 *
 * @param help string | I18nable <en_us>Help</en_us><zh_cn>帮助信息，可以通过两种格式提供，字符串或i18n对象</zh_cn><zh_tw>幫助</zh_tw>
 * @param version string <en_us>Version</en_us><zh_cn>版本</zh_cn><zh_tw>版本</zh_tw>
 * @param parameterMinCount number <en_us>Minimum number of parameters</en_us><zh_cn>最少参数数量</zh_cn><zh_tw>最少參數數量</zh_tw>
 * @param callback (args: string[]) => void <en_us>Callback methods</en_us><zh_cn>回调方法</zh_cn><zh_tw>回呼方法</zh_tw>
 */
function showHelpOrVersionOrCallback(help, version, parameterMinCount, 
// callback: (args: string[]) => void,
callback) {
    done(help, version, parameterMinCount, callback, false, index_ts_1.I18nFlag.none);
}
exports.showHelpOrVersionOrCallback = showHelpOrVersionOrCallback;
/**
 * <en_us>Display help or version number based on parameters, or call back and display elapsed time if needed</en_us>
 * <zh_cn>根据参数显示帮助或版本号，或回调并根据需要显示耗用时间</zh_cn>
 * <zh_tw>根據參數顯示幫助或版本號，或回呼並根據需要顯示耗用時間</zh_tw>
 *
 * @param help string | I18nable <en_us>Help</en_us><zh_cn>帮助信息，可以通过两种格式提供，字符串或i18n对象</zh_cn><zh_tw>幫助</zh_tw>
 * @param version string <en_us>Version</en_us><zh_cn>版本</zh_cn><zh_tw>版本</zh_tw>
 * @param parameterMinCount number <en_us>Minimum number of parameters</en_us><zh_cn>最少参数数量</zh_cn><zh_tw>最少參數數量</zh_tw>
 * @param callback (args: string[]) => void <en_us>Callback methods</en_us><zh_cn>回调方法</zh_cn><zh_tw>回呼方法</zh_tw>
 * @param i18nFlag I18nFlag <en_us>Internationalization</en_us><zh_cn>国际化</zh_cn><zh_tw>國際化</zh_tw>
 */
function showHelpOrVersionOrCallbackAndShowUsedTime(help, version, parameterMinCount, 
// callback: (args: string[]) => void,
callback, i18nFlag) {
    if (i18nFlag === void 0) { i18nFlag = index_ts_1.I18nFlag.all; }
    console.log('call showHelpOrVersionOrCallbackAndShowUsedTime');
    done(help, version, parameterMinCount, callback, true, i18nFlag);
}
exports.showHelpOrVersionOrCallbackAndShowUsedTime = showHelpOrVersionOrCallbackAndShowUsedTime;
