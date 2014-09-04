# express-simulate-errors

[express.js](http://expressjs.com) middleware which simulates server errors. Use when testing error handling.

## Installing

With [npm](http://npmjs.org/):

```sh
$ npm install j-/express-simulate-errors
```

## Use

```js
var simulateErrors = require('express-simulate-errors');
// use as middleware for all subsequent handlers...
var smallChance = simulateErrors({ chance: 0.05 });
app.use(smallChance);
// ...or use as middleware for a specific route
var bigChance = simulateErrors();
var callback = function (req, res, next) { /* callback logic */ }
app.get('/errorprone', bigChance, callback);
```

If an error is being simulated, `next(err)` is called within the middleware. The error can be caught with an errorback function:

```js
app.use(function (req, res, next) {
    next(new Error('Server error'));
});
// errorback function
// only called when middleware passes an error object to `next()`
app.use(function (err, req, res, next) {
    res.send('An error occurred');
})
```

## Syntax

`simulateErrors(options)`

* `options` - Optional configuration
  * `options.chance` - Optional chance of an error occurring. Defined as a value between 0 (0% chance) and 1 (100% chance). Defaults to 1.

## License

[MIT license](LICENSE).