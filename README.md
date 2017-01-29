# stylelint-processor-markdown

[![Build Status](https://travis-ci.org/mapbox/stylelint-processor-markdown.svg?branch=master)](https://travis-ci.org/mapbox/stylelint-processor-markdown)

A [stylelint processor](http://stylelint.io/user-guide/configuration/#processors) for using stylelint on [GFM fenced code blocks](https://help.github.com/articles/creating-and-highlighting-code-blocks/) in Markdown.

Uses [remark](https://github.com/wooorm/remark) to parse the Markdown.

## Install

```
npm install @mapbox/stylelint-processor-markdown
```

## Options

### syntax

Type: `String`, Default: `'css'`

Specify the language for code blocks that will be sent through stylelint.

By default, this module looks for CSS blocks. If you would like to lint another syntax supported by stylelint, change this option to match the code blocks language (e.g. to `'scss'` for <code>```scss</code> blocks) and make sure you [tell stylelint about your non-standard syntax](http://stylelint.io/user-guide/css-processors/) when you run it.

If you have one Markdown file with code blocks of multiple syntaxes, you'll need to lint it multiple times, once for each syntax.
