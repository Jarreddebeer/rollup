export const absolutePath = /^(?:\/|(?:[A-Za-z]:)?[\\|/])/;
export const relativePath = /^\.?\.\//;

export function isAbsolute(path: string): boolean {
	return absolutePath.test(path);
}

export function isRelative(path: string): boolean {
	return relativePath.test(path);
}

export function normalize(path: string): string {
	return path.replace(/\\/g, '/');
}

export function basename(path: string): string {
	return path.split(/[/\\]/).pop() || '';
}

export function dirname(path: string): string {
	const match = /[/\\][^/\\]*$/.exec(path);
	if (!match) return '.';

	const dir = path.slice(0, -match[0].length);

	// If `dir` is the empty string, we're at root.
	return dir ? dir : '/';
}

export function extname(path: string): string {
	const match = /\.[^.]+$/.exec(basename(path)!);
	if (!match) return '';
	return match[0];
}

export function resolve(...paths: string[]): string {
	const firstPathSegment = paths.shift();
	if (!firstPathSegment) {
		return '/';
	}
	let resolvedParts = firstPathSegment.split(/[/\\]/);

	for (const path of paths) {
		if (isAbsolute(path)) {
			resolvedParts = path.split(/[/\\]/);
		} else {
			const parts = path.split(/[/\\]/);

			while (parts[0] === '.' || parts[0] === '..') {
				const part = parts.shift();
				if (part === '..') {
					resolvedParts.pop();
				}
			}

			resolvedParts.push(...parts);
		}
	}

	return resolvedParts.join('/');
}
