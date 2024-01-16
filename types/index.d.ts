import { I18nable } from 'https://raw.githubusercontent.com/anqisoft/ts_utils/main/index.ts';
import { AsyncFunc, SyncFunc } from 'https://raw.githubusercontent.com/anqisoft/ts_utils/main/index.ts';
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
export declare function showHelpOrVersionOrCallback(help: string | I18nable, version: string, parameterMinCount: number, callback: SyncFunc | AsyncFunc): void;
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
export declare function showHelpOrVersionOrCallbackAndShowUsedTime(help: string | I18nable, version: string, parameterMinCount: number, callback: SyncFunc | AsyncFunc): void;
