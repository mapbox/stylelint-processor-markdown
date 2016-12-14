'use strict';

const test = require('tap').test;
const stylelint = require('stylelint');
const _ = require('lodash');
const path = require('path');

const pathToProcessor = path.join(__dirname, '../index.js');
const rules = {
  'block-no-empty': true,
  indentation: 2,
  'no-missing-end-of-source-newline': 2,
};

const oneExpectations = [
  {
    line: 8,
    column: 6,
    rule: 'block-no-empty',
    severity: 'error',
    text: 'Unexpected empty block (block-no-empty)',
  },
  {
    line: 15,
    column: 7,
    rule: 'indentation',
    severity: 'error',
    text: 'Expected indentation of 0 spaces (indentation)',
  },
  {
    line: 15,
    column: 12,
    rule: 'block-no-empty',
    severity: 'error',
    text: 'Unexpected empty block (block-no-empty)',
  },
];

const twoExpectations = [
  {
    line: 10,
    column: 5,
    rule: 'indentation',
    severity: 'error',
    text: 'Expected indentation of 0 spaces (indentation)',
  },
  {
    line: 10,
    column: 10,
    rule: 'block-no-empty',
    severity: 'error',
    text: 'Unexpected empty block (block-no-empty)',
  },
  {
    line: 25,
    column: 6,
    rule: 'block-no-empty',
    severity: 'error',
    text: 'Unexpected empty block (block-no-empty)',
  },
];

test('file one', (t) => {
  const fixture = path.join(__dirname, './fixtures/one.md');
  return stylelint.lint({
    files: [fixture],
    config: {
      processors: [pathToProcessor],
      rules,
    },
  }).then((data) => {
    t.equal(data.results.length, 1, 'number of results');
    const result = data.results[0];
    t.equal(result.source, fixture, 'filename');
    t.deepEqual(_.orderBy(result.warnings, ['line', 'column']), oneExpectations);
    t.end();
  });
});

test('file two, relative to process.cwd', (t) => {
  const actualCwd = process.cwd();
  process.chdir(path.join(__dirname, 'fixtures'));
  const cleanup = () => process.chdir(actualCwd);

  const fixture = 'two.md';

  return stylelint.lint({
    files: [fixture],
    config: {
      processors: [pathToProcessor],
      rules,
    },
  }).then((data) => {
    t.equal(data.results.length, 1, 'number of results');
    const result = data.results[0];
    t.equal(result.source, path.join(process.cwd(), fixture), 'filename');

    t.deepEqual(_.orderBy(result.warnings, ['line', 'column']), twoExpectations);
    cleanup();
    t.end();
  }).catch((err) => {
    cleanup();
    throw err;
  });
});

test('files one and two', (t) => {
  const fixtureOne = path.join(__dirname, './fixtures/one.md');
  const fixtureTwo = path.join(__dirname, './fixtures/two.md');
  return stylelint.lint({
    files: [fixtureOne, fixtureTwo],
    config: {
      processors: [pathToProcessor],
      rules,
    },
  }).then((data) => {
    t.equal(data.results.length, 2, 'number of results');

    t.equal(data.results[0].source, fixtureOne);
    t.deepEqual(_.orderBy(data.results[0].warnings, ['line', 'column']), oneExpectations);

    t.equal(data.results[1].source, fixtureTwo);
    t.deepEqual(_.orderBy(data.results[1].warnings, ['line', 'column']), twoExpectations);

    t.end();
  });
});
