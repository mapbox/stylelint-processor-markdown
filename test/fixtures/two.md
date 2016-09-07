---
title: Something Else Equally Special
---
{% capture things %}
And some other text.
```css


.foo { color: pink; }
    .bar {}

```
{% endcapture %}

Does this work with Jekyll tags and HTML?
<div>
  {{things | markdownify}}
</div>

```js
.foo {}
```

```css
.foo {}
```

And the end.
