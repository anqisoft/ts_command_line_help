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

import {
	commandLineArgs,
	exitProcess,
	I18nable,
	I18nFlag,
} from 'https://raw.githubusercontent.com/anqisoft/ts_utils/main/index.ts';

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
function showHelp(help: string | I18nable, i18nFlag: I18nFlag = I18nFlag.all) {
	if (typeof help === 'string') {
		console.log(help);
		return;
	}

	if (i18nFlag === I18nFlag.none || (i18nFlag & I18nFlag.en_us) === I18nFlag.en_us) {
		console.log(help.en_us, '\n');
	}
	if ((i18nFlag & I18nFlag.zh_cn) === I18nFlag.zh_cn) {
		console.log(help.zh_cn, '\n');
	}
	if ((i18nFlag & I18nFlag.zh_tw) === I18nFlag.zh_tw) {
		console.log(help.zh_tw, '\n');
	}
}

export interface SyncFunc {
	(args: string[]): void;
}
export interface AsyncFunc {
	async(args: string[]): void;
}

function isSyncFunc(func: unknown): func is SyncFunc {
	return func instanceof Function && !(func instanceof Promise);
}

function isAsyncFunc(func: unknown): func is AsyncFunc {
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
function done(
	help: string | I18nable,
	version: string,
	parameterMinCount: number,
	callback: SyncFunc | AsyncFunc,
	usedTimeShowed: boolean,
	i18nFlag: I18nFlag = I18nFlag.all,
) {
	const args: string[] = commandLineArgs.slice(2);
	args.forEach((arg) => {
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
				exitProcess();
				/* falls through */
			case '--v':
			case '--version':
			case '-v':
			case '-version':
			case '/v':
			case '/version':
				console.log(version);
				exitProcess();
				/* falls through */
			default:
				break;
		}
	});

	const LENGTH = args.length;
	if (LENGTH < parameterMinCount) {
		showHelp(help, i18nFlag);

		if (i18nFlag === I18nFlag.none || (i18nFlag & I18nFlag.en_us) === I18nFlag.en_us) {
			console.log(
				`${parameterMinCount} parameters are required, but only ${LENGTH} are passed in.`,
			);
		}
		if ((i18nFlag & I18nFlag.zh_cn) === I18nFlag.zh_cn) {
			console.log(`需${parameterMinCount}个参数，但仅传入了${LENGTH}个。`);
		}
		if ((i18nFlag & I18nFlag.zh_tw) === I18nFlag.zh_tw) {
			console.log(`需${parameterMinCount}個參數，但僅傳入了${LENGTH}個。`);
		}
		exitProcess();
		/* falls through */
	}

	const START_DATE = new Date();
	// callback(args);
	if (isSyncFunc(callback)) {
		callback(args);
	} else {
		(async () => {
			await callback.async(args);
		})();
	}

	if (!usedTimeShowed || i18nFlag === I18nFlag.none) {
		return;
	}
	const END_DATE = new Date();
	const USED_MILLISECONDS = END_DATE.getTime() - START_DATE.getTime();
	const USED_SECONDS = parseFloat((USED_MILLISECONDS / 1000).toFixed(4));
	if ((i18nFlag & I18nFlag.en_us) === I18nFlag.en_us) {
		console.log(
			'Time consuming: ',
			USED_MILLISECONDS,
			'milliseconds, that is',
			USED_SECONDS,
			'seconds',
		);
	}
	if ((i18nFlag & I18nFlag.zh_cn) === I18nFlag.zh_cn) {
		console.log(
			'耗时：',
			USED_MILLISECONDS,
			'毫秒，即',
			USED_SECONDS,
			'秒',
		);
	}
	if ((i18nFlag & I18nFlag.zh_tw) === I18nFlag.zh_tw) {
		console.log(
			'耗時：',
			USED_MILLISECONDS,
			'毫秒，即',
			USED_SECONDS,
			'秒',
		);
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
export function showHelpOrVersionOrCallback(
	help: string | I18nable,
	version: string,
	parameterMinCount: number,
	// callback: (args: string[]) => void,
	callback: SyncFunc | AsyncFunc,
) {
	done(help, version, parameterMinCount, callback, false, I18nFlag.none);
}

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
export function showHelpOrVersionOrCallbackAndShowUsedTime(
	help: string | I18nable,
	version: string,
	parameterMinCount: number,
	// callback: (args: string[]) => void,
	callback: SyncFunc | AsyncFunc,
	i18nFlag: I18nFlag = I18nFlag.all,
) {
	console.log('call showHelpOrVersionOrCallbackAndShowUsedTime');
	done(help, version, parameterMinCount, callback, true, i18nFlag);
}
