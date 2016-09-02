'use strict';

const remark = require('remark');
const findAllAfter = require('unist-util-find-all-after');

module.exports = function (source, options) {
  const syntaxSet = new Set(options.syntaxes.map((syntax) => syntax.toLowerCase()));
  const ast = remark().parse(source);
  const blocks = findAllAfter(ast, 0, (node) => {
    return node.lang && syntaxSet.has(node.lang.toLowerCase());
  });
  return blocks;
};
