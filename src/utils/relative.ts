export default function relative(from: string, to: string): string {
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

	const separator = from.indexOf('/') != -1 ? '/' : '\\';
	return toParts.join(separator);
}
