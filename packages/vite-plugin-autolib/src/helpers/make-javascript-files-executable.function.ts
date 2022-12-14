import { globby } from 'globby';
import type { InternalModuleFormat } from 'rollup';
import { getBundledFileExtension } from './append-bundle-file-extension.function.js';
import type { Logger } from './create-logger.function.js';

import { turnIntoExecutable } from './turn-into-executable.function.js';

export interface MakeJavascriptFilesExecutableOptions {
	/**
	 * @default process.cwd()
	 */
	cwd?: string;

	format: InternalModuleFormat;
	packageJsonType: 'module' | 'commonjs';

	/**
	 * @default undefined
	 */
	logger?: Logger;

	/**
	 * @default false
	 */
	forceMjsExtensionForEs?: boolean;
}

export const makeJavascriptFilesExecutable = async (
	path: string | string[],
	options: MakeJavascriptFilesExecutableOptions
): Promise<void> => {
	const dirtectoryContent = await globby(path, { cwd: options?.cwd });
	const executables = dirtectoryContent.filter((bin) =>
		bin.endsWith(
			getBundledFileExtension({
				format: options.format,
				packageType: options.packageJsonType,
				forceMjsExtensionForEs: options.forceMjsExtensionForEs,
			})
		)
	);
	await Promise.all(executables.map((executable) => turnIntoExecutable(executable, options)));
};
