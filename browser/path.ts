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

export function relative(from: string, to: string): string {
	const fromParts = from.split(/[/\\]/).filter(Boolean);
	const toParts = to.split(/[/\\]/).filter(Boolean);

	if (fromParts[0] === '.') fromParts.shift();
	if (toParts[0] === '.') toParts.shift();

	while (fromParts[0] && toParts[0] && fromParts[0] === toParts[0]) {
		fromParts.shift();
		toParts.shift();
	}

	while (toParts[0] === '..' && fromParts.length > 0) {
		toParts.shift();
		fromParts.pop();
	}

	while (fromParts.pop()) {
		toParts.unshift('..');
	}

	return toParts.join('/');
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

export function fileURLToPath(fileURL: string): string {
	if (fileURL.indexOf('file:///') == 0) // win
		return fileURL.substr('file:///'.length);
	if (fileURL.indexOf('file://') == 0)
		return fileURL.substr('file://'.length);
	return fileURL;
}