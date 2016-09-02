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

Does this work with Jekyll tags and HTML?
<div>
  {{things | markdownify}}
</div>

And the end.
