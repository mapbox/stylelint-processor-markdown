'use strict';

const path = require('path');
const getSyntaxBlocks = require('./lib/getSyntaxBlocks');
const splitLines = require('split-lines');
const reindent = require('./lib/reindent');

const ignoredRules = new Set([
  // We don't want to reject markdown files just because they
  // have no CSS
  'no-empty-source',
]);

const sourceToLineMap = new Map();

function transformer(options) {
  options = options || {};
  options.syntax = options.syntax || 'css';

  return function transformCode(code, filepath) {
    // Workaround for stylelint bug
    // https://github.com/stylelint/stylelint/issues/2195
    if (!path.isAbsolute(filepath)) filepath = path.join(process.cwd(), filepath);

    const extractedToSourceLineMap = new Map();
    let extractedCode = '';
    let currentExtractedCodeLine = 0;

    getSyntaxBlocks(code, options).forEach((block) => {
      let cssContent = block.raw;
      if (!cssContent) return;

      const reindentData = reindent(cssContent);
      cssContent = reindentData.text;
      const startLine = block.position.start.line + 1;

      const linesWithin = splitLines(cssContent).length;
      for (let i = 0; i < linesWithin; i++) {
        currentExtractedCodeLine += 1;
        extractedToSourceLineMap.set(currentExtractedCodeLine, {
          line: startLine + i,
          indentColumns: reindentData.indentColumns,
        });
      }

      currentExtractedCodeLine += 1;
      extractedCode += cssContent + '\n\n';
    });

    sourceToLineMap.set(filepath, extractedToSourceLineMap);
    return extractedCode;
  };
}

function transformResult(result, filepath) {
  const extractedToSourceLineMap = sourceToLineMap.get(filepath);
  const newWarnings = result.warnings.reduce((memo, warning) => {
    if (ignoredRules.has(warning.rule)) return memo;
    const warningSourceMap = extractedToSourceLineMap.get(warning.line);
    if (warning.line) {
      warning.line = warningSourceMap.line;
    }
    if (warning.column) {
      warning.column = warning.column + warningSourceMap.indentColumns;
    }
    memo.push(warning);
    return memo;
  }, []);
  return Object.assign(result, { warnings: newWarnings });
}

module.exports = function (options) {
  return {
    code: transformer(options),
    result: transformResult,
  };
};
