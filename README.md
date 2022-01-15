jquery.textroll.js
==============================

![demo](demo.gif)

## DEMO and examples
jQuery plugin for adding some effect to text : [DEMO](http://marexandre.github.io/jquery.textroll/ "DEMO")


## Usage

### Simple
```javascript
    $(".someClass").textroll();
```
### With Options

```javascript

    $(".someClass").textroll({
        easing: 'easeInOutCirc',
        speed: 700,
        delay: 400
    });

```

## Options

### speed
- Type: Integer
- Default: 600

### delay
- Type: Integer
- Default: 1000

### isMotionUp
- Type: Boolean
- Default: true

### easing
- Type: String
- Default: linear
