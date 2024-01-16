/*
 * Copyright (c) 2024 anqisoft@gmail.com
 * index.ts
 *
 * <en_us>
  * Creation: January 12, 2024 14:23:52
  * Function: For command line tools, the display version number (--V,-Version, -V, -V,/Version) or help (/help,/h,/?,-help,-
 H,-?,-help,-h,-?), or the general function of the operation of operation.
  * </en_us>
 *
 * <zh_cn>
 * 创建：2024年1月12日 14:23:52
 * 功能：针对于命令行工具，提供显示版本号（--v、--version、-v、-version、/v、/version）或帮助（/help、/h、/?、-help、-h、-?、--help、--h、--?）信息，或真正执行操作的通用功能。
 * </zh_cn>
 *
 * <zh_tw>
 * 創建：2024年1月12日 14:23:52
 * 功能：針對於命令行工具，提供顯示版本號（--v、--version、-v、-version、/v、/version）或幫助（/help、/h、/?、-help、- h、-?、--help、--h、--?）信息，或真正執行操作的通用功能。
 * </zh_tw>
 */
import { COMMAND_LINE_ARGS, exitProcess, I18nFlag, } from 'https://raw.githubusercontent.com/anqisoft/ts_utils/main/index.ts';
import { isSyncFunc, } from 'https://raw.githubusercontent.com/anqisoft/ts_utils/main/index.ts';
/**
 * <en_us>Core code</en_us><zh_cn>核心代码</zh_cn><zh_tw>核心代碼</zh_tw>
 * @param help {string | I18nable} <en_us>Help information, can be provided by two formats, string or i18n objects</en_us><zh_cn>帮助信息，可以通过两种格式提供，字符串或i18n对象</zh_cn><zh_tw>幫助信息，可以通過兩種格式提供，字符串或i18n對象</zh_tw>
 * @param version {string} <en_us>version</en_us><zh_cn>版本</zh_cn><zh_tw>版本</zh_tw>
 * @param parameterMinCount {number} <en_us>minimum parameters</en_us><zh_cn>最少参数数量</zh_cn><zh_tw>最少參數數量</zh_tw>
 * @param callback {(args: string[]) => void} <en_us>callback method</en_us><zh_cn>回调方法</zh_cn><zh_tw>回調方法</zh_tw>
 * @param usedTimeShowed {boolean} <en_us>Does it show time?</en_us><zh_cn>是否显示耗用时间</zh_cn><zh_tw>是否顯示耗用時間</zh_tw>
 */
function done(help, version, parameterMinCount, callback, usedTimeShowed) {
    const args = COMMAND_LINE_ARGS; // .slice(2);
    const ARG_MAX_INDEX = args.length - 1;
    let needShowHelp = false;
    let helpLangArgIndex = -1;
    let versionArgIndex = -1;
    const HELP_FLAG_ARRAY = ['/help', '/h', '/?', '-help', '-h', '-?', '--help', '--h', '--?'];
    const VERSION_FLAG_ARRAY = ['--v', '--version', '-v', '-version', '/v', '/version'];
    args.forEach((arg, index) => {
        const ARG_LOWER_CASE = arg.toLowerCase();
        if (HELP_FLAG_ARRAY.indexOf(ARG_LOWER_CASE) > -1) {
            // showHelp(help, i18nFlag);
            // exitProcess();
            // /* falls through */
            needShowHelp = true;
            if (index < ARG_MAX_INDEX) {
                helpLangArgIndex = index + 1;
            }
        }
        else if (VERSION_FLAG_ARRAY.indexOf(ARG_LOWER_CASE) > -1) {
            // console.log(version);
            // exitProcess();
            // /* falls through */
            versionArgIndex = index;
        }
    });
    const VERSION_NEED_SHOWED = versionArgIndex > -1;
    if (VERSION_NEED_SHOWED && !needShowHelp) {
        console.log(version);
        exitProcess();
        /* falls through */
    }
    let i18nFlag = I18nFlag.all;
    switch (helpLangArgIndex === -1 ? '' : args[helpLangArgIndex].toLowerCase()) {
        case 'en':
        case 'en-us':
        case 'en_us':
            i18nFlag = I18nFlag.en_us;
            break;
        case 'cn':
        case 'zh-cn':
        case 'zh_cn':
            i18nFlag = I18nFlag.zh_cn;
            break;
        case 'tw':
        case 'zh-tw':
        case 'zh_tw':
            i18nFlag = I18nFlag.zh_tw;
            break;
        default:
            break;
    }
    const HAS_EN_US = (i18nFlag & I18nFlag.en_us) === I18nFlag.en_us;
    const HAS_ZH_CN = (i18nFlag & I18nFlag.zh_cn) === I18nFlag.zh_cn;
    const HAS_ZH_TW = (i18nFlag & I18nFlag.zh_tw) === I18nFlag.zh_tw;
    const I18N_MESSAGE = {
        en_us: '',
        zh_cn: '',
        zh_tw: '',
    };
    const LENGTH = args.length;
    const LENGTH_IS_LESS = LENGTH < parameterMinCount;
    if (needShowHelp || LENGTH_IS_LESS) {
        // if (VERSION_NEED_SHOWED) {
        I18N_MESSAGE.en_us += `version: ${version}\n`;
        I18N_MESSAGE.zh_cn += `版本：${version}\n`;
        I18N_MESSAGE.zh_tw += `版本：${version}\n`;
        // }
        const HELP_IS_STRING = typeof help === 'string';
        if (!HELP_IS_STRING) {
            I18N_MESSAGE.en_us += `help:\n ${help.en_us}\n`;
            I18N_MESSAGE.zh_cn += `帮助：\n${help.zh_cn}\n`;
            I18N_MESSAGE.zh_tw += `幫助：\n${help.zh_tw}\n`;
        }
        else {
            if (HAS_EN_US) {
                I18N_MESSAGE.en_us += `help:\n ${help}\n`;
            }
            else if (HAS_ZH_CN) {
                I18N_MESSAGE.zh_cn += `help:\n ${help}\n`;
            }
            else if (HAS_ZH_TW) {
                I18N_MESSAGE.zh_tw += `help:\n ${help}\n`;
            }
        }
        if (!LENGTH_IS_LESS) {
            I18N_MESSAGE.en_us +=
                `[Error]${parameterMinCount} parameters are required, but only ${LENGTH} are passed in.`;
            I18N_MESSAGE.zh_cn += `【错误】需${parameterMinCount}个参数，但仅传入了${LENGTH}个。`;
            I18N_MESSAGE.zh_tw += `【錯誤】需${parameterMinCount}個參數，但僅傳入了${LENGTH}個。`;
        }
        if (HAS_EN_US) {
            console.log(I18N_MESSAGE.en_us);
        }
        if (HAS_ZH_CN) {
            console.log(I18N_MESSAGE.zh_cn);
        }
        if (HAS_ZH_TW) {
            console.log(I18N_MESSAGE.zh_tw);
        }
        exitProcess();
        /* falls through */
    }
    const START_DATE = new Date();
    // callback(args);
    if (isSyncFunc(callback)) {
        callback(args);
    }
    else {
        (async () => {
            await callback.async(args);
        })();
    }
    if (!usedTimeShowed) {
        return;
    }
    const END_DATE = new Date();
    const USED_MILLISECONDS = END_DATE.getTime() - START_DATE.getTime();
    const USED_SECONDS = parseFloat((USED_MILLISECONDS / 1000).toFixed(4));
    if (HAS_EN_US) {
        console.log('Time consuming: ', USED_MILLISECONDS, 'milliseconds, that is', USED_SECONDS, 'seconds');
    }
    if (HAS_ZH_CN) {
        console.log('耗时：', USED_MILLISECONDS, '毫秒，即', USED_SECONDS, '秒');
    }
    if (HAS_ZH_TW) {
        console.log('耗時：', USED_MILLISECONDS, '毫秒，即', USED_SECONDS, '秒');
    }
}
/**
 * <en_us>display help or version number according to the parameters, or call back without displaying time</en_us>
 * <zh_cn>根据参数显示帮助或版本号，或回调而不显示耗用时间</zh_cn>
 * <zh_tw>根據參數顯示幫助或版本號，或回調而不顯示耗用時間</zh_tw>
 *
 * @param help {string | I18nable} <en_us>Help information, can be provided by two formats, string or i18n objects</en_us><zh_cn>帮助信息，可以通过两种格式提供，字符串或i18n对象</zh_cn><zh_tw>幫助信息，可以通過兩種格式提供，字符串或i18n對象</zh_tw>
 * @param version {string} <en_us>version</en_us><zh_cn>版本</zh_cn><zh_tw>版本</zh_tw>
 * @param parameterMinCount {number} <en_us>minimum parameters</en_us><zh_cn>最少参数数量</zh_cn><zh_tw>最少參數數量</zh_tw>
 * @param callback {(args: string[]) => void} <en_us>callback method</en_us><zh_cn>回调方法</zh_cn><zh_tw>回調方法</zh_tw>
 */
export function showHelpOrVersionOrCallback(help, version, parameterMinCount, callback) {
    done(help, version, parameterMinCount, callback, false);
}
/**
 * <en_us>display help or version number according to the parameter, or call back and display the time consumption time</en_us>
 * <zh_cn>根据参数显示帮助或版本号，或回调并根据需要显示耗用时间</zh_cn>
 * <zh_tw>根據參數顯示幫助或版本號，或回調並根據需要顯示耗用時間</zh_tw>
 *
 * @param help {string | I18nable} <en_us>Help information, can be provided by two formats, string or i18n objects</en_us><zh_cn>帮助信息，可以通过两种格式提供，字符串或i18n对象</zh_cn><zh_tw>幫助信息，可以通過兩種格式提供，字符串或i18n對象</zh_tw>
 * @param version {string} <en_us>version</en_us><zh_cn>版本</zh_cn><zh_tw>版本</zh_tw>
 * @param parameterMinCount {number} <en_us>minimum parameters</en_us><zh_cn>最少参数数量</zh_cn><zh_tw>最少參數數量</zh_tw>
 * @param callback {(args: string[]) => void} <en_us>callback method</en_us><zh_cn>回调方法</zh_cn><zh_tw>回調方法</zh_tw>
 */
export function showHelpOrVersionOrCallbackAndShowUsedTime(help, version, parameterMinCount, callback) {
    done(help, version, parameterMinCount, callback, true);
}
