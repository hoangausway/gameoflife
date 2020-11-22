var gameoflife;gameoflife=(()=>{"use strict";var e,r,t,n,o,a,i,l,f,u,s,d={9207:(e,r,t)=>{var n={"./Gol":()=>Promise.all([t.e(199),t.e(104),t.e(529),t.e(74)]).then((()=>()=>t(5074)))},o=(e,r)=>(t.R=r,r=t.o(n,e)?n[e]():Promise.resolve().then((()=>{throw new Error('Module "'+e+'" does not exist in container.')})),t.R=void 0,r),a=(e,r)=>{if(t.S){var n=t.S.default,o="default";if(n&&n!==e)throw new Error("Container initialization failed as it has already been initialized with a different share scope");return t.S[o]=e,t.I(o,r)}};t.d(r,{get:()=>o,init:()=>a})}},h={};function p(e){if(h[e])return h[e].exports;var r=h[e]={exports:{}};return d[e](r,r.exports,p),r.exports}return p.m=d,p.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return p.d(r,{a:r}),r},p.d=(e,r)=>{for(var t in r)p.o(r,t)&&!p.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:r[t]})},p.f={},p.e=e=>Promise.all(Object.keys(p.f).reduce(((r,t)=>(p.f[t](e,r),r)),[])),p.u=e=>e+".js",p.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),e={},r="gameoflife:",p.l=(t,n,o)=>{if(e[t])e[t].push(n);else{var a,i;if(void 0!==o)for(var l=document.getElementsByTagName("script"),f=0;f<l.length;f++){var u=l[f];if(u.getAttribute("src")==t||u.getAttribute("data-webpack")==r+o){a=u;break}}a||(i=!0,(a=document.createElement("script")).charset="utf-8",a.timeout=120,p.nc&&a.setAttribute("nonce",p.nc),a.setAttribute("data-webpack",r+o),a.src=t),e[t]=[n];var s=(r,n)=>{a.onerror=a.onload=null,clearTimeout(d);var o=e[t];if(delete e[t],a.parentNode&&a.parentNode.removeChild(a),o&&o.forEach((e=>e(n))),r)return r(n)},d=setTimeout(s.bind(null,void 0,{type:"timeout",target:a}),12e4);a.onerror=s.bind(null,a.onerror),a.onload=s.bind(null,a.onload),i&&document.head.appendChild(a)}},p.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{p.S={};var e={},r={};p.I=(t,n)=>{n||(n=[]);var o=r[t];if(o||(o=r[t]={}),!(n.indexOf(o)>=0)){if(n.push(o),e[t])return e[t];p.o(p.S,t)||(p.S[t]={});var a=p.S[t],i="gameoflife",l=(e,r,t)=>{var n=a[e]=a[e]||{},o=n[r];(!o||!o.loaded&&i>o.from)&&(n[r]={get:t,from:i})},f=[];switch(t){case"default":l("react-dom","16.14.0",(()=>Promise.all([p.e(935),p.e(104)]).then((()=>()=>p(3935))))),l("react-select","3.1.0",(()=>Promise.all([p.e(151),p.e(104),p.e(871),p.e(697)]).then((()=>()=>p(1151))))),l("react","16.14.0",(()=>p.e(294).then((()=>()=>p(7294))))),l("rxjs","6.6.3",(()=>Promise.all([p.e(199),p.e(192)]).then((()=>()=>p(7192))))),l("styled-components","4.4.1",(()=>Promise.all([p.e(4),p.e(104),p.e(581)]).then((()=>()=>p(4)))))}return e[t]=f.length?Promise.all(f).then((()=>e[t]=1)):1}}})(),p.p="https://gameoflife-motionary.netlify.app/",t=e=>{var r=e=>e.split(".").map((e=>+e==e?+e:e)),t=/^([^-+]+)?(?:-([^+]+))?(?:\+(.+))?$/.exec(e),n=t[1]?r(t[1]):[];return t[2]&&(n.length++,n.push.apply(n,r(t[2]))),t[3]&&(n.push([]),n.push.apply(n,r(t[3]))),n},n=(e,r)=>{e=t(e),r=t(r);for(var n=0;;){if(n>=e.length)return n<r.length&&"u"!=(typeof r[n])[0];var o=e[n],a=(typeof o)[0];if(n>=r.length)return"u"==a;var i=r[n],l=(typeof i)[0];if(a!=l)return"o"==a&&"n"==l||"s"==l||"u"==a;if("o"!=a&&"u"!=a&&o!=i)return o<i;n++}},o=(e,r)=>{if(0 in e){r=t(r);var n=e[0],a=n<0;a&&(n=-n-1);for(var i=0,l=1,f=!0;;l++,i++){var u,s,d=l<e.length?(typeof e[l])[0]:"";if(i>=r.length||"o"==(s=(typeof(u=r[i]))[0]))return!f||("u"==d?l>n&&!a:""==d!=a);if("u"==s){if(!f||"u"!=d)return!1}else if(f)if(d==s)if(l<=n){if(u!=e[l])return!1}else{if(a?u>e[l]:u<e[l])return!1;u!=e[l]&&(f=!1)}else if("s"!=d&&"n"!=d){if(a||l<=n)return!1;f=!1,l--}else{if(l<=n||s<d!=a)return!1;f=!1}else"s"!=d&&"n"!=d&&(f=!1,l--)}}var h=[],p=h.pop.bind(h);for(i=1;i<e.length;i++){var c=e[i];h.push(1==c?p()|p():2==c?p()&p():c?o(c,r):!p())}return!!p()},a=(e,r,t)=>{var a=e[r];return(r=Object.keys(a).reduce(((e,r)=>!o(t,r)||e&&!n(e,r)?e:r),0))&&a[r]},i=e=>(e.loaded=1,e.get()),l=(e=>function(r,t,n,o){var a=p.I(r);return a&&a.then?a.then(e.bind(e,r,p.S[r],t,n,o)):e(0,p.S[r],t,n,o)})(((e,r,t,n,o)=>{var l=r&&p.o(r,t)&&a(r,t,n);return l?i(l):o()})),f={},u={6104:()=>l("default","react",[1,16,13,0],(()=>p.e(294).then((()=>()=>p(7294))))),5871:()=>l("default","react-dom",[1,16,13,0],(()=>p.e(935).then((()=>()=>p(3935))))),1626:()=>l("default","react-select",[1,3,1,0],(()=>Promise.all([p.e(151),p.e(871)]).then((()=>()=>p(1151))))),8770:()=>l("default","styled-components",[1,4,4,0],(()=>p.e(4).then((()=>()=>p(4))))),8929:()=>l("default","rxjs",[1,6,5,3],(()=>p.e(192).then((()=>()=>p(7192)))))},s={104:[6104],529:[1626,8770,8929],871:[5871]},p.f.consumes=(e,r)=>{p.o(s,e)&&s[e].forEach((e=>{if(p.o(f,e))return r.push(f[e]);var t=r=>{f[e]=0,d[e]=t=>{delete h[e],t.exports=r()}},n=r=>{delete f[e],d[e]=t=>{throw delete h[e],r}};try{var o=u[e]();o.then?r.push(f[e]=o.then(t).catch(n)):t(o)}catch(e){n(e)}}))},(()=>{var e={62:0};p.f.j=(r,t)=>{var n=p.o(e,r)?e[r]:void 0;if(0!==n)if(n)t.push(n[2]);else if(/^(104|871)$/.test(r))e[r]=0;else{var o=new Promise(((t,o)=>{n=e[r]=[t,o]}));t.push(n[2]=o);var a=p.p+p.u(r),i=new Error;p.l(a,(t=>{if(p.o(e,r)&&(0!==(n=e[r])&&(e[r]=void 0),n)){var o=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;i.message="Loading chunk "+r+" failed.\n("+o+": "+a+")",i.name="ChunkLoadError",i.type=o,i.request=a,n[1](i)}}),"chunk-"+r)}};var r=self.webpackChunkgameoflife=self.webpackChunkgameoflife||[],t=r.push.bind(r);r.push=r=>{for(var n,o,[a,i,l]=r,f=0,u=[];f<a.length;f++)o=a[f],p.o(e,o)&&e[o]&&u.push(e[o][0]),e[o]=0;for(n in i)p.o(i,n)&&(p.m[n]=i[n]);for(l&&l(p),t(r);u.length;)u.shift()()}})(),p(9207)})();
//# sourceMappingURL=remoteEntry.js.map