import { basename, extname, isAbsolute, resolve } from './path';
import relative from './relative';

export function getAliasName(id: string): string {
	const base = basename(id);
	return base.substr(0, base.length - extname(id).length);
}

export default function relativeId(id: string): string {
	if (isAbsolute(id) || isURL(id)) {
		return relative(resolve(), id);
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