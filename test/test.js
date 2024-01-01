/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var tape = require( 'tape' );
var randu = require( '@stdlib/random-base-randu' );
var abs = require( '@stdlib/math-base-special-abs' );
var pow = require( '@stdlib/math-base-special-pow' );
var sqrt = require( '@stdlib/math-base-special-sqrt' );
var isnan = require( '@stdlib/math-base-assert-is-nan' );
var EPS = require( '@stdlib/constants-float64-eps' );
var incrmpcorrdist = require( './../lib' );


// FUNCTIONS //

/**
* Computes sample means using Welford's algorithm.
*
* @private
* @param {Array} out - output array
* @param {ArrayArray} arr - input array
* @returns {Array} output array
*/
function mean( out, arr ) {
	var delta;
	var mx;
	var my;
	var N;
	var i;

	mx = 0.0;
	my = 0.0;

	N = 0;
	for ( i = 0; i < arr.length; i++ ) {
		N += 1;
		delta = arr[i][0] - mx;
		mx += delta / N;
		delta = arr[i][1] - my;
		my += delta / N;
	}
	out[ 0 ] = mx;
	out[ 1 ] = my;
	return out;
}

/**
* Computes standard deviations.
*
* @private
* @param {Array} out - output array
* @param {ArrayArray} arr - input array
* @param {number} mx - `x` mean
* @param {number} my - `y` mean
* @param {boolean} bool - boolean indicating whether to compute a biased standard deviation
* @returns {Array} output array
*/
function stdev( out, arr, mx, my, bool ) {
	var delta;
	var M2x;
	var M2y;
	var N;
	var i;

	M2x = 0.0;
	M2y = 0.0;

	N = 0;
	for ( i = 0; i < arr.length; i++ ) {
		N += 1;
		delta = arr[i][0] - mx;
		M2x += delta * delta;
		delta = arr[i][1] - my;
		M2y += delta * delta;
	}
	if ( bool ) {
		out[ 0 ] = sqrt( M2x / N );
		out[ 1 ] = sqrt( M2y / N );
		return out;
	}
	if ( N < 2 ) {
		out[ 0 ] = 0.0;
		out[ 1 ] = 0.0;
		return out;
	}
	out[ 0 ] = sqrt( M2x / (N-1) );
	out[ 1 ] = sqrt( M2y / (N-1) );
	return out;
}

/**
* Computes the covariance using textbook formula.
*
* @private
* @param {ArrayArray} arr - input array
* @param {number} mx - `x` mean
* @param {number} my - `y` mean
* @param {boolean} bool - boolean indicating whether to compute the population covariance
* @returns {number} covariance
*/
function covariance( arr, mx, my, bool ) {
	var N;
	var C;
	var i;

	N = arr.length;
	C = 0.0;
	for ( i = 0; i < N; i++ ) {
		C += ( arr[i][0]-mx ) * ( arr[i][1]-my );
	}
	if ( bool ) {
		return C / N;
	}
	if ( N === 1 ) {
		return 0.0;
	}
	return C / (N-1);
}

/**
* Computes the sample Pearson product-moment correlation distance using textbook formula.
*
* @private
* @param {ArrayArray} arr - input array
* @param {number} mx - `x` mean
* @param {number} my - `y` mean
* @param {boolean} bool - boolean indicating whether to compute the population correlation distance
* @returns {number} correlation distance
*/
function pcorrdist( arr, mx, my, bool ) {
	var cov;
	var sd;
	var d;
	if ( bool === false && arr.length < 2 ) {
		return 1.0;
	}
	sd = stdev( [ 0.0, 0.0 ], arr, mx, my, bool );
	cov = covariance( arr, mx, my, bool );
	d = 1.0 - ( cov / ( sd[0]*sd[1] ) );
	if ( d < 0.0 ) {
		return 0.0;
	}
	if ( d > 2.0 ) {
		return 2.0;
	}
	return d;
}

/**
* Generates a set of sample datasets.
*
* @private
* @param {PositiveInteger} N - number of datasets
* @param {PositiveInteger} M - dataset length
* @param {PositiveInteger} [seed] - PRNG seed
* @returns {ArrayArray} sample datasets
*/
function datasets( N, M, seed ) {
	var data;
	var rand;
	var tmp;
	var i;
	var j;

	rand = randu.factory({
		'seed': seed || ( randu()*pow( 2.0, 31 ) )|0
	});

	// Generate datasets consisting of (x,y) pairs of varying value ranges...
	data = new Array( N );
	for ( i = 0; i < N; i++ ) {
		tmp = new Array( M );
		for ( j = 0; j < M; j++ ) {
			tmp[ j ] = [
				rand() * pow( 10.0, i ),
				rand() * pow( 10.0, i )
			];
		}
		data[ i ] = tmp;
	}
	return data;
}


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof incrmpcorrdist, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function throws an error if not provided a positive integer for the window size', function test( t ) {
	var values;
	var i;

	values = [
		'5',
		-5.0,
		0.0,
		3.14,
		true,
		null,
		void 0,
		NaN,
		[],
		{},
		function noop() {}
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws an error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			incrmpcorrdist( value );
		};
	}
});

tape( 'the function throws an error if not provided a positive integer for the window size (known means)', function test( t ) {
	var values;
	var i;

	values = [
		'5',
		-5.0,
		0.0,
		3.14,
		true,
		null,
		void 0,
		NaN,
		[],
		{},
		function noop() {}
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws an error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			incrmpcorrdist( value, 3.0, 3.14 );
		};
	}
});

tape( 'the function throws an error if not provided a number as the mean value', function test( t ) {
	var values;
	var i;

	values = [
		'5',
		true,
		false,
		null,
		void 0,
		[],
		{},
		function noop() {}
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws an error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			incrmpcorrdist( 3, value, 3.14 );
		};
	}
});

tape( 'the function throws an error if not provided a number as the mean value', function test( t ) {
	var values;
	var i;

	values = [
		'5',
		true,
		false,
		null,
		void 0,
		[],
		{},
		function noop() {}
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws an error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			incrmpcorrdist( 3, 3.14, value );
		};
	}
});

tape( 'the function returns an accumulator function', function test( t ) {
	t.equal( typeof incrmpcorrdist( 3 ), 'function', 'returns a function' );
	t.end();
});

tape( 'the function returns an accumulator function (known means)', function test( t ) {
	t.equal( typeof incrmpcorrdist( 3, 3.0, 3.14 ), 'function', 'returns a function' );
	t.end();
});

tape( 'the accumulator function computes a moving sample Pearson product-moment correlation distance incrementally', function test( t ) {
	var expected;
	var actual;
	var delta;
	var means;
	var data;
	var acc;
	var arr;
	var tol;
	var d;
	var N;
	var M;
	var W;
	var i;
	var j;

	N = 10;
	M = 100;
	data = datasets( N, M, randu.seed );

	t.pass( 'seed: '+randu.seed );

	// Define the window size:
	W = 10;

	// For each dataset, compute the actual and expected correlation distances...
	for ( i = 0; i < N; i++ ) {
		d = data[ i ];

		acc = incrmpcorrdist( W );
		for ( j = 0; j < M; j++ ) {
			actual = acc( d[j][0], d[j][1] );
			if ( j < W ) {
				arr = d.slice( 0, j+1 );
			} else {
				arr = d.slice( j-W+1, j+1 );
			}
			means = mean( [ 0.0, 0.0 ], arr );
			expected = pcorrdist( arr, means[ 0 ], means[ 1 ], false );
			if ( actual === expected ) {
				t.equal( actual, expected, 'returns expected value. dataset: '+i+'. window: '+j+'.' );
			} else {
				if ( actual < 0.0 ) {
					actual = 0.0; // NOTE: this addresses occasional negative values due to accumulated floating-point error. Based on observation, typically `|actual| ≅ |expected|`, but `actual < 0` and `expected > 0`, suggesting that a sign got "flipped" along the way due to, e.g., operations which theoretically should compute to the same value, but do not due to floating-point error.
				}
				delta = abs( actual - expected );
				if ( expected === 0.0 || actual === 0.0 ) {
					tol = 10.0 * EPS;
				} else {
					tol = 1.0e6 * EPS * abs( expected );
				}
				t.equal( delta <= tol, true, 'dataset: '+i+'. window: '+j+'. expected: '+expected+'. actual: '+actual+'. tol: '+tol+'. delta: '+delta+'.' );
			}
		}
	}
	t.end();
});

tape( 'the accumulator function computes a moving sample Pearson product-moment correlation distance incrementally (known means)', function test( t ) {
	var expected;
	var actual;
	var means;
	var delta;
	var data;
	var acc;
	var arr;
	var tol;
	var d;
	var N;
	var M;
	var W;
	var i;
	var j;

	N = 10;
	M = 100;
	data = datasets( N, M, randu.seed );

	t.pass( 'seed: '+randu.seed );

	// Define the window size:
	W = 10;

	// For each dataset, compute the actual and expected correlation distances...
	for ( i = 0; i < N; i++ ) {
		d = data[ i ];
		means = mean( [ 0.0, 0.0 ], d );
		acc = incrmpcorrdist( W, means[ 0 ], means[ 1 ] );
		for ( j = 0; j < M; j++ ) {
			actual = acc( d[j][0], d[j][1] );
			if ( j < W ) {
				arr = d.slice( 0, j+1 );
			} else {
				arr = d.slice( j-W+1, j+1 );
			}
			expected = pcorrdist( arr, means[ 0 ], means[ 1 ], true );
			if ( actual === expected ) {
				t.equal( actual, expected, 'returns expected value. dataset: '+i+'. window: '+j+'.' );
			} else {
				delta = abs( actual - expected );
				tol = 1.0e6 * EPS * abs( expected );
				t.equal( delta <= tol, true, 'dataset: '+i+'. window: '+j+'. expected: '+expected+'. actual: '+actual+'. tol: '+tol+'. delta: '+delta+'.' );
			}
		}
	}
	t.end();
});

tape( 'if not provided an input value, the accumulator function returns the current sample correlation distance (unknown means)', function test( t ) {
	var expected;
	var actual;
	var means;
	var delta;
	var data;
	var tol;
	var acc;
	var W;
	var N;
	var d;
	var i;

	data = [
		[ 2.0, 1.0 ],
		[ -5.0, 3.14 ],
		[ 3.0, -1.0 ],
		[ 5.0, -9.5 ]
	];
	N = data.length;

	// Window size:
	W = 3;

	acc = incrmpcorrdist( W );
	for ( i = 0; i < N; i++ ) {
		acc( data[ i ][ 0 ], data[ i ][ 1 ] );
		actual = acc();
		if ( i < W-1 ) {
			d = data.slice( 0, i+1 );
		} else {
			d = data.slice( i-W+1, i+1 );
		}
		means = mean( [ 0.0, 0.0 ], d );
		expected = pcorrdist( d, means[ 0 ], means[ 1 ], false );
		if ( actual === expected ) {
			t.equal( actual, expected, 'returns expected value. window: '+i+'.' );
		} else {
			delta = abs( actual - expected );
			tol = 1.0 * EPS * abs( expected );
			t.equal( delta < tol, true, 'window: '+i+'. expected: '+expected+'. actual: '+actual+'. tol: '+tol+'. delta: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'if not provided an input value, the accumulator function returns the current sample correlation distance (known means)', function test( t ) {
	var expected;
	var actual;
	var means;
	var delta;
	var data;
	var tol;
	var acc;
	var W;
	var N;
	var d;
	var i;

	data = [
		[ 2.0, 1.0 ],
		[ -5.0, 3.14 ],
		[ 3.0, -1.0 ],
		[ 5.0, -9.5 ]
	];
	N = data.length;
	means = mean( [ 0.0, 0.0 ], data );

	// Window size:
	W = 3;

	acc = incrmpcorrdist( W, means[ 0 ], means[ 1 ] );
	for ( i = 0; i < N; i++ ) {
		acc( data[ i ][ 0 ], data[ i ][ 1 ] );
		actual = acc();
		if ( i < W-1 ) {
			d = data.slice( 0, i+1 );
		} else {
			d = data.slice( i-W+1, i+1 );
		}
		expected = pcorrdist( d, means[ 0 ], means[ 1 ], true );
		if ( actual === expected ) {
			t.equal( actual, expected, 'returns expected value. window: '+i+'.' );
		} else {
			delta = abs( actual - expected );
			tol = 1.0 * EPS * abs( expected );
			t.equal( delta < tol, true, 'window: '+i+'. expected: '+expected+'. actual: '+actual+'. tol: '+tol+'. delta: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'if data has yet to be provided, the accumulator function returns `null`', function test( t ) {
	var acc = incrmpcorrdist( 3 );
	t.equal( acc(), null, 'returns null' );
	t.end();
});

tape( 'if data has yet to be provided, the accumulator function returns `null` (known means)', function test( t ) {
	var acc = incrmpcorrdist( 3, 3.0, 3.14 );
	t.equal( acc(), null, 'returns null' );
	t.end();
});

tape( 'if only one datum has been provided and the means are unknown, the accumulator function returns `1`', function test( t ) {
	var acc = incrmpcorrdist( 3 );
	acc( 2.0, 3.14 );
	t.equal( acc(), 1.0, 'returns 1' );
	t.end();
});

tape( 'if only one datum has been provided and the means are known, the accumulator function may not return `1`', function test( t ) {
	var acc = incrmpcorrdist( 3, 30.0, -100.0 );
	acc( 2.0, 1.0 );
	t.notEqual( acc(), 1.0, 'does not return 1' );
	t.end();
});

tape( 'if the window size is `1` and the means are unknown, the accumulator function always returns `1`', function test( t ) {
	var acc;
	var r;
	var i;

	acc = incrmpcorrdist( 1 );
	for ( i = 0; i < 100; i++ ) {
		r = acc( randu()*100.0, randu()*100.0 );
		t.equal( r, 1.0, 'returns expected value' );
	}
	t.end();
});

tape( 'if the window size is `1` and the means are known, the accumulator function may not always return `1`', function test( t ) {
	var acc;
	var r;
	var i;

	acc = incrmpcorrdist( 1, 500.0, -500.0 ); // means are outside the range of simulated values so the correlation should never be zero
	for ( i = 0; i < 100; i++ ) {
		r = acc( randu()*100.0, randu()*100.0 );
		t.notEqual( r, 1.0, 'does not return 1' );
	}
	t.end();
});

tape( 'if provided `NaN`, the accumulated value is `NaN` for at least `W` invocations (unknown means)', function test( t ) {
	var expected;
	var delta;
	var data;
	var acc;
	var tol;
	var v;
	var i;

	expected = [
		NaN,
		NaN,
		NaN,
		NaN,
		NaN,
		NaN,
		NaN, // 0/0
		0.0,
		NaN,
		NaN,
		NaN,
		NaN, // 0/0
		0.0,
		NaN,
		NaN,
		NaN,
		NaN,
		NaN,
		NaN,
		NaN,
		NaN
	];

	data = [
		[ NaN, 3.14 ],  // NaN
		[ 3.14, 3.14 ], // NaN, 3.14
		[ 3.14, 3.14 ], // NaN, 3.14, 3.14
		[ NaN, 3.14 ],  // 3.14, 3.14, NaN
		[ 3.14, 3.14 ], // 3.14, NaN, 3.14
		[ 3.14, 3.14 ], // NaN, 3.14, 3.14
		[ 3.14, 3.14 ], // 3.14, 3.14, 3.14
		[ -3.14, -3.14 ], // 3.14, 3.14, -3.14
		[ NaN, 3.14 ],  // 3.14, -3.14, NaN
		[ 3.14, 3.14 ], // -3.14, NaN, 3.14
		[ 3.14, 3.14 ], // NaN, 3.14, 3.14
		[ 3.14, 3.14 ], // 3.14, 3.14, 3.14
		[ 6.14, 6.14 ], // 3.14, 3.14, 6.14
		[ NaN, 3.14 ],  // 3.14, 6.14, NaN
		[ 3.14, 3.14 ], // 6.14, NaN, 3.14
		[ 3.14, 3.14 ], // NaN, 3.14, 3.14
		[ NaN, 3.14 ],  // 3.14, 3.14, NaN
		[ NaN, 3.14 ],  // 3.14, NaN, NaN
		[ NaN, 3.14 ],  // NaN, NaN, NaN
		[ NaN, 3.14 ],  // NaN, NaN, NaN
		[ 3.14, 3.14 ]  // NaN, NaN, 3.14
	];

	acc = incrmpcorrdist( 3 );

	for ( i = 0; i < data.length; i++ ) {
		v = acc( data[i][0], data[i][1] );
		if ( isnan( expected[ i ] ) ) {
			t.equal( isnan( v ), true, 'returns expected value for window '+i );
			t.equal( isnan( acc() ), true, 'returns expected value for window '+i );
		} else if ( v === expected[ i ] ) {
			t.equal( v, expected[ i ], 'returns expected value for window: '+i );
		} else {
			delta = abs( v - expected[ i ] );
			if ( expected[ i ] === 0.0 ) {
				tol = 1.0 * EPS;
			} else {
				tol = 1.0 * EPS * abs( expected[ i ] );
			}
			t.equal( delta < tol, true, 'window: '+i+'. expected: '+expected[ i ]+'. actual: '+v+'. tol: '+tol+'. delta: '+delta+'.' );
			t.equal( acc(), v, 'returns expected value for window '+i );
		}
	}

	data = [
		[ 3.14, NaN ],  // NaN
		[ 3.14, 3.14 ], // NaN, 3.14
		[ 3.14, 3.14 ], // NaN, 3.14, 3.14
		[ 3.14, NaN ],  // 3.14, 3.14, NaN
		[ 3.14, 3.14 ], // 3.14, NaN, 3.14
		[ 3.14, 3.14 ], // NaN, 3.14, 3.14
		[ 3.14, 3.14 ], // 3.14, 3.14, 3.14
		[ -3.14, -3.14 ], // 3.14, 3.14, -3.14
		[ 3.14, NaN ],  // 3.14, -3.14, NaN
		[ 3.14, 3.14 ], // -3.14, NaN, 3.14
		[ 3.14, 3.14 ], // NaN, 3.14, 3.14
		[ 3.14, 3.14 ], // 3.14, 3.14, 3.14
		[ 6.14, 6.14 ], // 3.14, 3.14, 6.14
		[ 3.14, NaN ],  // 3.14, 6.14, NaN
		[ 3.14, 3.14 ], // 6.14, NaN, 3.14
		[ 3.14, 3.14 ], // NaN, 3.14, 3.14
		[ 3.14, NaN ],  // 3.14, 3.14, NaN
		[ 3.14, NaN ],  // 3.14, NaN, NaN
		[ 3.14, NaN ],  // NaN, NaN, NaN
		[ 3.14, NaN ],  // NaN, NaN, NaN
		[ 3.14, 3.14 ]  // NaN, NaN, 3.14
	];

	acc = incrmpcorrdist( 3 );

	for ( i = 0; i < data.length; i++ ) {
		v = acc( data[i][0], data[i][1] );
		if ( isnan( expected[ i ] ) ) {
			t.equal( isnan( v ), true, 'returns expected value for window '+i );
			t.equal( isnan( acc() ), true, 'returns expected value for window '+i );
		} else if ( v === expected[ i ] ) {
			t.equal( v, expected[ i ], 'returns expected value for window: '+i );
		} else {
			delta = abs( v - expected[ i ] );
			if ( expected[ i ] === 0.0 ) {
				tol = 1.0 * EPS;
			} else {
				tol = 1.0 * EPS * abs( expected[ i ] );
			}
			t.equal( delta < tol, true, 'window: '+i+'. expected: '+expected[ i ]+'. actual: '+v+'. tol: '+tol+'. delta: '+delta+'.' );
			t.equal( acc(), v, 'returns expected value for window '+i );
		}
	}
	t.end();
});

tape( 'if provided `NaN`, the accumulated value is `NaN` for at least `W` invocations (known means)', function test( t ) {
	var expected;
	var data;
	var acc;
	var v;
	var i;

	expected = [
		NaN,
		NaN,
		NaN,
		NaN,
		NaN,
		NaN,
		NaN, // 0/0
		0.0,
		NaN,
		NaN,
		NaN,
		NaN, // 0/0
		0.0,
		NaN,
		NaN,
		NaN,
		NaN,
		NaN,
		NaN,
		NaN,
		NaN
	];

	data = [
		[ NaN, 3.14 ],  // NaN
		[ 3.14, 3.14 ], // NaN, 3.14
		[ 3.14, 3.14 ], // NaN, 3.14, 3.14
		[ NaN, 3.14 ],  // 3.14, 3.14, NaN
		[ 3.14, 3.14 ], // 3.14, NaN, 3.14
		[ 3.14, 3.14 ], // NaN, 3.14, 3.14
		[ 3.14, 3.14 ], // 3.14, 3.14, 3.14
		[ -3.14, -3.14 ], // 3.14, 3.14, -3.14
		[ NaN, 3.14 ],  // 3.14, -3.14, NaN
		[ 3.14, 3.14 ], // -3.14, NaN, 3.14
		[ 3.14, 3.14 ], // NaN, 3.14, 3.14
		[ 3.14, 3.14 ], // 3.14, 3.14, 3.14
		[ 6.14, 6.14 ], // 3.14, 3.14, 6.14
		[ NaN, 3.14 ],  // 3.14, 6.14, NaN
		[ 3.14, 3.14 ], // 6.14, NaN, 3.14
		[ 3.14, 3.14 ], // NaN, 3.14, 3.14
		[ NaN, 3.14 ],  // 3.14, 3.14, NaN
		[ NaN, 3.14 ],  // 3.14, NaN, NaN
		[ NaN, 3.14 ],  // NaN, NaN, NaN
		[ NaN, 3.14 ],  // NaN, NaN, NaN
		[ 3.14, 3.14 ]  // NaN, NaN, 3.14
	];

	acc = incrmpcorrdist( 3, 3.14, 3.14 );

	for ( i = 0; i < data.length; i++ ) {
		v = acc( data[i][0], data[i][1] );
		if ( isnan( expected[ i ] ) ) {
			t.equal( isnan( v ), true, 'returns expected value for window '+i );
			t.equal( isnan( acc() ), true, 'returns expected value for window '+i );
		} else {
			t.equal( v, expected[ i ], 'returns expected value for window '+i );
			t.equal( acc(), expected[ i ], 'returns expected value for window '+i );
		}
	}

	data = [
		[ 3.14, NaN ],  // NaN
		[ 3.14, 3.14 ], // NaN, 3.14
		[ 3.14, 3.14 ], // NaN, 3.14, 3.14
		[ 3.14, NaN ],  // 3.14, 3.14, NaN
		[ 3.14, 3.14 ], // 3.14, NaN, 3.14
		[ 3.14, 3.14 ], // NaN, 3.14, 3.14
		[ 3.14, 3.14 ], // 3.14, 3.14, 3.14
		[ -3.14, -3.14 ], // 3.14, 3.14, -3.14
		[ 3.14, NaN ],  // 3.14, -3.14, NaN
		[ 3.14, 3.14 ], // -3.14, NaN, 3.14
		[ 3.14, 3.14 ], // NaN, 3.14, 3.14
		[ 3.14, 3.14 ], // 3.14, 3.14, 3.14
		[ 6.14, 6.14 ], // 3.14, 3.14, 6.14
		[ 3.14, NaN ],  // 3.14, 6.14, NaN
		[ 3.14, 3.14 ], // 6.14, NaN, 3.14
		[ 3.14, 3.14 ], // NaN, 3.14, 3.14
		[ 3.14, NaN ],  // 3.14, 3.14, NaN
		[ 3.14, NaN ],  // 3.14, NaN, NaN
		[ 3.14, NaN ],  // NaN, NaN, NaN
		[ 3.14, NaN ],  // NaN, NaN, NaN
		[ 3.14, 3.14 ]  // NaN, NaN, 3.14
	];

	acc = incrmpcorrdist( 3, 3.14, 3.14 );

	for ( i = 0; i < data.length; i++ ) {
		v = acc( data[i][0], data[i][1] );
		if ( isnan( expected[ i ] ) ) {
			t.equal( isnan( v ), true, 'returns expected value for window '+i );
			t.equal( isnan( acc() ), true, 'returns expected value for window '+i );
		} else {
			t.equal( v, expected[ i ], 'returns expected value for window '+i );
			t.equal( acc(), expected[ i ], 'returns expected value for window '+i );
		}
	}
	t.end();
});
