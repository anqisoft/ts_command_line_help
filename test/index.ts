import {
	showHelpOrVersionOrCallback,
	showHelpOrVersionOrCallbackAndShowUsedTime,
} from '../index.ts';

(async () => {
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

	async function normalLoop() {
		const NUMBERS = [];
		const TIMES = 2;
		const COUNT = 4;
		for (let i = 0; i < TIMES; ++i) {
			NUMBERS.push(i);
		}

		NUMBERS.forEach((n) => {
			console.log(n);
			for (let i = 0; i < COUNT; ++i) {
				for (let j = 0; j < COUNT; ++j) {
					console.log('loop', i, j, i * j);
				}
			}
		});
	}

	async function done() {
		const NUMBERS = [];
		const TIMES = 2;
		const COUNT = 5;
		for (let i = 0; i < TIMES; ++i) {
			NUMBERS.push(i);
		}

		for await (const n of NUMBERS) {
			console.log(n);
			for (let i = 0; i < COUNT; ++i) {
				for (let j = 0; j < COUNT; ++j) {
					console.log('for await', i, j, i * j);
				}
			}
		}
	}

	// showHelpOrVersionOrCallback('done', 'v0.0.1', 0, done);
	await showHelpOrVersionOrCallbackAndShowUsedTime('done', 'v0.0.1', 0, done);

	// showHelpOrVersionOrCallback('normalLoop', 'v0.0.1', 0, normalLoop);
	await showHelpOrVersionOrCallbackAndShowUsedTime('normalLoop', 'v0.0.1', 0, normalLoop);
})();

/*
    https://stackoverflow.com/questions/37576685/using-async-await-with-a-foreach-loop
  for await (const results of array) {
    await longRunningTask()
  }
  console.log('I will wait')
*/
