# stylelint-processor-markdown

A [stylelint processor](http://stylelint.io/user-guide/configuration/#processors) for linting CSS code blocks in markdown.

Uses [remark](http://remark.js.org/) to parse the markdown.

## Caveats

Each of these is fixable with a little elbow grease.

- Only CSS blocks are linted. Theoretically, this could support the other syntaxes that stylelint supports.
- Will not return accurate column positions for indented code blocks.
