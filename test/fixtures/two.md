---
title: Something Else Equally Special
---
```js
.foo {}
```

{% capture things %}
And some other text.
```css
.foo { color: pink; }
    .bar {}
```
{% endcapture %}

Does this work with jekyll tags?
{{things | markdownify}}

And the end.
