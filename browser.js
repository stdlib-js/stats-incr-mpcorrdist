// Copyright (c) 2024 The Stdlib Authors. License is Apache-2.0: http://www.apache.org/licenses/LICENSE-2.0
var e,r;e=this,r=function(){"use strict";var e="function"==typeof Object.defineProperty?Object.defineProperty:null,r=Object.defineProperty;function t(e){return"number"==typeof e}function n(e){var r,t="";for(r=0;r<e;r++)t+="0";return t}function i(e,r,t){var i=!1,a=r-e.length;return a<0||(function(e){return"-"===e[0]}(e)&&(i=!0,e=e.substr(1)),e=t?e+n(a):n(a)+e,i&&(e="-"+e)),e}var a=String.prototype.toLowerCase,o=String.prototype.toUpperCase;function c(e){var r,n,c;switch(e.specifier){case"b":r=2;break;case"o":r=8;break;case"x":case"X":r=16;break;default:r=10}if(n=e.arg,c=parseInt(n,10),!isFinite(c)){if(!t(n))throw new Error("invalid integer. Value: "+n);c=0}return c<0&&("u"===e.specifier||10!==r)&&(c=4294967295+c+1),c<0?(n=(-c).toString(r),e.precision&&(n=i(n,e.precision,e.padRight)),n="-"+n):(n=c.toString(r),c||e.precision?e.precision&&(n=i(n,e.precision,e.padRight)):n="",e.sign&&(n=e.sign+n)),16===r&&(e.alternate&&(n="0x"+n),n=e.specifier===o.call(e.specifier)?o.call(n):a.call(n)),8===r&&e.alternate&&"0"!==n.charAt(0)&&(n="0"+n),n}var u=Math.abs,l=String.prototype.toLowerCase,s=String.prototype.toUpperCase,f=String.prototype.replace,p=/e\+(\d)$/,g=/e-(\d)$/,d=/^(\d+)$/,h=/^(\d+)e/,b=/\.0$/,y=/\.0*e/,w=/(\..*[^0])0*e/;function v(e){var r,n,i=parseFloat(e.arg);if(!isFinite(i)){if(!t(e.arg))throw new Error("invalid floating-point number. Value: "+n);i=e.arg}switch(e.specifier){case"e":case"E":n=i.toExponential(e.precision);break;case"f":case"F":n=i.toFixed(e.precision);break;case"g":case"G":u(i)<1e-4?((r=e.precision)>0&&(r-=1),n=i.toExponential(r)):n=i.toPrecision(e.precision),e.alternate||(n=f.call(n,w,"$1e"),n=f.call(n,y,"e"),n=f.call(n,b,""));break;default:throw new Error("invalid double notation. Value: "+e.specifier)}return n=f.call(n,p,"e+0$1"),n=f.call(n,g,"e-0$1"),e.alternate&&(n=f.call(n,d,"$1."),n=f.call(n,h,"$1.e")),i>=0&&e.sign&&(n=e.sign+n),n=e.specifier===s.call(e.specifier)?s.call(n):l.call(n)}function m(e){var r,t="";for(r=0;r<e;r++)t+=" ";return t}var _=String.fromCharCode,E=Array.isArray;function S(e){return e!=e}function T(e){var r={};return r.specifier=e.specifier,r.precision=void 0===e.precision?1:e.precision,r.width=e.width,r.flags=e.flags||"",r.mapping=e.mapping,r}function I(e){var r,t,n,a,o,u,l,s,f,p,g,d,h;if(!E(e))throw new TypeError("invalid argument. First argument must be an array. Value: `"+e+"`.");for(u="",l=1,s=0;s<e.length;s++)if("string"==typeof(n=e[s]))u+=n;else{if(r=void 0!==n.precision,!(n=T(n)).specifier)throw new TypeError("invalid argument. Token is missing `specifier` property. Index: `"+s+"`. Value: `"+n+"`.");for(n.mapping&&(l=n.mapping),t=n.flags,f=0;f<t.length;f++)switch(a=t.charAt(f)){case" ":n.sign=" ";break;case"+":n.sign="+";break;case"-":n.padRight=!0,n.padZeros=!1;break;case"0":n.padZeros=t.indexOf("-")<0;break;case"#":n.alternate=!0;break;default:throw new Error("invalid flag: "+a)}if("*"===n.width){if(n.width=parseInt(arguments[l],10),l+=1,S(n.width))throw new TypeError("the argument for * width at position "+l+" is not a number. Value: `"+n.width+"`.");n.width<0&&(n.padRight=!0,n.width=-n.width)}if(r&&"*"===n.precision){if(n.precision=parseInt(arguments[l],10),l+=1,S(n.precision))throw new TypeError("the argument for * precision at position "+l+" is not a number. Value: `"+n.precision+"`.");n.precision<0&&(n.precision=1,r=!1)}switch(n.arg=arguments[l],n.specifier){case"b":case"o":case"x":case"X":case"d":case"i":case"u":r&&(n.padZeros=!1),n.arg=c(n);break;case"s":n.maxWidth=r?n.precision:-1,n.arg=String(n.arg);break;case"c":if(!S(n.arg)){if((o=parseInt(n.arg,10))<0||o>127)throw new Error("invalid character code. Value: "+n.arg);n.arg=S(o)?String(n.arg):_(o)}break;case"e":case"E":case"f":case"F":case"g":case"G":r||(n.precision=6),n.arg=v(n);break;default:throw new Error("invalid specifier: "+n.specifier)}n.maxWidth>=0&&n.arg.length>n.maxWidth&&(n.arg=n.arg.substring(0,n.maxWidth)),n.padZeros?n.arg=i(n.arg,n.width||n.precision,n.padRight):n.width&&(n.arg=(p=n.arg,g=n.width,d=n.padRight,h=void 0,(h=g-p.length)<0?p:p=d?p+m(h):m(h)+p)),u+=n.arg||"",l+=1}return u}var k=/%(?:([1-9]\d*)\$)?([0 +\-#]*)(\*|\d+)?(?:(\.)(\*|\d+)?)?[hlL]?([%A-Za-z])/g;function j(e){var r={mapping:e[1]?parseInt(e[1],10):void 0,flags:e[2],width:e[3],precision:e[5],specifier:e[6]};return"."===e[4]&&void 0===e[5]&&(r.precision="1"),r}function x(e){var r,t,n,i;for(t=[],i=0,n=k.exec(e);n;)(r=e.slice(i,k.lastIndex-n[0].length)).length&&t.push(r),t.push(j(n)),i=k.lastIndex,n=k.exec(e);return(r=e.slice(i)).length&&t.push(r),t}function F(e){var r,t;if("string"!=typeof e)throw new TypeError(F("invalid argument. First argument must be a string. Value: `%s`.",e));for(r=[x(e)],t=1;t<arguments.length;t++)r.push(arguments[t]);return I.apply(null,r)}var N=Object.prototype,A=N.toString,V=N.__defineGetter__,O=N.__defineSetter__,P=N.__lookupGetter__,$=N.__lookupSetter__,C=function(){try{return e({},"x",{}),!0}catch(e){return!1}}()?r:function(e,r,t){var n,i,a,o;if("object"!=typeof e||null===e||"[object Array]"===A.call(e))throw new TypeError(F("invalid argument. First argument must be an object. Value: `%s`.",e));if("object"!=typeof t||null===t||"[object Array]"===A.call(t))throw new TypeError(F("invalid argument. Property descriptor must be an object. Value: `%s`.",t));if((i="value"in t)&&(P.call(e,r)||$.call(e,r)?(n=e.__proto__,e.__proto__=N,delete e[r],e[r]=t.value,e.__proto__=n):e[r]=t.value),a="get"in t,o="set"in t,i&&(a||o))throw new Error("invalid argument. Cannot specify one or more accessors and a value or writable attribute in the property descriptor.");return a&&V&&V.call(e,r,t.get),o&&O&&O.call(e,r,t.set),e};function R(e,r,t){C(e,r,{configurable:!1,enumerable:!1,writable:!1,value:t})}function G(e){return"number"==typeof e}var Z="function"==typeof Symbol&&"symbol"==typeof Symbol("foo");function W(){return Z&&"symbol"==typeof Symbol.toStringTag}var L=Object.prototype.toString,M=Object.prototype.hasOwnProperty,U="function"==typeof Symbol?Symbol:void 0,X="function"==typeof U?U.toStringTag:"",Y=W()?function(e){var r,t,n,i,a;if(null==e)return L.call(e);t=e[X],a=X,r=null!=(i=e)&&M.call(i,a);try{e[X]=void 0}catch(r){return L.call(e)}return n=L.call(e),r?e[X]=t:delete e[X],n}:function(e){return L.call(e)},q=Number,z=q.prototype.toString,B=W();function D(e){return"object"==typeof e&&(e instanceof q||(B?function(e){try{return z.call(e),!0}catch(e){return!1}}(e):"[object Number]"===Y(e)))}function H(e){return G(e)||D(e)}R(H,"isPrimitive",G),R(H,"isObject",D);var J=Number.POSITIVE_INFINITY,K=q.NEGATIVE_INFINITY,Q=Math.floor;function ee(e){return e<J&&e>K&&Q(r=e)===r;var r}function re(e){return G(e)&&ee(e)}function te(e){return D(e)&&ee(e.valueOf())}function ne(e){return re(e)||te(e)}function ie(e){return re(e)&&e>0}function ae(e){return te(e)&&e.valueOf()>0}function oe(e){return ie(e)||ae(e)}function ce(e){return e!=e}R(ne,"isPrimitive",re),R(ne,"isObject",te),R(oe,"isPrimitive",ie),R(oe,"isObject",ae);var ue=Math.sqrt,le="function"==typeof Float64Array,se="function"==typeof Float64Array?Float64Array:null,fe="function"==typeof Float64Array?Float64Array:void 0,pe=function(){var e,r,t;if("function"!=typeof se)return!1;try{r=new se([1,3.14,-3.14,NaN]),t=r,e=(le&&t instanceof Float64Array||"[object Float64Array]"===Y(t))&&1===r[0]&&3.14===r[1]&&-3.14===r[2]&&r[3]!=r[3]}catch(r){e=!1}return e}()?fe:function(){throw new Error("not implemented")};function ge(e,r,t){var n,i,a,o,c,u,l,s,f,p,g,d,h,b,y,w,v,m;if(!ie(e))throw new TypeError(F("invalid argument. First argument must be a positive integer. Value: `%s`.",e));if(n=new pe(2*e),v=e-1,u=0,l=0,y=0,b=-1,w=0,arguments.length>1){if(!G(r))throw new TypeError(F("invalid argument. Second argument must be a number. Value: `%s`.",r));if(!G(t))throw new TypeError(F("invalid argument. Third argument must be a number. Value: `%s`.",t));return s=r,f=t,function(r,t){var v,_;if(0===arguments.length)return 0===w?null:w<e?y/w/(p*g):y/e/(p*g);if(m=2*(b=(b+1)%e),ce(r)||ce(t))w=e,y=NaN;else{if(w<e)return n[m]=r,n[m+1]=t,l+=(h=t-f)*h,y+=(d=r-s)*h,p=ue((u+=d*d)/(w+=1)),g=ue(l/w),y/w/(p*g);if(ce(n[m])||ce(n[m+1])){for(u=0,l=0,y=0,v=0;v<e;v++)if((_=2*v)!==m){if(ce(n[_])||ce(n[_+1])){w=e,y=NaN;break}d=n[_]-s,u+=d*d,h=n[_+1]-f,l+=h*h,y+=d*h}}else!1===ce(y)&&(i=n[m]-s,a=r-s,o=n[m+1]-f,u+=(a-i)*(a+i),l+=((c=t-f)-o)*(c+o),y+=a*c-i*o)}return n[m]=r,n[m+1]=t,p=ue(u/e),g=ue(l/e),y/e/(p*g)}}return s=0,f=0,function(r,t){var _,E,S,T,I;if(0===arguments.length)return 0===w?null:1===w?0:w<e?y/(w-1)/(p*g):y/v/(p*g);if(m=2*(b=(b+1)%e),ce(r)||ce(t))w=e,y=NaN;else{if(w<e)return n[m]=r,n[m+1]=t,u+=(d=r-s)*(r-(s+=d/(w+=1))),l+=(h=t-f)*(c=t-(f+=h/w)),y+=d*c,1===w?0:(p=ue(u/(S=w-1)),g=ue(l/S),y/S/(p*g));if(1===w)return 0;if(ce(n[m])||ce(n[m+1])){for(w=1,s=r,f=t,u=0,l=0,y=0,T=0;T<e;T++)if((I=2*T)!==m){if(_=n[I],E=n[I+1],ce(_)||ce(E)){w=e,y=NaN;break}u+=(d=_-s)*(_-(s+=d/(w+=1))),l+=(h=E-f)*(c=E-(f+=h/w)),y+=d*c}}else!1===ce(y)&&(i=n[m]-s,o=n[m+1]-f,u+=(d=(a=r-s)-i)*(i+(r-(s+=d/e))),l+=(h=(c=t-f)-o)*(o+(t-(f+=h/e))),y+=a*c-i*o-d*h/e)}return n[m]=r,n[m+1]=t,p=ue(u/v),g=ue(l/v),y/v/(p*g)}}function de(){var e,r=arguments,t="https://stdlib.io/e/"+r[0]+"?";for(e=1;e<r.length;e++)t+="&arg[]="+encodeURIComponent(r[e]);return t}return function(e,r,t){var n;if(!ie(e))throw new TypeError(de("1It4b",e));if(arguments.length>1){if(!G(r))throw new TypeError(de("1It4A",r));if(!G(t))throw new TypeError(de("1It4B",t));n=ge(e,r,t)}else n=ge(e);return function(e,r){var t;return 0===arguments.length?null===(t=n())?t:1-t:1-n(e,r)}}},"object"==typeof exports&&"undefined"!=typeof module?module.exports=r():"function"==typeof define&&define.amd?define(r):(e="undefined"!=typeof globalThis?globalThis:e||self).incrmpcorrdist=r();
//# sourceMappingURL=browser.js.map
