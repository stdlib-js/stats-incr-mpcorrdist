// Copyright (c) 2023 The Stdlib Authors. License is Apache-2.0: http://www.apache.org/licenses/LICENSE-2.0
var e,r;e=this,r=function(){"use strict";var e="function"==typeof Object.defineProperty?Object.defineProperty:null,r=Object.defineProperty;function t(e){return"number"==typeof e}function i(e){var r,t="";for(r=0;r<e;r++)t+="0";return t}function n(e,r,t){var n=!1,a=r-e.length;return a<0||(function(e){return"-"===e[0]}(e)&&(n=!0,e=e.substr(1)),e=t?e+i(a):i(a)+e,n&&(e="-"+e)),e}var a=String.prototype.toLowerCase,o=String.prototype.toUpperCase;function c(e){var r,i,c;switch(e.specifier){case"b":r=2;break;case"o":r=8;break;case"x":case"X":r=16;break;default:r=10}if(i=e.arg,c=parseInt(i,10),!isFinite(c)){if(!t(i))throw new Error("invalid integer. Value: "+i);c=0}return c<0&&("u"===e.specifier||10!==r)&&(c=4294967295+c+1),c<0?(i=(-c).toString(r),e.precision&&(i=n(i,e.precision,e.padRight)),i="-"+i):(i=c.toString(r),c||e.precision?e.precision&&(i=n(i,e.precision,e.padRight)):i="",e.sign&&(i=e.sign+i)),16===r&&(e.alternate&&(i="0x"+i),i=e.specifier===o.call(e.specifier)?o.call(i):a.call(i)),8===r&&e.alternate&&"0"!==i.charAt(0)&&(i="0"+i),i}function s(e){return"string"==typeof e}var l=Math.abs,p=String.prototype.toLowerCase,u=String.prototype.toUpperCase,f=String.prototype.replace,g=/e\+(\d)$/,d=/e-(\d)$/,h=/^(\d+)$/,w=/^(\d+)e/,b=/\.0$/,y=/\.0*e/,v=/(\..*[^0])0*e/;function m(e){var r,i,n=parseFloat(e.arg);if(!isFinite(n)){if(!t(e.arg))throw new Error("invalid floating-point number. Value: "+i);n=e.arg}switch(e.specifier){case"e":case"E":i=n.toExponential(e.precision);break;case"f":case"F":i=n.toFixed(e.precision);break;case"g":case"G":l(n)<1e-4?((r=e.precision)>0&&(r-=1),i=n.toExponential(r)):i=n.toPrecision(e.precision),e.alternate||(i=f.call(i,v,"$1e"),i=f.call(i,y,"e"),i=f.call(i,b,""));break;default:throw new Error("invalid double notation. Value: "+e.specifier)}return i=f.call(i,g,"e+0$1"),i=f.call(i,d,"e-0$1"),e.alternate&&(i=f.call(i,h,"$1."),i=f.call(i,w,"$1.e")),n>=0&&e.sign&&(i=e.sign+i),i=e.specifier===u.call(e.specifier)?u.call(i):p.call(i)}function E(e){var r,t="";for(r=0;r<e;r++)t+=" ";return t}function k(e,r,t){var i=r-e.length;return i<0?e:e=t?e+E(i):E(i)+e}var x=String.fromCharCode,S=isNaN,_=Array.isArray;function I(e){var r={};return r.specifier=e.specifier,r.precision=void 0===e.precision?1:e.precision,r.width=e.width,r.flags=e.flags||"",r.mapping=e.mapping,r}function T(e){var r,t,i,a,o,l,p,u,f;if(!_(e))throw new TypeError("invalid argument. First argument must be an array. Value: `"+e+"`.");for(l="",p=1,u=0;u<e.length;u++)if(s(i=e[u]))l+=i;else{if(r=void 0!==i.precision,!(i=I(i)).specifier)throw new TypeError("invalid argument. Token is missing `specifier` property. Index: `"+u+"`. Value: `"+i+"`.");for(i.mapping&&(p=i.mapping),t=i.flags,f=0;f<t.length;f++)switch(a=t.charAt(f)){case" ":i.sign=" ";break;case"+":i.sign="+";break;case"-":i.padRight=!0,i.padZeros=!1;break;case"0":i.padZeros=t.indexOf("-")<0;break;case"#":i.alternate=!0;break;default:throw new Error("invalid flag: "+a)}if("*"===i.width){if(i.width=parseInt(arguments[p],10),p+=1,S(i.width))throw new TypeError("the argument for * width at position "+p+" is not a number. Value: `"+i.width+"`.");i.width<0&&(i.padRight=!0,i.width=-i.width)}if(r&&"*"===i.precision){if(i.precision=parseInt(arguments[p],10),p+=1,S(i.precision))throw new TypeError("the argument for * precision at position "+p+" is not a number. Value: `"+i.precision+"`.");i.precision<0&&(i.precision=1,r=!1)}switch(i.arg=arguments[p],i.specifier){case"b":case"o":case"x":case"X":case"d":case"i":case"u":r&&(i.padZeros=!1),i.arg=c(i);break;case"s":i.maxWidth=r?i.precision:-1;break;case"c":if(!S(i.arg)){if((o=parseInt(i.arg,10))<0||o>127)throw new Error("invalid character code. Value: "+i.arg);i.arg=S(o)?String(i.arg):x(o)}break;case"e":case"E":case"f":case"F":case"g":case"G":r||(i.precision=6),i.arg=m(i);break;default:throw new Error("invalid specifier: "+i.specifier)}i.maxWidth>=0&&i.arg.length>i.maxWidth&&(i.arg=i.arg.substring(0,i.maxWidth)),i.padZeros?i.arg=n(i.arg,i.width||i.precision,i.padRight):i.width&&(i.arg=k(i.arg,i.width,i.padRight)),l+=i.arg||"",p+=1}return l}var F=/%(?:([1-9]\d*)\$)?([0 +\-#]*)(\*|\d+)?(?:(\.)(\*|\d+)?)?[hlL]?([%A-Za-z])/g;function V(e){var r={mapping:e[1]?parseInt(e[1],10):void 0,flags:e[2],width:e[3],precision:e[5],specifier:e[6]};return"."===e[4]&&void 0===e[5]&&(r.precision="1"),r}function A(e){var r,t,i,n;for(t=[],n=0,i=F.exec(e);i;)(r=e.slice(n,F.lastIndex-i[0].length)).length&&t.push(r),t.push(V(i)),n=F.lastIndex,i=F.exec(e);return(r=e.slice(n)).length&&t.push(r),t}function N(e){return"string"==typeof e}function $(e){var r,t,i;if(!N(e))throw new TypeError($("invalid argument. First argument must be a string. Value: `%s`.",e));for(r=A(e),(t=new Array(arguments.length))[0]=r,i=1;i<t.length;i++)t[i]=arguments[i];return T.apply(null,t)}var j=Object.prototype,O=j.toString,C=j.__defineGetter__,R=j.__defineSetter__,P=j.__lookupGetter__,Z=j.__lookupSetter__,W=function(){try{return e({},"x",{}),!0}catch(e){return!1}}()?r:function(e,r,t){var i,n,a,o;if("object"!=typeof e||null===e||"[object Array]"===O.call(e))throw new TypeError($("invalid argument. First argument must be an object. Value: `%s`.",e));if("object"!=typeof t||null===t||"[object Array]"===O.call(t))throw new TypeError($("invalid argument. Property descriptor must be an object. Value: `%s`.",t));if((n="value"in t)&&(P.call(e,r)||Z.call(e,r)?(i=e.__proto__,e.__proto__=j,delete e[r],e[r]=t.value,e.__proto__=i):e[r]=t.value),a="get"in t,o="set"in t,n&&(a||o))throw new Error("invalid argument. Cannot specify one or more accessors and a value or writable attribute in the property descriptor.");return a&&C&&C.call(e,r,t.get),o&&R&&R.call(e,r,t.set),e};function G(e,r,t){W(e,r,{configurable:!1,enumerable:!1,writable:!1,value:t})}function L(e){return"number"==typeof e}var U="function"==typeof Symbol&&"symbol"==typeof Symbol("foo");function M(){return U&&"symbol"==typeof Symbol.toStringTag}var X=Object.prototype.toString,H=Object.prototype.hasOwnProperty,z="function"==typeof Symbol?Symbol:void 0,Y="function"==typeof z?z.toStringTag:"",q=M()?function(e){var r,t,i,n,a;if(null==e)return X.call(e);t=e[Y],a=Y,r=null!=(n=e)&&H.call(n,a);try{e[Y]=void 0}catch(r){return X.call(e)}return i=X.call(e),r?e[Y]=t:delete e[Y],i}:function(e){return X.call(e)},B=Number,D=B.prototype.toString,J=M();function K(e){return"object"==typeof e&&(e instanceof B||(J?function(e){try{return D.call(e),!0}catch(e){return!1}}(e):"[object Number]"===q(e)))}function Q(e){return L(e)||K(e)}G(Q,"isPrimitive",L),G(Q,"isObject",K);var ee=Number.POSITIVE_INFINITY,re=B.NEGATIVE_INFINITY,te=Math.floor;function ie(e){return e<ee&&e>re&&te(r=e)===r;var r}function ne(e){return L(e)&&ie(e)}function ae(e){return K(e)&&ie(e.valueOf())}function oe(e){return ne(e)||ae(e)}function ce(e){return ne(e)&&e>0}function se(e){return ae(e)&&e.valueOf()>0}function le(e){return ce(e)||se(e)}function pe(e){return e!=e}G(oe,"isPrimitive",ne),G(oe,"isObject",ae),G(le,"isPrimitive",ce),G(le,"isObject",se);var ue=Math.sqrt,fe="function"==typeof Float64Array,ge="function"==typeof Float64Array?Float64Array:null,de="function"==typeof Float64Array?Float64Array:void 0,he=function(){var e,r,t;if("function"!=typeof ge)return!1;try{r=new ge([1,3.14,-3.14,NaN]),t=r,e=(fe&&t instanceof Float64Array||"[object Float64Array]"===q(t))&&1===r[0]&&3.14===r[1]&&-3.14===r[2]&&r[3]!=r[3]}catch(r){e=!1}return e}()?de:function(){throw new Error("not implemented")};function we(e){return"number"==typeof e}function be(e){var r,t="";for(r=0;r<e;r++)t+="0";return t}function ye(e,r,t){var i=!1,n=r-e.length;return n<0||(function(e){return"-"===e[0]}(e)&&(i=!0,e=e.substr(1)),e=t?e+be(n):be(n)+e,i&&(e="-"+e)),e}var ve=String.prototype.toLowerCase,me=String.prototype.toUpperCase;function Ee(e){var r,t,i;switch(e.specifier){case"b":r=2;break;case"o":r=8;break;case"x":case"X":r=16;break;default:r=10}if(t=e.arg,i=parseInt(t,10),!isFinite(i)){if(!we(t))throw new Error("invalid integer. Value: "+t);i=0}return i<0&&("u"===e.specifier||10!==r)&&(i=4294967295+i+1),i<0?(t=(-i).toString(r),e.precision&&(t=ye(t,e.precision,e.padRight)),t="-"+t):(t=i.toString(r),i||e.precision?e.precision&&(t=ye(t,e.precision,e.padRight)):t="",e.sign&&(t=e.sign+t)),16===r&&(e.alternate&&(t="0x"+t),t=e.specifier===me.call(e.specifier)?me.call(t):ve.call(t)),8===r&&e.alternate&&"0"!==t.charAt(0)&&(t="0"+t),t}function ke(e){return"string"==typeof e}var xe=Math.abs,Se=String.prototype.toLowerCase,_e=String.prototype.toUpperCase,Ie=String.prototype.replace,Te=/e\+(\d)$/,Fe=/e-(\d)$/,Ve=/^(\d+)$/,Ae=/^(\d+)e/,Ne=/\.0$/,$e=/\.0*e/,je=/(\..*[^0])0*e/;function Oe(e){var r,t,i=parseFloat(e.arg);if(!isFinite(i)){if(!we(e.arg))throw new Error("invalid floating-point number. Value: "+t);i=e.arg}switch(e.specifier){case"e":case"E":t=i.toExponential(e.precision);break;case"f":case"F":t=i.toFixed(e.precision);break;case"g":case"G":xe(i)<1e-4?((r=e.precision)>0&&(r-=1),t=i.toExponential(r)):t=i.toPrecision(e.precision),e.alternate||(t=Ie.call(t,je,"$1e"),t=Ie.call(t,$e,"e"),t=Ie.call(t,Ne,""));break;default:throw new Error("invalid double notation. Value: "+e.specifier)}return t=Ie.call(t,Te,"e+0$1"),t=Ie.call(t,Fe,"e-0$1"),e.alternate&&(t=Ie.call(t,Ve,"$1."),t=Ie.call(t,Ae,"$1.e")),i>=0&&e.sign&&(t=e.sign+t),t=e.specifier===_e.call(e.specifier)?_e.call(t):Se.call(t)}function Ce(e){var r,t="";for(r=0;r<e;r++)t+=" ";return t}function Re(e,r,t){var i=r-e.length;return i<0?e:e=t?e+Ce(i):Ce(i)+e}var Pe=String.fromCharCode,Ze=isNaN,We=Array.isArray;function Ge(e){var r={};return r.specifier=e.specifier,r.precision=void 0===e.precision?1:e.precision,r.width=e.width,r.flags=e.flags||"",r.mapping=e.mapping,r}function Le(e){var r,t,i,n,a,o,c,s,l;if(!We(e))throw new TypeError("invalid argument. First argument must be an array. Value: `"+e+"`.");for(o="",c=1,s=0;s<e.length;s++)if(ke(i=e[s]))o+=i;else{if(r=void 0!==i.precision,!(i=Ge(i)).specifier)throw new TypeError("invalid argument. Token is missing `specifier` property. Index: `"+s+"`. Value: `"+i+"`.");for(i.mapping&&(c=i.mapping),t=i.flags,l=0;l<t.length;l++)switch(n=t.charAt(l)){case" ":i.sign=" ";break;case"+":i.sign="+";break;case"-":i.padRight=!0,i.padZeros=!1;break;case"0":i.padZeros=t.indexOf("-")<0;break;case"#":i.alternate=!0;break;default:throw new Error("invalid flag: "+n)}if("*"===i.width){if(i.width=parseInt(arguments[c],10),c+=1,Ze(i.width))throw new TypeError("the argument for * width at position "+c+" is not a number. Value: `"+i.width+"`.");i.width<0&&(i.padRight=!0,i.width=-i.width)}if(r&&"*"===i.precision){if(i.precision=parseInt(arguments[c],10),c+=1,Ze(i.precision))throw new TypeError("the argument for * precision at position "+c+" is not a number. Value: `"+i.precision+"`.");i.precision<0&&(i.precision=1,r=!1)}switch(i.arg=arguments[c],i.specifier){case"b":case"o":case"x":case"X":case"d":case"i":case"u":r&&(i.padZeros=!1),i.arg=Ee(i);break;case"s":i.maxWidth=r?i.precision:-1;break;case"c":if(!Ze(i.arg)){if((a=parseInt(i.arg,10))<0||a>127)throw new Error("invalid character code. Value: "+i.arg);i.arg=Ze(a)?String(i.arg):Pe(a)}break;case"e":case"E":case"f":case"F":case"g":case"G":r||(i.precision=6),i.arg=Oe(i);break;default:throw new Error("invalid specifier: "+i.specifier)}i.maxWidth>=0&&i.arg.length>i.maxWidth&&(i.arg=i.arg.substring(0,i.maxWidth)),i.padZeros?i.arg=ye(i.arg,i.width||i.precision,i.padRight):i.width&&(i.arg=Re(i.arg,i.width,i.padRight)),o+=i.arg||"",c+=1}return o}var Ue=/%(?:([1-9]\d*)\$)?([0 +\-#]*)(\*|\d+)?(?:(\.)(\*|\d+)?)?[hlL]?([%A-Za-z])/g;function Me(e){var r={mapping:e[1]?parseInt(e[1],10):void 0,flags:e[2],width:e[3],precision:e[5],specifier:e[6]};return"."===e[4]&&void 0===e[5]&&(r.precision="1"),r}function Xe(e){var r,t,i,n;for(t=[],n=0,i=Ue.exec(e);i;)(r=e.slice(n,Ue.lastIndex-i[0].length)).length&&t.push(r),t.push(Me(i)),n=Ue.lastIndex,i=Ue.exec(e);return(r=e.slice(n)).length&&t.push(r),t}function He(e){return"string"==typeof e}function ze(e){var r,t,i;if(!He(e))throw new TypeError(ze("invalid argument. First argument must be a string. Value: `%s`.",e));for(r=Xe(e),(t=new Array(arguments.length))[0]=r,i=1;i<t.length;i++)t[i]=arguments[i];return Le.apply(null,t)}function Ye(e,r,t){var i,n,a,o,c,s,l,p,u,f,g,d,h,w,b,y,v,m;if(!ce(e))throw new TypeError(ze("invalid argument. First argument must be a positive integer. Value: `%s`.",e));if(i=new he(2*e),v=e-1,s=0,l=0,b=0,w=-1,y=0,arguments.length>1){if(!L(r))throw new TypeError(ze("invalid argument. Second argument must be a number. Value: `%s`.",r));if(!L(t))throw new TypeError(ze("invalid argument. Third argument must be a number. Value: `%s`.",t));return p=r,u=t,k}return p=0,u=0,E;function E(r,t){var E,k,x,S,_;if(0===arguments.length)return 0===y?null:1===y?0:y<e?b/(y-1)/(f*g):b/v/(f*g);if(m=2*(w=(w+1)%e),pe(r)||pe(t))y=e,b=NaN;else{if(y<e)return i[m]=r,i[m+1]=t,s+=(d=r-p)*(r-(p+=d/(y+=1))),l+=(h=t-u)*(c=t-(u+=h/y)),b+=d*c,1===y?0:(f=ue(s/(x=y-1)),g=ue(l/x),b/x/(f*g));if(1===y)return 0;if(pe(i[m])||pe(i[m+1])){for(y=1,p=r,u=t,s=0,l=0,b=0,S=0;S<e;S++)if((_=2*S)!==m){if(E=i[_],k=i[_+1],pe(E)||pe(k)){y=e,b=NaN;break}s+=(d=E-p)*(E-(p+=d/(y+=1))),l+=(h=k-u)*(c=k-(u+=h/y)),b+=d*c}}else!1===pe(b)&&(n=i[m]-p,o=i[m+1]-u,s+=(d=(a=r-p)-n)*(n+(r-(p+=d/e))),l+=(h=(c=t-u)-o)*(o+(t-(u+=h/e))),b+=a*c-n*o-d*h/e)}return i[m]=r,i[m+1]=t,f=ue(s/v),g=ue(l/v),b/v/(f*g)}function k(r,t){var v,E;if(0===arguments.length)return 0===y?null:y<e?b/y/(f*g):b/e/(f*g);if(m=2*(w=(w+1)%e),pe(r)||pe(t))y=e,b=NaN;else{if(y<e)return i[m]=r,i[m+1]=t,l+=(h=t-u)*h,b+=(d=r-p)*h,f=ue((s+=d*d)/(y+=1)),g=ue(l/y),b/y/(f*g);if(pe(i[m])||pe(i[m+1])){for(s=0,l=0,b=0,v=0;v<e;v++)if((E=2*v)!==m){if(pe(i[E])||pe(i[E+1])){y=e,b=NaN;break}d=i[E]-p,s+=d*d,h=i[E+1]-u,l+=h*h,b+=d*h}}else!1===pe(b)&&(n=i[m]-p,a=r-p,o=i[m+1]-u,s+=(a-n)*(a+n),l+=((c=t-u)-o)*(c+o),b+=a*c-n*o)}return i[m]=r,i[m+1]=t,f=ue(s/e),g=ue(l/e),b/e/(f*g)}}function qe(){var e,r=arguments,t=r[0],i="https://stdlib.io/e/"+t+"?";for(e=1;e<r.length;e++)i+="&arg[]="+encodeURIComponent(r[e]);return i}return function(e,r,t){var i;if(!ce(e))throw new TypeError(qe("1It4b,Ht",e));if(arguments.length>1){if(!L(r))throw new TypeError(qe("1It4A,Hr",r));if(!L(t))throw new TypeError(qe("1It4B,Hu",t));i=Ye(e,r,t)}else i=Ye(e);return n;function n(e,r){var t;return 0===arguments.length?null===(t=i())?t:1-t:1-i(e,r)}}},"object"==typeof exports&&"undefined"!=typeof module?module.exports=r():"function"==typeof define&&define.amd?define(r):(e="undefined"!=typeof globalThis?globalThis:e||self).incrmpcorrdist=r();
//# sourceMappingURL=browser.js.map
