/*
 * Copyright (c) 2024 anqisoft@gmail.com
 * index.ts
 *
 *
 * <zh_cn>
 * 创建：2024年1月12日 14:23:52
 * 功能：针对于命令行工具，提供显示版本号（--v、--version、-v、-version、/v、/version）或帮助（/help、/h、/?、-help、-h、-?、--help、--h、--?）信息，或真正执行操作的通用功能。
 * showHelpOrVersionOrCallback(help: string, version: string, parameterMinCount: number, callback: (args: string[]) => void) 显示帮助信息或版本号或回调，不显示所用时间
 * showHelpOrVersionOrCallbackAndShowUsedTime(help: string, version: string, parameterMinCount: number, callback: (args: string[]) => void, i18nFlag: I18nFlag = I18nFlag.all) 显示帮助信息或版本号或回调，显示所用时间（可通过参数控制回显耗时所使用的语言）
 * </zh_cn>
 *
 */

/*
 * <zh_cn>标记：国际化</zh_cn>
 */
export enum I18nFlag {
	/*
	 * <zh_cn>无</zh_cn>
	 */
	none,
	/*
	 * <zh_cn>仅显示美式英语</zh_cn>
	 */
	en_us = 1,
	/*
	 * <zh_cn>仅显示简体中文</zh_cn>
	 */
	zh_cn = 2,
	/*
	 * <zh_cn>英语与简体中文</zh_cn>
	 */
	en_us_and_zh_cn = 3,
	/*
	 * <zh_cn>仅显示繁体中文</zh_cn>
	 */
	zh_tw = 4,
	/*
	 * <zh_cn>英语与繁体中文</zh_cn>
	 */
	en_us_and_zh_tw = 5,
	/*
	 * <zh_cn>简繁体中文</zh_cn>
	 */
	zh_cn_and_zh_tw = 6,
	/*
	 * <zh_cn>全部</zh_cn>
	 */
	all = 7,
}

/**<zh_cn>核心代码</zh_cn>
 * @param help string <zh_cn>帮助</zh_cn>
 * @param version string <zh_cn>版本</zh_cn>
 * @param parameterMinCount number <zh_cn>最少参数数量</zh_cn>
 * @param callback (args: string[]) => void <zh_cn>回调方法</zh_cn>
 * @param usedTimeShowed boolean <zh_cn>是否显示耗用时间</zh_cn>
 * @param i18nFlag I18nFlag <zh_cn>国际化</zh_cn>
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
 * <zh_cn>根据参数显示帮助或版本号，或回调而不显示耗用时间</zh_cn>
 * @param help string <zh_cn>帮助</zh_cn>
 * @param version string <zh_cn>版本</zh_cn>
 * @param parameterMinCount number <zh_cn>最少参数数量</zh_cn>
 * @param callback (args: string[]) => void <zh_cn>回调方法</zh_cn>
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
 * <zh_cn>根据参数显示帮助或版本号，或回调并根据需要显示耗用时间</zh_cn>
 * @param help string <zh_cn>帮助</zh_cn>
 * @param version string <zh_cn>版本</zh_cn>
 * @param parameterMinCount number <zh_cn>最少参数数量</zh_cn>
 * @param callback (args: string[]) => void <zh_cn>回调方法</zh_cn>
 * @param i18nFlag I18nFlag <zh_cn>国际化</zh_cn>
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
