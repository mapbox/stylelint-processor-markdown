'use strict';

const test = require('tap').test;
const stylelint = require('stylelint');
// const _ = require('lodash');
const path = require('path');

const pathToProcessor = path.join(__dirname, '../index.js');

test('scss', (t) => {
  const fixture = path.join(__dirname, './fixtures/scss.md');
  stylelint.lint({
    syntax: 'scss',
    files: [fixture],
    config: {
      processors: [pathToProcessor],
      rules: {
        'block-no-empty': true,
      },
    },
  }).then((data) => {
    t.equal(data.results.length, 1, 'number of results');
    const result = data.results[0];
    t.equal(result.source, fixture, 'filename');

    // This test does not work yet, not until
    // stylelint supports parser options
    //
    // console.log(_.orderBy(result.warnings, ['line', 'column']));
    t.end();
  }).catch(t.threw);
});
