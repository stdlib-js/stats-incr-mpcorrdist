// Copyright (c) 2023 The Stdlib Authors. License is Apache-2.0: http://www.apache.org/licenses/LICENSE-2.0
/// <reference types="./index.d.ts" />
import{isPrimitive as r}from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-positive-integer@esm/index.mjs";import{isPrimitive as t}from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-number@esm/index.mjs";import s from"https://cdn.jsdelivr.net/gh/stdlib-js/stats-incr-mpcorr@esm/index.mjs";import e from"https://cdn.jsdelivr.net/gh/stdlib-js/error-tools-fmtprodmsg@v0.0.2-esm/index.mjs";function i(i,n,o){var m;if(!r(i))throw new TypeError(e("1It4b,Ht",i));if(arguments.length>1){if(!t(n))throw new TypeError(e("1It4A,Hr",n));if(!t(o))throw new TypeError(e("1It4B,Hu",o));m=s(i,n,o)}else m=s(i);return d;function d(r,t){var s;return 0===arguments.length?null===(s=m())?s:1-s:1-m(r,t)}}export{i as default};
//# sourceMappingURL=index.mjs.map
