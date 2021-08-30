import { basename, extname, isAbsolute, relative, resolve, fileURLToPath } from './path';

export function getAliasName(id: string): string {
	const base = basename(id);
	return base.substr(0, base.length - extname(id).length);
}

export default function relativeId(id: string): string {
	if (isAbsolute(id) || isURL(id)) {
		const isFileURL = id.indexOf('file') == 0;
		return relative(resolve(), (isFileURL) ? fileURLToPath(id) : id);
	}
	return id;
}

export function isPathFragment(name: string): boolean {
	// starting with "/", "./", "../", "C:/"
	return (
		name[0] === '/' || (name[0] === '.' && (name[1] === '/' || name[1] === '.')) || isAbsolute(name)
	);
}

function isURL (specifier: string): boolean { 
	try { 
		new URL(specifier); 
		return true;
	} catch { 
		return false;
	} 
}