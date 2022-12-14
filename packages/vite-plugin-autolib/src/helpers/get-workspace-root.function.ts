import { collectDirectoriesWithFileUntilRoot } from './collect-directories-with-file-until-root.function.js';

/**
 *
 * @param cwd process.cwd()
 * @returns
 */
export const getWorkspaceRoot = (cwd: string = process.cwd()): string | undefined => {
	return collectDirectoriesWithFileUntilRoot(cwd, 'package.json')[0];
};
