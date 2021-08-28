var bundle = ((exports, input) => {
	'use strict';

	class Importer {
		constructor() {
			this.outputPath = input.outputPath;
		}

		getImport() {
			return import(this.outputPath);
		}
	}

	const promise = new Importer().getImport();

	exports.promise = promise;

	Object.defineProperty(exports, '__esModule', { value: true });

	return exports;

})({}, input);
