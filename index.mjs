// Copyright (c) 2022 The Stdlib Authors. License is Apache-2.0: http://www.apache.org/licenses/LICENSE-2.0
/// <reference types="./index.d.ts" />
import r from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-positive-integer@esm/index.mjs";import e from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-number@esm/index.mjs";import t from"https://cdn.jsdelivr.net/gh/stdlib-js/stats-incr-mpcorr@esm/index.mjs";import s from"https://cdn.jsdelivr.net/gh/stdlib-js/error-tools-fmtprodmsg@esm/index.mjs";var i=r.isPrimitive,n=e.isPrimitive,o=t,m=s;var d=function(r,e,t){var s;if(!i(r))throw new TypeError(m("0eL4o",r));if(arguments.length>1){if(!n(e))throw new TypeError(m("0eL4N",e));if(!n(t))throw new TypeError(m("0eL4O",t));s=o(r,e,t)}else s=o(r);return d;function d(r,e){var t;return 0===arguments.length?null===(t=s())?t:1-t:1-s(r,e)}};export{d as default};
//# sourceMappingURL=index.mjs.map
