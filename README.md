# stylelint-processor-markdown

A [stylelint processor](http://stylelint.io/user-guide/configuration/#processors) for linting CSS code blocks in markdown.

Uses [remark](https://github.com/wooorm/remark) to parse the markdown.

<!--
Will not work until stylelint supports processor options

## Options

### syntax

Type: `String`, Default: `'css'`

This specificies which language of code block will be linted. The default is <code>```css</code>.

If you would like to lint another syntax supported by stylelint, change this option (e.g. to `'scss'`) and make sure you [tell stylelint about your non-standard syntax](http://stylelint.io/user-guide/css-processors/).

If you have one markdown file with code blocks of multiple syntaxes, just lint it a couple of times, once for each syntax. -->

## Caveats

- Only supports CSS at the moment (no non-standard syntax).
- It does not take kindly to code blocks that are indented. Start your code blocks at column 1, as is usually the case, and everything will be fine.
