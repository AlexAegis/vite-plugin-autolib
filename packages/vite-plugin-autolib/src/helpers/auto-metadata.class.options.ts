export interface AutoMetadataOptions {
	/**
	 * A list of packageJson keys to read to autofill in built artifacts
	 *
	 * Keys already present in the package's packageJson file will merged if
	 * they are objects or arrays, otherwise overwritten
	 *
	 * @default '["license", "author", "homepage", "bugs", "keywords", "config", "engines"]'
	 */
	keysToRead?: string[];

	/**
	 * Keys that you must define yourself. This plugin can't figure them out
	 * for you, but it can add their keys in empty.
	 *
	 * @default '["name", "displayName", "description", "version"]'
	 */
	mandatoryKeys?: string[];

	/**
	 * Whether or not to read missing keys from the root workspace packageJson
	 *
	 * @default true
	 */
	readFromWorkspacePackageJson?: boolean;

	/**
	 * What to do with the source packageJson
	 * @default 'substract'
	 */
	workspaceKeyMode?: 'add' | 'subtract' | false;
}
