// Copyright (c) 2024 The Stdlib Authors. License is Apache-2.0: http://www.apache.org/licenses/LICENSE-2.0
/// <reference types="./mod.d.ts" />
var e="function"==typeof Object.defineProperty?Object.defineProperty:null;var r=Object.defineProperty;function i(e){return"number"==typeof e}function t(e){var r,i="";for(r=0;r<e;r++)i+="0";return i}function a(e,r,i){var a=!1,n=r-e.length;return n<0||(function(e){return"-"===e[0]}(e)&&(a=!0,e=e.substr(1)),e=i?e+t(n):t(n)+e,a&&(e="-"+e)),e}var n=String.prototype.toLowerCase,o=String.prototype.toUpperCase;function s(e){var r,t,s;switch(e.specifier){case"b":r=2;break;case"o":r=8;break;case"x":case"X":r=16;break;default:r=10}if(t=e.arg,s=parseInt(t,10),!isFinite(s)){if(!i(t))throw new Error("invalid integer. Value: "+t);s=0}return s<0&&("u"===e.specifier||10!==r)&&(s=4294967295+s+1),s<0?(t=(-s).toString(r),e.precision&&(t=a(t,e.precision,e.padRight)),t="-"+t):(t=s.toString(r),s||e.precision?e.precision&&(t=a(t,e.precision,e.padRight)):t="",e.sign&&(t=e.sign+t)),16===r&&(e.alternate&&(t="0x"+t),t=e.specifier===o.call(e.specifier)?o.call(t):n.call(t)),8===r&&e.alternate&&"0"!==t.charAt(0)&&(t="0"+t),t}function c(e){return"string"==typeof e}var p=Math.abs,l=String.prototype.toLowerCase,u=String.prototype.toUpperCase,f=String.prototype.replace,g=/e\+(\d)$/,d=/e-(\d)$/,h=/^(\d+)$/,w=/^(\d+)e/,v=/\.0$/,b=/\.0*e/,m=/(\..*[^0])0*e/;function y(e){var r,t,a=parseFloat(e.arg);if(!isFinite(a)){if(!i(e.arg))throw new Error("invalid floating-point number. Value: "+t);a=e.arg}switch(e.specifier){case"e":case"E":t=a.toExponential(e.precision);break;case"f":case"F":t=a.toFixed(e.precision);break;case"g":case"G":p(a)<1e-4?((r=e.precision)>0&&(r-=1),t=a.toExponential(r)):t=a.toPrecision(e.precision),e.alternate||(t=f.call(t,m,"$1e"),t=f.call(t,b,"e"),t=f.call(t,v,""));break;default:throw new Error("invalid double notation. Value: "+e.specifier)}return t=f.call(t,g,"e+0$1"),t=f.call(t,d,"e-0$1"),e.alternate&&(t=f.call(t,h,"$1."),t=f.call(t,w,"$1.e")),a>=0&&e.sign&&(t=e.sign+t),t=e.specifier===u.call(e.specifier)?u.call(t):l.call(t)}function E(e){var r,i="";for(r=0;r<e;r++)i+=" ";return i}function k(e,r,i){var t=r-e.length;return t<0?e:e=i?e+E(t):E(t)+e}var x=String.fromCharCode,S=isNaN,V=Array.isArray;function F(e){var r={};return r.specifier=e.specifier,r.precision=void 0===e.precision?1:e.precision,r.width=e.width,r.flags=e.flags||"",r.mapping=e.mapping,r}function T(e){var r,i,t,n,o,p,l,u,f;if(!V(e))throw new TypeError("invalid argument. First argument must be an array. Value: `"+e+"`.");for(p="",l=1,u=0;u<e.length;u++)if(c(t=e[u]))p+=t;else{if(r=void 0!==t.precision,!(t=F(t)).specifier)throw new TypeError("invalid argument. Token is missing `specifier` property. Index: `"+u+"`. Value: `"+t+"`.");for(t.mapping&&(l=t.mapping),i=t.flags,f=0;f<i.length;f++)switch(n=i.charAt(f)){case" ":t.sign=" ";break;case"+":t.sign="+";break;case"-":t.padRight=!0,t.padZeros=!1;break;case"0":t.padZeros=i.indexOf("-")<0;break;case"#":t.alternate=!0;break;default:throw new Error("invalid flag: "+n)}if("*"===t.width){if(t.width=parseInt(arguments[l],10),l+=1,S(t.width))throw new TypeError("the argument for * width at position "+l+" is not a number. Value: `"+t.width+"`.");t.width<0&&(t.padRight=!0,t.width=-t.width)}if(r&&"*"===t.precision){if(t.precision=parseInt(arguments[l],10),l+=1,S(t.precision))throw new TypeError("the argument for * precision at position "+l+" is not a number. Value: `"+t.precision+"`.");t.precision<0&&(t.precision=1,r=!1)}switch(t.arg=arguments[l],t.specifier){case"b":case"o":case"x":case"X":case"d":case"i":case"u":r&&(t.padZeros=!1),t.arg=s(t);break;case"s":t.maxWidth=r?t.precision:-1;break;case"c":if(!S(t.arg)){if((o=parseInt(t.arg,10))<0||o>127)throw new Error("invalid character code. Value: "+t.arg);t.arg=S(o)?String(t.arg):x(o)}break;case"e":case"E":case"f":case"F":case"g":case"G":r||(t.precision=6),t.arg=y(t);break;default:throw new Error("invalid specifier: "+t.specifier)}t.maxWidth>=0&&t.arg.length>t.maxWidth&&(t.arg=t.arg.substring(0,t.maxWidth)),t.padZeros?t.arg=a(t.arg,t.width||t.precision,t.padRight):t.width&&(t.arg=k(t.arg,t.width,t.padRight)),p+=t.arg||"",l+=1}return p}var I=/%(?:([1-9]\d*)\$)?([0 +\-#]*)(\*|\d+)?(?:(\.)(\*|\d+)?)?[hlL]?([%A-Za-z])/g;function $(e){var r={mapping:e[1]?parseInt(e[1],10):void 0,flags:e[2],width:e[3],precision:e[5],specifier:e[6]};return"."===e[4]&&void 0===e[5]&&(r.precision="1"),r}function _(e){var r,i,t,a;for(i=[],a=0,t=I.exec(e);t;)(r=e.slice(a,I.lastIndex-t[0].length)).length&&i.push(r),i.push($(t)),a=I.lastIndex,t=I.exec(e);return(r=e.slice(a)).length&&i.push(r),i}function A(e){return"string"==typeof e}function N(e){var r,i;if(!A(e))throw new TypeError(N("invalid argument. First argument must be a string. Value: `%s`.",e));for(r=[_(e)],i=1;i<arguments.length;i++)r.push(arguments[i]);return T.apply(null,r)}var C=Object.prototype,j=C.toString,R=C.__defineGetter__,O=C.__defineSetter__,Z=C.__lookupGetter__,P=C.__lookupSetter__;var W=function(){try{return e({},"x",{}),!0}catch(e){return!1}}()?r:function(e,r,i){var t,a,n,o;if("object"!=typeof e||null===e||"[object Array]"===j.call(e))throw new TypeError(N("invalid argument. First argument must be an object. Value: `%s`.",e));if("object"!=typeof i||null===i||"[object Array]"===j.call(i))throw new TypeError(N("invalid argument. Property descriptor must be an object. Value: `%s`.",i));if((a="value"in i)&&(Z.call(e,r)||P.call(e,r)?(t=e.__proto__,e.__proto__=C,delete e[r],e[r]=i.value,e.__proto__=t):e[r]=i.value),n="get"in i,o="set"in i,a&&(n||o))throw new Error("invalid argument. Cannot specify one or more accessors and a value or writable attribute in the property descriptor.");return n&&R&&R.call(e,r,i.get),o&&O&&O.call(e,r,i.set),e};function G(e,r,i){W(e,r,{configurable:!1,enumerable:!1,writable:!1,value:i})}function L(e){return"number"==typeof e}var U="function"==typeof Symbol&&"symbol"==typeof Symbol("foo");function X(){return U&&"symbol"==typeof Symbol.toStringTag}var M=Object.prototype.toString;var z=Object.prototype.hasOwnProperty;var Y="function"==typeof Symbol?Symbol:void 0,q="function"==typeof Y?Y.toStringTag:"";var B=X()?function(e){var r,i,t,a,n;if(null==e)return M.call(e);i=e[q],n=q,r=null!=(a=e)&&z.call(a,n);try{e[q]=void 0}catch(r){return M.call(e)}return t=M.call(e),r?e[q]=i:delete e[q],t}:function(e){return M.call(e)},D=Number,H=D.prototype.toString;var J=X();function K(e){return"object"==typeof e&&(e instanceof D||(J?function(e){try{return H.call(e),!0}catch(e){return!1}}(e):"[object Number]"===B(e)))}function Q(e){return L(e)||K(e)}G(Q,"isPrimitive",L),G(Q,"isObject",K);var ee=Number.POSITIVE_INFINITY,re=D.NEGATIVE_INFINITY,ie=Math.floor;function te(e){return e<ee&&e>re&&ie(r=e)===r;var r}function ae(e){return L(e)&&te(e)}function ne(e){return K(e)&&te(e.valueOf())}function oe(e){return ae(e)||ne(e)}function se(e){return ae(e)&&e>0}function ce(e){return ne(e)&&e.valueOf()>0}function pe(e){return se(e)||ce(e)}function le(e){return e!=e}G(oe,"isPrimitive",ae),G(oe,"isObject",ne),G(pe,"isPrimitive",se),G(pe,"isObject",ce);var ue=Math.sqrt,fe="function"==typeof Float64Array;var ge="function"==typeof Float64Array?Float64Array:null;var de="function"==typeof Float64Array?Float64Array:void 0;var he=function(){var e,r,i;if("function"!=typeof ge)return!1;try{r=new ge([1,3.14,-3.14,NaN]),i=r,e=(fe&&i instanceof Float64Array||"[object Float64Array]"===B(i))&&1===r[0]&&3.14===r[1]&&-3.14===r[2]&&r[3]!=r[3]}catch(r){e=!1}return e}()?de:function(){throw new Error("not implemented")};function we(e){return"number"==typeof e}function ve(e){var r,i="";for(r=0;r<e;r++)i+="0";return i}function be(e,r,i){var t=!1,a=r-e.length;return a<0||(function(e){return"-"===e[0]}(e)&&(t=!0,e=e.substr(1)),e=i?e+ve(a):ve(a)+e,t&&(e="-"+e)),e}var me=String.prototype.toLowerCase,ye=String.prototype.toUpperCase;function Ee(e){var r,i,t;switch(e.specifier){case"b":r=2;break;case"o":r=8;break;case"x":case"X":r=16;break;default:r=10}if(i=e.arg,t=parseInt(i,10),!isFinite(t)){if(!we(i))throw new Error("invalid integer. Value: "+i);t=0}return t<0&&("u"===e.specifier||10!==r)&&(t=4294967295+t+1),t<0?(i=(-t).toString(r),e.precision&&(i=be(i,e.precision,e.padRight)),i="-"+i):(i=t.toString(r),t||e.precision?e.precision&&(i=be(i,e.precision,e.padRight)):i="",e.sign&&(i=e.sign+i)),16===r&&(e.alternate&&(i="0x"+i),i=e.specifier===ye.call(e.specifier)?ye.call(i):me.call(i)),8===r&&e.alternate&&"0"!==i.charAt(0)&&(i="0"+i),i}function ke(e){return"string"==typeof e}var xe=Math.abs,Se=String.prototype.toLowerCase,Ve=String.prototype.toUpperCase,Fe=String.prototype.replace,Te=/e\+(\d)$/,Ie=/e-(\d)$/,$e=/^(\d+)$/,_e=/^(\d+)e/,Ae=/\.0$/,Ne=/\.0*e/,Ce=/(\..*[^0])0*e/;function je(e){var r,i,t=parseFloat(e.arg);if(!isFinite(t)){if(!we(e.arg))throw new Error("invalid floating-point number. Value: "+i);t=e.arg}switch(e.specifier){case"e":case"E":i=t.toExponential(e.precision);break;case"f":case"F":i=t.toFixed(e.precision);break;case"g":case"G":xe(t)<1e-4?((r=e.precision)>0&&(r-=1),i=t.toExponential(r)):i=t.toPrecision(e.precision),e.alternate||(i=Fe.call(i,Ce,"$1e"),i=Fe.call(i,Ne,"e"),i=Fe.call(i,Ae,""));break;default:throw new Error("invalid double notation. Value: "+e.specifier)}return i=Fe.call(i,Te,"e+0$1"),i=Fe.call(i,Ie,"e-0$1"),e.alternate&&(i=Fe.call(i,$e,"$1."),i=Fe.call(i,_e,"$1.e")),t>=0&&e.sign&&(i=e.sign+i),i=e.specifier===Ve.call(e.specifier)?Ve.call(i):Se.call(i)}function Re(e){var r,i="";for(r=0;r<e;r++)i+=" ";return i}function Oe(e,r,i){var t=r-e.length;return t<0?e:e=i?e+Re(t):Re(t)+e}var Ze=String.fromCharCode,Pe=isNaN,We=Array.isArray;function Ge(e){var r={};return r.specifier=e.specifier,r.precision=void 0===e.precision?1:e.precision,r.width=e.width,r.flags=e.flags||"",r.mapping=e.mapping,r}function Le(e){var r,i,t,a,n,o,s,c,p;if(!We(e))throw new TypeError("invalid argument. First argument must be an array. Value: `"+e+"`.");for(o="",s=1,c=0;c<e.length;c++)if(ke(t=e[c]))o+=t;else{if(r=void 0!==t.precision,!(t=Ge(t)).specifier)throw new TypeError("invalid argument. Token is missing `specifier` property. Index: `"+c+"`. Value: `"+t+"`.");for(t.mapping&&(s=t.mapping),i=t.flags,p=0;p<i.length;p++)switch(a=i.charAt(p)){case" ":t.sign=" ";break;case"+":t.sign="+";break;case"-":t.padRight=!0,t.padZeros=!1;break;case"0":t.padZeros=i.indexOf("-")<0;break;case"#":t.alternate=!0;break;default:throw new Error("invalid flag: "+a)}if("*"===t.width){if(t.width=parseInt(arguments[s],10),s+=1,Pe(t.width))throw new TypeError("the argument for * width at position "+s+" is not a number. Value: `"+t.width+"`.");t.width<0&&(t.padRight=!0,t.width=-t.width)}if(r&&"*"===t.precision){if(t.precision=parseInt(arguments[s],10),s+=1,Pe(t.precision))throw new TypeError("the argument for * precision at position "+s+" is not a number. Value: `"+t.precision+"`.");t.precision<0&&(t.precision=1,r=!1)}switch(t.arg=arguments[s],t.specifier){case"b":case"o":case"x":case"X":case"d":case"i":case"u":r&&(t.padZeros=!1),t.arg=Ee(t);break;case"s":t.maxWidth=r?t.precision:-1;break;case"c":if(!Pe(t.arg)){if((n=parseInt(t.arg,10))<0||n>127)throw new Error("invalid character code. Value: "+t.arg);t.arg=Pe(n)?String(t.arg):Ze(n)}break;case"e":case"E":case"f":case"F":case"g":case"G":r||(t.precision=6),t.arg=je(t);break;default:throw new Error("invalid specifier: "+t.specifier)}t.maxWidth>=0&&t.arg.length>t.maxWidth&&(t.arg=t.arg.substring(0,t.maxWidth)),t.padZeros?t.arg=be(t.arg,t.width||t.precision,t.padRight):t.width&&(t.arg=Oe(t.arg,t.width,t.padRight)),o+=t.arg||"",s+=1}return o}var Ue=/%(?:([1-9]\d*)\$)?([0 +\-#]*)(\*|\d+)?(?:(\.)(\*|\d+)?)?[hlL]?([%A-Za-z])/g;function Xe(e){var r={mapping:e[1]?parseInt(e[1],10):void 0,flags:e[2],width:e[3],precision:e[5],specifier:e[6]};return"."===e[4]&&void 0===e[5]&&(r.precision="1"),r}function Me(e){var r,i,t,a;for(i=[],a=0,t=Ue.exec(e);t;)(r=e.slice(a,Ue.lastIndex-t[0].length)).length&&i.push(r),i.push(Xe(t)),a=Ue.lastIndex,t=Ue.exec(e);return(r=e.slice(a)).length&&i.push(r),i}function ze(e){return"string"==typeof e}function Ye(e){var r,i;if(!ze(e))throw new TypeError(Ye("invalid argument. First argument must be a string. Value: `%s`.",e));for(r=[Me(e)],i=1;i<arguments.length;i++)r.push(arguments[i]);return Le.apply(null,r)}function qe(e,r,i){var t,a,n,o,s,c,p,l,u,f,g,d,h,w,v,b,m,y;if(!se(e))throw new TypeError(Ye("invalid argument. First argument must be a positive integer. Value: `%s`.",e));if(t=new he(2*e),m=e-1,c=0,p=0,v=0,w=-1,b=0,arguments.length>1){if(!L(r))throw new TypeError(Ye("invalid argument. Second argument must be a number. Value: `%s`.",r));if(!L(i))throw new TypeError(Ye("invalid argument. Third argument must be a number. Value: `%s`.",i));return l=r,u=i,k}return l=0,u=0,E;function E(r,i){var E,k,x,S,V;if(0===arguments.length)return 0===b?null:1===b?0:b<e?v/(b-1)/(f*g):v/m/(f*g);if(y=2*(w=(w+1)%e),le(r)||le(i))b=e,v=NaN;else{if(b<e)return t[y]=r,t[y+1]=i,c+=(d=r-l)*(r-(l+=d/(b+=1))),p+=(h=i-u)*(s=i-(u+=h/b)),v+=d*s,1===b?0:(f=ue(c/(x=b-1)),g=ue(p/x),v/x/(f*g));if(1===b)return 0;if(le(t[y])||le(t[y+1])){for(b=1,l=r,u=i,c=0,p=0,v=0,S=0;S<e;S++)if((V=2*S)!==y){if(E=t[V],k=t[V+1],le(E)||le(k)){b=e,v=NaN;break}c+=(d=E-l)*(E-(l+=d/(b+=1))),p+=(h=k-u)*(s=k-(u+=h/b)),v+=d*s}}else!1===le(v)&&(a=t[y]-l,o=t[y+1]-u,c+=(d=(n=r-l)-a)*(a+(r-(l+=d/e))),p+=(h=(s=i-u)-o)*(o+(i-(u+=h/e))),v+=n*s-a*o-d*h/e)}return t[y]=r,t[y+1]=i,f=ue(c/m),g=ue(p/m),v/m/(f*g)}function k(r,i){var m,E;if(0===arguments.length)return 0===b?null:b<e?v/b/(f*g):v/e/(f*g);if(y=2*(w=(w+1)%e),le(r)||le(i))b=e,v=NaN;else{if(b<e)return t[y]=r,t[y+1]=i,p+=(h=i-u)*h,v+=(d=r-l)*h,f=ue((c+=d*d)/(b+=1)),g=ue(p/b),v/b/(f*g);if(le(t[y])||le(t[y+1])){for(c=0,p=0,v=0,m=0;m<e;m++)if((E=2*m)!==y){if(le(t[E])||le(t[E+1])){b=e,v=NaN;break}d=t[E]-l,c+=d*d,h=t[E+1]-u,p+=h*h,v+=d*h}}else!1===le(v)&&(a=t[y]-l,n=r-l,o=t[y+1]-u,c+=(n-a)*(n+a),p+=((s=i-u)-o)*(s+o),v+=n*s-a*o)}return t[y]=r,t[y+1]=i,f=ue(c/e),g=ue(p/e),v/e/(f*g)}}function Be(e){return"number"==typeof e}function De(e){var r,i="";for(r=0;r<e;r++)i+="0";return i}function He(e,r,i){var t=!1,a=r-e.length;return a<0||(function(e){return"-"===e[0]}(e)&&(t=!0,e=e.substr(1)),e=i?e+De(a):De(a)+e,t&&(e="-"+e)),e}var Je=String.prototype.toLowerCase,Ke=String.prototype.toUpperCase;function Qe(e){var r,i,t;switch(e.specifier){case"b":r=2;break;case"o":r=8;break;case"x":case"X":r=16;break;default:r=10}if(i=e.arg,t=parseInt(i,10),!isFinite(t)){if(!Be(i))throw new Error("invalid integer. Value: "+i);t=0}return t<0&&("u"===e.specifier||10!==r)&&(t=4294967295+t+1),t<0?(i=(-t).toString(r),e.precision&&(i=He(i,e.precision,e.padRight)),i="-"+i):(i=t.toString(r),t||e.precision?e.precision&&(i=He(i,e.precision,e.padRight)):i="",e.sign&&(i=e.sign+i)),16===r&&(e.alternate&&(i="0x"+i),i=e.specifier===Ke.call(e.specifier)?Ke.call(i):Je.call(i)),8===r&&e.alternate&&"0"!==i.charAt(0)&&(i="0"+i),i}function er(e){return"string"==typeof e}var rr=Math.abs,ir=String.prototype.toLowerCase,tr=String.prototype.toUpperCase,ar=String.prototype.replace,nr=/e\+(\d)$/,or=/e-(\d)$/,sr=/^(\d+)$/,cr=/^(\d+)e/,pr=/\.0$/,lr=/\.0*e/,ur=/(\..*[^0])0*e/;function fr(e){var r,i,t=parseFloat(e.arg);if(!isFinite(t)){if(!Be(e.arg))throw new Error("invalid floating-point number. Value: "+i);t=e.arg}switch(e.specifier){case"e":case"E":i=t.toExponential(e.precision);break;case"f":case"F":i=t.toFixed(e.precision);break;case"g":case"G":rr(t)<1e-4?((r=e.precision)>0&&(r-=1),i=t.toExponential(r)):i=t.toPrecision(e.precision),e.alternate||(i=ar.call(i,ur,"$1e"),i=ar.call(i,lr,"e"),i=ar.call(i,pr,""));break;default:throw new Error("invalid double notation. Value: "+e.specifier)}return i=ar.call(i,nr,"e+0$1"),i=ar.call(i,or,"e-0$1"),e.alternate&&(i=ar.call(i,sr,"$1."),i=ar.call(i,cr,"$1.e")),t>=0&&e.sign&&(i=e.sign+i),i=e.specifier===tr.call(e.specifier)?tr.call(i):ir.call(i)}function gr(e){var r,i="";for(r=0;r<e;r++)i+=" ";return i}function dr(e,r,i){var t=r-e.length;return t<0?e:e=i?e+gr(t):gr(t)+e}var hr=String.fromCharCode,wr=isNaN,vr=Array.isArray;function br(e){var r={};return r.specifier=e.specifier,r.precision=void 0===e.precision?1:e.precision,r.width=e.width,r.flags=e.flags||"",r.mapping=e.mapping,r}function mr(e){var r,i,t,a,n,o,s,c,p;if(!vr(e))throw new TypeError("invalid argument. First argument must be an array. Value: `"+e+"`.");for(o="",s=1,c=0;c<e.length;c++)if(er(t=e[c]))o+=t;else{if(r=void 0!==t.precision,!(t=br(t)).specifier)throw new TypeError("invalid argument. Token is missing `specifier` property. Index: `"+c+"`. Value: `"+t+"`.");for(t.mapping&&(s=t.mapping),i=t.flags,p=0;p<i.length;p++)switch(a=i.charAt(p)){case" ":t.sign=" ";break;case"+":t.sign="+";break;case"-":t.padRight=!0,t.padZeros=!1;break;case"0":t.padZeros=i.indexOf("-")<0;break;case"#":t.alternate=!0;break;default:throw new Error("invalid flag: "+a)}if("*"===t.width){if(t.width=parseInt(arguments[s],10),s+=1,wr(t.width))throw new TypeError("the argument for * width at position "+s+" is not a number. Value: `"+t.width+"`.");t.width<0&&(t.padRight=!0,t.width=-t.width)}if(r&&"*"===t.precision){if(t.precision=parseInt(arguments[s],10),s+=1,wr(t.precision))throw new TypeError("the argument for * precision at position "+s+" is not a number. Value: `"+t.precision+"`.");t.precision<0&&(t.precision=1,r=!1)}switch(t.arg=arguments[s],t.specifier){case"b":case"o":case"x":case"X":case"d":case"i":case"u":r&&(t.padZeros=!1),t.arg=Qe(t);break;case"s":t.maxWidth=r?t.precision:-1;break;case"c":if(!wr(t.arg)){if((n=parseInt(t.arg,10))<0||n>127)throw new Error("invalid character code. Value: "+t.arg);t.arg=wr(n)?String(t.arg):hr(n)}break;case"e":case"E":case"f":case"F":case"g":case"G":r||(t.precision=6),t.arg=fr(t);break;default:throw new Error("invalid specifier: "+t.specifier)}t.maxWidth>=0&&t.arg.length>t.maxWidth&&(t.arg=t.arg.substring(0,t.maxWidth)),t.padZeros?t.arg=He(t.arg,t.width||t.precision,t.padRight):t.width&&(t.arg=dr(t.arg,t.width,t.padRight)),o+=t.arg||"",s+=1}return o}var yr=/%(?:([1-9]\d*)\$)?([0 +\-#]*)(\*|\d+)?(?:(\.)(\*|\d+)?)?[hlL]?([%A-Za-z])/g;function Er(e){var r={mapping:e[1]?parseInt(e[1],10):void 0,flags:e[2],width:e[3],precision:e[5],specifier:e[6]};return"."===e[4]&&void 0===e[5]&&(r.precision="1"),r}function kr(e){var r,i,t,a;for(i=[],a=0,t=yr.exec(e);t;)(r=e.slice(a,yr.lastIndex-t[0].length)).length&&i.push(r),i.push(Er(t)),a=yr.lastIndex,t=yr.exec(e);return(r=e.slice(a)).length&&i.push(r),i}function xr(e){return"string"==typeof e}function Sr(e){var r,i,t;if(!xr(e))throw new TypeError(Sr("invalid argument. First argument must be a string. Value: `%s`.",e));for(r=kr(e),(i=new Array(arguments.length))[0]=r,t=1;t<i.length;t++)i[t]=arguments[t];return mr.apply(null,i)}function Vr(e,r,i){var t;if(!se(e))throw new TypeError(Sr("invalid argument. First argument must be a positive integer. Value: `%s`.",e));if(arguments.length>1){if(!L(r))throw new TypeError(Sr("invalid argument. Second argument must be a number. Value: `%s`.",r));if(!L(i))throw new TypeError(Sr("invalid argument. Third argument must be a number. Value: `%s`.",i));t=qe(e,r,i)}else t=qe(e);return a;function a(e,r){var i;return 0===arguments.length?null===(i=t())?i:1-i:1-t(e,r)}}export{Vr as default};
//# sourceMappingURL=mod.js.map
