"use strict";var l=function(e,r){return function(){return r||e((r={exports:{}}).exports,r),r.exports}};var m=l(function(h,o){
var f=require('@stdlib/assert-is-positive-integer/dist').isPrimitive,a=require('@stdlib/assert-is-number/dist').isPrimitive,s=require('@stdlib/stats-incr-mpcorr/dist'),n=require('@stdlib/error-tools-fmtprodmsg/dist');function p(e,r,u){var i;if(!f(e))throw new TypeError(n('1It4b',e));if(arguments.length>1){if(!a(r))throw new TypeError(n('1It4A',r));if(!a(u))throw new TypeError(n('1It4B',u));i=s(e,r,u)}else i=s(e);return v;function v(c,g){var t;return arguments.length===0?(t=i(),t===null?t:1-t):1-i(c,g)}}o.exports=p
});var b=m();module.exports=b;
/** @license Apache-2.0 */
//# sourceMappingURL=index.js.map
