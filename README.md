<!--

@license Apache-2.0

Copyright (c) 2018 The Stdlib Authors.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

-->

# incrmpcorrdist

[![NPM version][npm-image]][npm-url] [![Build Status][test-image]][test-url] [![Coverage Status][coverage-image]][coverage-url] <!-- [![dependencies][dependencies-image]][dependencies-url] -->

> Compute a moving [sample Pearson product-moment correlation distance][pearson-correlation] incrementally.

<section class="intro">

The [sample Pearson product-moment correlation distance][pearson-correlation] is defined as

<!-- <equation class="equation" label="eq:pearson_distance" align="center" raw="d_{x,y} = 1 - r_{x,y} = 1 - \frac{\operatorname{cov_n(x,y)}}{\sigma_x \sigma_y}" alt="Equation for the Pearson product-moment correlation distance."> -->

```math
d_{x,y} = 1 - r_{x,y} = 1 - \frac{\mathop{\mathrm{cov_n(x,y)}}}{\sigma_x \sigma_y}
```

<!-- <div class="equation" align="center" data-raw-text="d_{x,y} = 1 - r_{x,y} = 1 - \frac{\operatorname{cov_n(x,y)}}{\sigma_x \sigma_y}" data-equation="eq:pearson_distance">
    <img src="https://cdn.jsdelivr.net/gh/stdlib-js/stdlib@49d8cabda84033d55d7b8069f19ee3dd8b8d1496/lib/node_modules/@stdlib/stats/incr/mpcorrdist/docs/img/equation_pearson_distance.svg" alt="Equation for the Pearson product-moment correlation distance.">
    <br>
</div> -->

<!-- </equation> -->

where `r` is the [sample Pearson product-moment correlation coefficient][pearson-correlation], `cov(x,y)` is the sample covariance, and `σ` corresponds to the sample standard deviation. As `r` resides on the interval `[-1,1]`, `d` resides on the interval `[0,2]`.

</section>

<!-- /.intro -->



<section class="usage">

## Usage

To use in Observable,

```javascript
incrmpcorrdist = require( 'https://cdn.jsdelivr.net/gh/stdlib-js/stats-incr-mpcorrdist@umd/browser.js' )
```

To vendor stdlib functionality and avoid installing dependency trees for Node.js, you can use the UMD server build:

```javascript
var incrmpcorrdist = require( 'path/to/vendor/umd/stats-incr-mpcorrdist/index.js' )
```

To include the bundle in a webpage,

```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/stdlib-js/stats-incr-mpcorrdist@umd/browser.js"></script>
```

If no recognized module system is present, access bundle contents via the global scope:

```html
<script type="text/javascript">
(function () {
    window.incrmpcorrdist;
})();
</script>
```

#### incrmpcorrdist( window\[, mx, my] )

Returns an accumulator `function` which incrementally computes a moving [sample Pearson product-moment correlation distance][pearson-correlation]. The `window` parameter defines the number of values over which to compute the moving [sample Pearson product-moment correlation distance][pearson-correlation].

```javascript
var accumulator = incrmpcorrdist( 3 );
```

If means are already known, provide `mx` and `my` arguments.

```javascript
var accumulator = incrmpcorrdist( 3, 5.0, -3.14 );
```

#### accumulator( \[x, y] )

If provided input values `x` and `y`, the accumulator function returns an updated [sample Pearson product-moment correlation distance][pearson-correlation]. If not provided input values `x` and `y`, the accumulator function returns the current [sample Pearson product-moment correlation distance][pearson-correlation].

```javascript
var accumulator = incrmpcorrdist( 3 );

var r = accumulator();
// returns null

// Fill the window...
r = accumulator( 2.0, 1.0 ); // [(2.0, 1.0)]
// returns 1.0

r = accumulator( -5.0, 3.14 ); // [(2.0, 1.0), (-5.0, 3.14)]
// returns ~2.0

r = accumulator( 3.0, -1.0 ); // [(2.0, 1.0), (-5.0, 3.14), (3.0, -1.0)]
// returns ~1.925

// Window begins sliding...
r = accumulator( 5.0, -9.5 ); // [(-5.0, 3.14), (3.0, -1.0), (5.0, -9.5)]
// returns ~1.863

r = accumulator( -5.0, 1.5 ); // [(3.0, -1.0), (5.0, -9.5), (-5.0, 1.5)]
// returns ~1.803

r = accumulator();
// returns ~1.803
```

</section>

<!-- /.usage -->

<section class="notes">

## Notes

-   Input values are **not** type checked. If provided `NaN` or a value which, when used in computations, results in `NaN`, the accumulated value is `NaN` for **at least** `W-1` future invocations. If non-numeric inputs are possible, you are advised to type check and handle accordingly **before** passing the value to the accumulator function.
-   As `W` (x,y) pairs are needed to fill the window buffer, the first `W-1` returned values are calculated from smaller sample sizes. Until the window is full, each returned value is calculated from all provided values.
-   Due to limitations inherent in representing numeric values using floating-point format (i.e., the inability to represent numeric values with infinite precision), the [sample correlation distance][pearson-correlation] between perfectly correlated random variables may **not** be `0` or `2`. In fact, the [sample correlation distance][pearson-correlation] is **not** guaranteed to be strictly on the interval `[0,2]`. Any computed distance should, however, be within floating-point roundoff error.

</section>

<!-- /.notes -->

<section class="examples">

## Examples

<!-- eslint no-undef: "error" -->

```html
<!DOCTYPE html>
<html lang="en">
<body>
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/stdlib-js/random-base-randu@umd/browser.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/stdlib-js/stats-incr-mpcorrdist@umd/browser.js"></script>
<script type="text/javascript">
(function () {

var accumulator;
var x;
var y;
var i;

// Initialize an accumulator:
accumulator = incrmpcorrdist( 5 );

// For each simulated datum, update the moving sample correlation distance...
for ( i = 0; i < 100; i++ ) {
    x = randu() * 100.0;
    y = randu() * 100.0;
    accumulator( x, y );
}
console.log( accumulator() );

})();
</script>
</body>
</html>
```

</section>

<!-- /.examples -->

<!-- Section for related `stdlib` packages. Do not manually edit this section, as it is automatically populated. -->

<section class="related">

* * *

## See Also

-   <span class="package-name">[`@stdlib/stats-incr/mpcorr`][@stdlib/stats/incr/mpcorr]</span><span class="delimiter">: </span><span class="description">compute a moving sample Pearson product-moment correlation coefficient incrementally.</span>
-   <span class="package-name">[`@stdlib/stats-incr/pcorrdist`][@stdlib/stats/incr/pcorrdist]</span><span class="delimiter">: </span><span class="description">compute a sample Pearson product-moment correlation distance.</span>

</section>

<!-- /.related -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->


<section class="main-repo" >

* * *

## Notice

This package is part of [stdlib][stdlib], a standard library for JavaScript and Node.js, with an emphasis on numerical and scientific computing. The library provides a collection of robust, high performance libraries for mathematics, statistics, streams, utilities, and more.

For more information on the project, filing bug reports and feature requests, and guidance on how to develop [stdlib][stdlib], see the main project [repository][stdlib].

#### Community

[![Chat][chat-image]][chat-url]

---

## License

See [LICENSE][stdlib-license].


## Copyright

Copyright &copy; 2016-2023. The Stdlib [Authors][stdlib-authors].

</section>

<!-- /.stdlib -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="links">

[npm-image]: http://img.shields.io/npm/v/@stdlib/stats-incr-mpcorrdist.svg
[npm-url]: https://npmjs.org/package/@stdlib/stats-incr-mpcorrdist

[test-image]: https://github.com/stdlib-js/stats-incr-mpcorrdist/actions/workflows/test.yml/badge.svg?branch=main
[test-url]: https://github.com/stdlib-js/stats-incr-mpcorrdist/actions/workflows/test.yml?query=branch:main

[coverage-image]: https://img.shields.io/codecov/c/github/stdlib-js/stats-incr-mpcorrdist/main.svg
[coverage-url]: https://codecov.io/github/stdlib-js/stats-incr-mpcorrdist?branch=main

<!--

[dependencies-image]: https://img.shields.io/david/stdlib-js/stats-incr-mpcorrdist.svg
[dependencies-url]: https://david-dm.org/stdlib-js/stats-incr-mpcorrdist/main

-->

[chat-image]: https://img.shields.io/gitter/room/stdlib-js/stdlib.svg
[chat-url]: https://app.gitter.im/#/room/#stdlib-js_stdlib:gitter.im

[stdlib]: https://github.com/stdlib-js/stdlib

[stdlib-authors]: https://github.com/stdlib-js/stdlib/graphs/contributors

[umd]: https://github.com/umdjs/umd
[es-module]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules

[deno-url]: https://github.com/stdlib-js/stats-incr-mpcorrdist/tree/deno
[umd-url]: https://github.com/stdlib-js/stats-incr-mpcorrdist/tree/umd
[esm-url]: https://github.com/stdlib-js/stats-incr-mpcorrdist/tree/esm
[branches-url]: https://github.com/stdlib-js/stats-incr-mpcorrdist/blob/main/branches.md

[stdlib-license]: https://raw.githubusercontent.com/stdlib-js/stats-incr-mpcorrdist/main/LICENSE

[pearson-correlation]: https://en.wikipedia.org/wiki/Pearson_correlation_coefficient

<!-- <related-links> -->

[@stdlib/stats/incr/mpcorr]: https://github.com/stdlib-js/stats-incr-mpcorr/tree/umd

[@stdlib/stats/incr/pcorrdist]: https://github.com/stdlib-js/stats-incr-pcorrdist/tree/umd

<!-- </related-links> -->

</section>

<!-- /.links -->
