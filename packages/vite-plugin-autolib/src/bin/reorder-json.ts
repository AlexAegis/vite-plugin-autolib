import { basename } from 'node:path';
import yargs, { Argv } from 'yargs';
import packageJson from '../../package.json';
import {
	AutoReorderOptions,
	DEFAULT_PACKAGE_JSON_SORTING_PREFERENCE,
} from '../helpers/auto-reorder.class.options.js';
import { createLogger } from '../helpers/create-logger.function.js';

import { sortJsonFile } from '../sort/sort-json-file.function.js';

const yarguments: Argv<AutoReorderOptions & { dry: boolean; check: boolean }> = yargs(
	process.argv.splice(2)
)
	.version(packageJson.version)
	.epilogue(`${packageJson.name}@${packageJson.version} see project at ${packageJson.homepage}`)
	.help()
	.completion()
	.option('check', {
		boolean: true,
		description:
			'Checks if every packageJson in a workspace conforms to the ordering, fails if not',
		default: false,
	})

	.option('dry', {
		boolean: true,
		description: "Don't actually modify anything, just print out what would be deleted",
		default: false,
	});

(async () => {
	const options = await yarguments.parseAsync();
	const logger = createLogger({ prefix: 'reorder' });

	const wasSorted = await Promise.all(
		options._.map((positional) => {
			const defaultSort =
				basename(positional.toString()) === 'package.json'
					? DEFAULT_PACKAGE_JSON_SORTING_PREFERENCE
					: [];

			return sortJsonFile(positional.toString(), {
				sortingPreference: options.sortingPreference ?? defaultSort,
				check: options.check,
				dry: options.dry,
				logger,
			});
		})
	);

	if (options.check && wasSorted.some((s) => !s)) {
		// eslint-disable-next-line unicorn/no-process-exit
		process.exit(1);
	}
})();
