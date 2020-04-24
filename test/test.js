'use strict';
const path = require('path');
const test = require('ava');
const execa = require('execa');
const tempy = require('tempy');
const binCheck = require('bin-check');
const compareSize = require('compare-size');
const optipng = require('..');

/* Rebuild test
const fs = require('fs');
const binBuild = require('bin-build');
test('rebuild the optipng binaries', async t => {
	// Skip the test on Windows
	if (process.platform === 'win32') {
		t.pass();
		return;
	}

	const tmporary = tempy.directory();

	await binBuild.file(path.resolve(__dirname, '../vendor/source/optipng.tar.gz'), [
		`./configure --with-system-zlib --prefix="${tmporary}" --bindir="${tmporary}"`,
		'make install'
	]);

	t.true(fs.existsSync(path.join(tmporary, 'optipng')));
});
*/

test('return path to binary and verify that it is working', async t => {
	t.true(await binCheck(optipng, ['--version']));
});

test('minify a PNG', async t => {
	const tmporary = tempy.directory();
	const sourcePath = path.join(__dirname, 'fixtures/test.png');
	const destinationPath = path.join(tmporary, 'test.png');
	const arguments_ = [
		'-strip',
		'all',
		'-clobber',
		'-out',
		destinationPath,
		sourcePath
	];

	await execa(optipng, arguments_);
	const result = await compareSize(sourcePath, destinationPath);

	t.true(result[destinationPath] < result[sourcePath]);
});
