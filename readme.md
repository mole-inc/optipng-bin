# optipng-bin ![Node CI](https://github.com/mole-inc/optipng-bin/workflows/Node%20CI/badge.svg)

> [OptiPNG](http://optipng.sourceforge.net) is a PNG optimizer that recompresses image files to a smaller size, without losing any information

You probably want [`imagemin-optipng`](https://github.com/mole-inc/imagemin-optipng) instead.

[![Downloads](https://badgen.net/npm/dm/@mole-inc/optipng-bin)](https://www.npmjs.com/package/@mole-inc/optipng-bin)
[![Version](https://badgen.net/npm/v/@mole-inc/optipng-bin)](https://www.npmjs.com/package/@mole-inc/optipng-bin)

## Install

```
$ npm install --save @mole-inc/optipng-bin
```


## Usage

```js
const {promisify} = require('util');
const {execFile} = require('child_process');
const optipng = require('@mole-inc/optipng-bin');

const execFileP = promsify(execFile);

(async () => {
	await execFile(optipng, ['-out', 'output.png', 'input.png']);
	console.log('Image minified!');
})();
```


## CLI

```
$ npm install --global @mole-inc/optipng-bin
```

```
$ optipng --help
```


## License

This is a fork of [imagemin/optipng-bin](https://github.com/imagemin/optipng-bin) licensed under the MIT License.

see license file.<br>
OptiPNG is licensed under the [zlib license](http://optipng.sourceforge.net/license.txt).
