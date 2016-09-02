# stylelint-processor-markdown

A [stylelint processor](http://stylelint.io/user-guide/configuration/#processors) for linting CSS code blocks in markdown.

Uses [remark](https://github.com/wooorm/remark) to parse the markdown.

## Caveats

Each of these is fixable with a little elbow grease.

- Only CSS blocks are linted. Theoretically, this could support the other syntaxes that stylelint supports.
- Column positions will be consistently off for indented code blocks, by the amount of the block's indentation.
- Line numbers will be consistently off if code blocks start or end with empty lines.
