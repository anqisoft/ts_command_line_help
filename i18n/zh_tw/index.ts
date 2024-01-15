/*
 * Copyright (c) 2024 anqisoft@gmail.com
 * index.ts
 *
 *
 *
 * <zh_tw>
 * 創建：2024年1月12日 14:23:52
 * 功能：針對於命令列工具，提供顯示版本號（--v、--version、-v、-version、/v、/version）或協助（/help、/h、/?、-help、- h、-?、--help、--h、--?）訊息，或真正執行操作的通用功能。
 * </zh_tw>
 */

/*
 * <zh_tw>標記：國際化</zh_tw>
 */
export enum I18nFlag {
	/*
	 * <zh_tw>無</zh_tw>
	 */
	none,
	/*
	 * <zh_tw>僅顯示美式英文</zh_tw>
	 */
	en_us = 1,
	/*
	 * <zh_tw>僅顯示簡體中文</zh_tw>
	 */
	zh_cn = 2,
	/*
	 * <zh_tw>英文與簡體中文</zh_tw>
	 */
	en_us_and_zh_cn = 3,
	/*
	 * <zh_tw>僅顯示繁體中文</zh_tw>
	 */
	zh_tw = 4,
	/*
	 * <zh_tw>英文與繁體中文</zh_tw>
	 */
	en_us_and_zh_tw = 5,
	/*
	 * <zh_tw>簡繁體中文</zh_tw>
	 */
	zh_cn_and_zh_tw = 6,
	/*
	 * <zh_tw>全部</zh_tw>
	 */
	all = 7,
}

/**<zh_tw>核心程式碼</zh_tw>
 * @param help string <zh_tw>幫助</zh_tw>
 * @param version string <zh_tw>版本</zh_tw>
 * @param parameterMinCount number <zh_tw>最少參數數量</zh_tw>
 * @param callback (args: string[]) => void <zh_tw>回呼方法</zh_tw>
 * @param usedTimeShowed boolean <zh_tw>是否顯示耗用時間</zh_tw>
 * @param i18nFlag I18nFlag <zh_tw>國際化</zh_tw>
 */
function core(
	help: string,
	version: string,
	parameterMinCount: number,
	callback: (args: string[]) => void,
	usedTimeShowed: boolean,
	i18nFlag: I18nFlag = I18nFlag.all,
) {
	const args = Deno.args.slice(2);
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
				console.log(help);
				Deno.exit();
				/* falls through */
			case '--v':
			case '--version':
			case '-v':
			case '-version':
			case '/v':
			case '/version':
				console.log(version);
				Deno.exit();
				/* falls through */
			default:
				break;
		}
	});

	const LENGTH = args.length;
	if (LENGTH < parameterMinCount) {
		console.log(help);

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
		Deno.exit();
		/* falls through */
	}

	if (!usedTimeShowed || i18nFlag === I18nFlag.none) {
		callback(args);
		return;
	}

	const START_DATE = new Date();
	callback(args);
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
 * <zh_tw>根據參數顯示幫助或版本號，或回呼而不顯示耗用時間</zh_tw>
 * @param help string <zh_tw>幫助</zh_tw>
 * @param version string <zh_tw>版本</zh_tw>
 * @param parameterMinCount number <zh_tw>最少參數數量</zh_tw>
 * @param callback (args: string[]) => void <zh_tw>回呼方法</zh_tw>
 */
export function showHelpOrVersionOrCallback(
	help: string,
	version: string,
	parameterMinCount: number,
	callback: (args: string[]) => void,
) {
	core(help, version, parameterMinCount, callback, false, I18nFlag.none);
}

/**
 * <zh_tw>根據參數顯示幫助或版本號，或回呼並根據需要顯示耗用時間</zh_tw>
 * @param help string <zh_tw>幫助</zh_tw>
 * @param version string <zh_tw>版本</zh_tw>
 * @param parameterMinCount number <zh_tw>最少參數數量</zh_tw>
 * @param callback (args: string[]) => void <zh_tw>回呼方法</zh_tw>
 * @param i18nFlag I18nFlag <zh_tw>國際化</zh_tw>
 */
export function showHelpOrVersionOrCallbackAndShowUsedTime(
	help: string,
	version: string,
	parameterMinCount: number,
	callback: (args: string[]) => void,
	i18nFlag: I18nFlag = I18nFlag.all,
) {
	core(help, version, parameterMinCount, callback, true, i18nFlag);
}
