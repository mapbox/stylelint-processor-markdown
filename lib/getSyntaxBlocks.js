'use strict';

const remark = require('remark');
const findAllAfter = require('unist-util-find-all-after');
const getNodeSource = require('unist-util-source');

module.exports = function (source, options) {
  const ast = remark().parse(source);
  const blocks = findAllAfter(ast, 0, (node) => {
    return node.lang && node.lang.toLowerCase() === options.syntax;
  });
  return blocks.map((block) => {
    block.raw = getNodeSource(block, source)
      .replace(/^```.*?\n/, '')
      .replace(/\r?\n[ \t]*```$/, '');
    return block;
  });
};
