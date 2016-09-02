# stylelint-processor-markdown

A [stylelint processor](http://stylelint.io/user-guide/configuration/#processors) for linting CSS code blocks in markdown.

Uses [remark](https://github.com/wooorm/remark) to parse the markdown.

## Caveats

- Only CSS blocks are linted. Theoretically, this processor could support the other syntaxes that stylelint supports. Wouldn't take too much work.
- Column positions will off for indented code blocks, by the amount of the block's indentation.
- Line numbers will off if code blocks start or end with empty lines.
