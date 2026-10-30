"use strict";var l=function(e,r){return function(){try{return r||e((r={exports:{}}).exports,r),r.exports}catch(i){throw (r=0, i)}};};var m=l(function(h,o){
var f=require('@stdlib/assert-is-positive-integer/dist').isPrimitive,a=require('@stdlib/assert-is-number/dist').isPrimitive,s=require('@stdlib/stats-incr-mpcorr/dist'),n=require('@stdlib/error-tools-fmtprodmsg/dist');function p(e,r,i){var t;if(!f(e))throw new TypeError(n('1It4b',e));if(arguments.length>1){if(!a(r))throw new TypeError(n('1It4A',r));if(!a(i))throw new TypeError(n('1It4B',i));t=s(e,r,i)}else t=s(e);return v;function v(c,g){var u;return arguments.length===0?(u=t(),u===null?u:1-u):1-t(c,g)}}o.exports=p
});var b=m();module.exports=b;
/** @license Apache-2.0 */
//# sourceMappingURL=index.js.map
