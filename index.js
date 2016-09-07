'use strict';

const getSyntaxBlocks = require('./lib/getSyntaxBlocks');
const splitLines = require('split-lines');

const ignoredRules = new Set([
  // The Markdown parser strips trailing newlines in code fences
  'no-missing-end-of-source-newline',
]);

const sourceToLineMap = new Map();

function transformer(options) {
  options = options || {};
  options.syntax = options.syntax || 'css';
  options.separator = options.separator || '\n\n';

  return function transformCode(code, filepath) {
    const extractedToSourceLineMap = new Map();
    let extractedCode = '';
    let currentExtractedCodeLine = 0;

    getSyntaxBlocks(code, options).forEach((block) => {
      const cssContent = block.raw;
      if (!cssContent) return;

      const startLine = block.position.start.line + 1;

      const linesWithin = splitLines(cssContent).length;
      for (let i = 0; i < linesWithin; i++) {
        currentExtractedCodeLine += 1;
        extractedToSourceLineMap.set(currentExtractedCodeLine, startLine + i);
      }

      currentExtractedCodeLine += 1;
      extractedCode += cssContent + options.separator;
    });

    sourceToLineMap.set(filepath, extractedToSourceLineMap);
    return extractedCode;
  };
}

function transformResult(result, filepath) {
  const extractedToSourceLineMap = sourceToLineMap.get(filepath);
  const newWarnings = result.warnings.reduce((memo, warning) => {
    if (ignoredRules.has(warning.rule)) return memo;
    if (warning.line) {
      warning.line = extractedToSourceLineMap.get(warning.line);
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
