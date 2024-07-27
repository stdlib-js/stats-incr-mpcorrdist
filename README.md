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


<details>
  <summary>
    About stdlib...
  </summary>
  <p>We believe in a future in which the web is a preferred environment for numerical computation. To help realize this future, we've built stdlib. stdlib is a standard library, with an emphasis on numerical and scientific computation, written in JavaScript (and C) for execution in browsers and in Node.js.</p>
  <p>The library is fully decomposable, being architected in such a way that you can swap out and mix and match APIs and functionality to cater to your exact preferences and use cases.</p>
  <p>When you use stdlib, you can be absolutely certain that you are using the most thorough, rigorous, well-written, studied, documented, tested, measured, and high-quality code out there.</p>
  <p>To join us in bringing numerical computing to the web, get started by checking us out on <a href="https://github.com/stdlib-js/stdlib">GitHub</a>, and please consider <a href="https://opencollective.com/stdlib">financially supporting stdlib</a>. We greatly appreciate your continued support!</p>
</details>

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

```javascript
import incrmpcorrdist from 'https://cdn.jsdelivr.net/gh/stdlib-js/stats-incr-mpcorrdist@v0.2.2-deno/mod.js';
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

```javascript
import randu from 'https://cdn.jsdelivr.net/gh/stdlib-js/random-base-randu@deno/mod.js';
import incrmpcorrdist from 'https://cdn.jsdelivr.net/gh/stdlib-js/stats-incr-mpcorrdist@v0.2.2-deno/mod.js';

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

This package is part of [stdlib][stdlib], a standard library with an emphasis on numerical and scientific computing. The library provides a collection of robust, high performance libraries for mathematics, statistics, streams, utilities, and more.

For more information on the project, filing bug reports and feature requests, and guidance on how to develop [stdlib][stdlib], see the main project [repository][stdlib].

#### Community

[![Chat][chat-image]][chat-url]

---

## License

See [LICENSE][stdlib-license].


## Copyright

Copyright &copy; 2016-2024. The Stdlib [Authors][stdlib-authors].

</section>

<!-- /.stdlib -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="links">

[npm-image]: http://img.shields.io/npm/v/@stdlib/stats-incr-mpcorrdist.svg
[npm-url]: https://npmjs.org/package/@stdlib/stats-incr-mpcorrdist

[test-image]: https://github.com/stdlib-js/stats-incr-mpcorrdist/actions/workflows/test.yml/badge.svg?branch=v0.2.2
[test-url]: https://github.com/stdlib-js/stats-incr-mpcorrdist/actions/workflows/test.yml?query=branch:v0.2.2

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
[deno-readme]: https://github.com/stdlib-js/stats-incr-mpcorrdist/blob/deno/README.md
[umd-url]: https://github.com/stdlib-js/stats-incr-mpcorrdist/tree/umd
[umd-readme]: https://github.com/stdlib-js/stats-incr-mpcorrdist/blob/umd/README.md
[esm-url]: https://github.com/stdlib-js/stats-incr-mpcorrdist/tree/esm
[esm-readme]: https://github.com/stdlib-js/stats-incr-mpcorrdist/blob/esm/README.md
[branches-url]: https://github.com/stdlib-js/stats-incr-mpcorrdist/blob/main/branches.md

[stdlib-license]: https://raw.githubusercontent.com/stdlib-js/stats-incr-mpcorrdist/main/LICENSE

[pearson-correlation]: https://en.wikipedia.org/wiki/Pearson_correlation_coefficient

<!-- <related-links> -->

[@stdlib/stats/incr/mpcorr]: https://github.com/stdlib-js/stats-incr-mpcorr/tree/deno

[@stdlib/stats/incr/pcorrdist]: https://github.com/stdlib-js/stats-incr-pcorrdist/tree/deno

<!-- </related-links> -->

</section>

<!-- /.links -->
