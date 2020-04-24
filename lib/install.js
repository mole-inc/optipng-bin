'use strict';
const fs = require('fs');
const path = require('path');
const binBuild = require('bin-build');
const log = require('logalot');
const which = require('which');
const binVersionCheck = require('bin-version-check');
const {promisify} = require('util');

const bin = require('.');

const install = async () => {
	try {
		await bin.run();
		log.success('optipng pre-build test passed successfully');
	} catch (error) {
		log.warn(error.message);
		log.warn('optipng pre-build test failed');
		log.info('compiling from source');

		try {
			// From https://sourceforge.net/projects/optipng/files/OptiPNG/
			await binBuild.file(path.resolve(__dirname, '../vendor/source/optipng.tar.gz'), [
				`./configure --with-system-zlib --prefix="${bin.dest()}" --bindir="${bin.dest()}"`,
				'make install'
			]);

			log.success('optipng built successfully');
		} catch (error) {
			log.error(error.stack);
			throw error;
		}
	}
};

(async () => {
	try {
		const use = process.platform === 'win32' ? 'optipng.exe' : 'optipng';
		const systemBin = await which(use).catch(error => {
			throw error;
		});
		const version = '>=0.7.7';
		await binVersionCheck(systemBin, version).catch(error => {
			log.warn(`The \`${systemBin}\` binary doesn't seem to work correctly or doesn't satisfy version \`${version}\``);
			throw error;
		});
		const target = path.join(__dirname, '../vendor', use);
		await promisify(fs.symlink)(systemBin, target).catch(error => {
			if (error.code === 'EEXIST') {
				return;
			}

			log.warn(error.message);
			throw error;
		});
		log.success(`create optipng symlink \`${target}\``);
	} catch {
		await install().catch(() => {
			// eslint-disable-next-line unicorn/no-process-exit
			process.exit(1);
		});
	}
})();
