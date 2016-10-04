# Slidr.js

Tiny pure vanilla JS library for basic slider/carousel functionality.

## Demo
[Here](https://rawgit.com/abdusco/slidr.js/master/demo/index.html)

## Features

+ Very small, < 2KB minified, < 1KB minified + gzipped.
+ Supports IE8+

## Usage

### HTML
```html
<!-- ... -->    
    <link rel="stylesheet" href="slidr.css">
</head>
<!-- ... -->
<div class="list">
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
</div>
<!-- ... -->
<script src="../src/slidr.compiled.js"></script>
</body>
```
> **protip**: add class `slidr__item--current` to any item to show it upon initiation.

### CSS

Include `slidr.css` in `<head>` or just add these

```css
.slidr {
    position: relative;
    overflow: hidden;
}

.slidr__item {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    visibility: hidden;
}

.slidr__item--current {
    visibility: visible;
    position: relative;
}
```

### JS
#### Setting up
```js
// syntax:
var options = {};
var list = document.querySelector('.list');

var ss = new Slidr(list);
```

#### Using it
```js
ss.next(); // shows next item
ss.prev(); // shows previous item
ss.show(0); // show first item
ss.destroy(); // destroys instance
ss.update(); // reinitiates slidr
```

## API

+ `Slidr.prototype.next()`, advance to next slide
+ `Slidr.prototype.prev()`, back to previous slide
+ `Slidr.prototype.show(index)`, show slide at specific index 
  > protip: `index` is 0 based
+ `Slidr.prototype.update()` use this to update the instance after adding items dynamically
+ `Slidr.prototype.destroy(index)` destroy instance and revert container to initial state
