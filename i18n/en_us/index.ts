/*
 * Copyright (c) 2024 anqisoft@gmail.com
 * index.ts
 *
 * <en_us>
 * Created: January 12, 2024 14:23:52
 * Function: For command line tools, provide display version number (--v, --version, -v, -version, /v, /version) or help (/help, /h, /?, -help, - h, -?, --help, --h, --?) information, or a general function that actually performs the operation.
 * </en_us>
 *
 *
 */

/*
 * <en_us>Tag: internationalization</en_us>
 */
export enum I18nFlag {
	/*
	 * <en_us>None</en_us>
	 */
	none,
	/*
	 * <en_us>US English only</en_us>
	 */
	en_us = 1,
	/*
	 * <en_us>Show Simplified Chinese only</en_us>
	 */
	zh_cn = 2,
	/*
	 * <en_us>English and Simplified Chinese</en_us>
	 */
	en_us_and_zh_cn = 3,
	/*
	 * <en_us>Traditional Chinese only</en_us>
	 */
	zh_tw = 4,
	/*
	 * <en_us>English and Traditional Chinese</en_us>
	 */
	en_us_and_zh_tw = 5,
	/*
	 * <en_us>Simplified and Traditional Chinese</en_us>
	 */
	zh_cn_and_zh_tw = 6,
	/*
	 * <en_us>All</en_us>
	 */
	all = 7,
}

/**
 * <en_us>Core Code</en_us>
 * @param help string <en_us>Help</en_us>
 * @param version string <en_us>Version</en_us>
 * @param parameterMinCount number <en_us>Minimum number of parameters</en_us>
 * @param callback (args: string[]) => void <en_us>Callback methods</en_us>
 * @param usedTimeShowed boolean <en_us>Whether to display the elapsed time</en_us>
 * @param i18nFlag I18nFlag <en_us>Internationalization</en_us>
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
 * <en_us>Display help or version number based on parameters, or callback without displaying elapsed time</en_us>
 * @param help string <en_us>Help</en_us>
 * @param version string <en_us>Version</en_us>
 * @param parameterMinCount number <en_us>Minimum number of parameters</en_us>
 * @param callback (args: string[]) => void <en_us>Callback methods</en_us>
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
 * <en_us>Display help or version number based on parameters, or call back and display elapsed time if needed</en_us>
 * @param help string <en_us>Help</en_us>
 * @param version string <en_us>Version</en_us>
 * @param parameterMinCount number <en_us>Minimum number of parameters</en_us>
 * @param callback (args: string[]) => void <en_us>Callback methods</en_us>
 * @param i18nFlag I18nFlag <en_us>Internationalization</en_us>
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
