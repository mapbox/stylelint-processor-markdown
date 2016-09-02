'use strict';

const remark = require('remark');

function traverse(node, callbacks) {
  if (callbacks[node.type]) callbacks[node.type](node);

  if (node.children != null) {
    for (let i = 0, l = node.children.length; i < l; i++) {
      traverse(node.children[i], callbacks);
    }
  }
}

module.exports = function (source, options) {
  const syntaxSet = new Set(options.syntaxes.map((syntax) => syntax.toLowerCase()));
  const ast = remark().parse(source);
  const blocks = [];

  traverse(ast, {
    code(node) {
      if (node.lang && syntaxSet.has(node.lang.toLowerCase())) {
        blocks.push(node);
      }
    },
  });

  return blocks;
};
