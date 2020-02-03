(this["webpackJsonpreact-hook-validation"]=this["webpackJsonpreact-hook-validation"]||[]).push([[0],{59:function(e,t,a){e.exports=a(71)},64:function(e,t,a){},70:function(e,t,a){},71:function(e,t,a){"use strict";a.r(t);var n,r=a(0),o=a.n(r),c=a(8),l=a.n(c),i=(a(64),a(20)),s=a.n(i),u=a(29),m=a(107),p=a(108),h=a(105),d=a(36),E=a(109),f=a(110),y=a(111),v=a(112),b=a(113),x=a(31),g=a.n(x),w=a(19),k=a(49),j=a.n(k),O=a(101),C=a(115),S=a(106),P=a(50),A=a.n(P),N=function(e){var t=Object(r.useRef)(),a=o.a.useState(!1),n=Object(w.a)(a,2),c=n[0],l=n[1],i=o.a.useState(!1),s=Object(w.a)(i,2),u=s[0],m=s[1],p=function(e,t){"clickaway"!==t&&l(!1)};return o.a.createElement("div",null,o.a.createElement("h5",null,e.title.toUpperCase()),o.a.createElement("pre",{style:{padding:"1em"}},o.a.createElement(O.a,{title:"Copy to Clipboard",onClick:function(){t.current.focus(),t.current.select();try{document.execCommand("copy"),m("Copied to clipboard")}catch(e){console.error(e),m("Failed to copy")}finally{l(!0)}}},o.a.createElement(j.a,{color:"action",style:{color:"white"}})),o.a.createElement("code",null,e.text)),o.a.createElement("input",{style:{opacity:0},ref:t,defaultValue:e.text}),o.a.createElement(C.a,{anchorOrigin:{vertical:"bottom",horizontal:"center"},open:c,autoHideDuration:6e3,onClose:p,message:u,action:o.a.createElement(o.a.Fragment,null,o.a.createElement(O.a,{color:"secondary",size:"small",onClick:p},"Great!"),o.a.createElement(S.a,{size:"small","aria-label":"close",color:"inherit",onClick:p},o.a.createElement(A.a,{fontSize:"small"})))}))},R=a(51),I=a(9),V="REQUIRED",F="ASYNC",q="RANGE",z="LENGTH",G="REGEX",B=(n={},Object(I.a)(n,V,"Value is required"),Object(I.a)(n,F,"Error running custom validator with {value}"),Object(I.a)(n,q,"Value exceeds {max} or is less than {min}"),Object(I.a)(n,z,"Length exceeds {max} or is less than {min}"),Object(I.a)(n,G,"The value entered ({value}) does not maches the pattern ({pattern})"),n),D=function(e,t){return{type:F,errorMessage:t||B[F],asyncFunction:e}},M=function(e,t,a){return{type:z,errorMessage:a||B[z],min:e,max:t}},T=function(e,t){if(!e)throw new Error(L(e,t))},W=function(e,t){var a=String(e).length;if(a<(t.min||0)||a>t.max)throw new Error(L(e,t))},U=function(e,t){if(e<t.min||e>t.max)throw new Error(L(e,t))},H=function(e,t){if(!new RegExp(t.pattern).test(e))throw new Error(L(e,t))},J=function(){var e=Object(u.a)(s.a.mark((function e(t,a){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.asyncFunction.call(void 0,t,a);case 2:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}(),L=function(e,t){var a=t.errorMessage;return Object.keys(Object(R.a)({},t,{value:e})).forEach((function(e){a=a.replace("{".concat(e,"}"),t[e])})),a},Q=(a(70),Object(m.a)((function(e){return{root:{flexGrow:1,backgroundColor:"#f5f5f5",padding:e.spacing(2)},paper:{padding:e.spacing(2),textAlign:"left",color:e.palette.text.primary},paperCenter:{padding:e.spacing(2),textAlign:"center",color:e.palette.text.primary},inline:{display:"block"},addTripButton:{position:"fixed",right:"15px",bottom:"15px"}}})));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(o.a.createElement((function(){var e,t=Q(),a=function(){var e=Object(u.a)(s.a.mark((function e(t,a){var n,r;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://jsonplaceholder.typicode.com/photos");case 2:return n=e.sent,e.next=5,n.json();case 5:if(r=e.sent,t==r.length){e.next=8;break}throw new Error("Custom Async error when value is not equal to "+r.length+" which is the response array length!");case 8:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}(),n=function(e,t){if("[object Array]"!==Object.prototype.toString.call(e))throw new Error("validators must be an Array");if(!e.length)throw new Error("validators should not be empty Array");var a=Object(r.useState)([]),n=Object(w.a)(a,2),o=n[0],c=n[1],l=Object(r.useState)(!1),i=Object(w.a)(l,2),m=i[0],p=i[1];Object(r.useEffect)((function(){p(!0),h(t).then((function(e){p(!1),c(e)}))}),[]);var h=function(){var t=Object(u.a)(s.a.mark((function t(a){var n,r,o;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n=[],r=0;case 2:if(!(r<e.length)){t.next=35;break}o="",t.prev=4,t.t0=e[r].type,t.next=t.t0===V?8:t.t0===z?11:t.t0===q?14:t.t0===F?17:t.t0===G?20:23;break;case 8:return t.next=10,Promise.resolve(T(a,e[r]));case 10:return t.abrupt("break",24);case 11:return t.next=13,Promise.resolve(W(a,e[r]));case 13:return t.abrupt("break",24);case 14:return t.next=16,Promise.resolve(U(a,e[r]));case 16:return t.abrupt("break",24);case 17:return t.next=19,J(a,e[r]);case 19:return t.abrupt("break",24);case 20:return t.next=22,Promise.resolve(H(a,e[r]));case 22:case 23:return t.abrupt("break",24);case 24:t.next=29;break;case 26:t.prev=26,t.t1=t.catch(4),o=t.t1.message;case 29:return t.prev=29,o&&n.push(o),t.finish(29);case 32:r++,t.next=2;break;case 35:return t.abrupt("return",Promise.resolve(n));case 36:case"end":return t.stop()}}),t,null,[[4,26,29,32]])})));return function(e){return t.apply(this,arguments)}}();return{error:o,onChange:function(e,t){return function(a){var n=t?t(a):a.target.value;e(a),p(!0),h(n).then((function(e){p(!1),c(e)}))}},pending:m}}([{type:V,errorMessage:e||B[V]},M(2,5),D(a)]),c=n.error,l=n.onChange;n.pending;return o.a.createElement(p.a,{container:!0,spacing:4},o.a.createElement(p.a,{item:!0,xs:12},o.a.createElement(h.a,{className:t.paperCenter},o.a.createElement(d.a,{gutterBottom:!0,variant:"h2",color:"textPrimary"},"React Input Validation"),o.a.createElement(d.a,{variant:"h5",color:"textPrimary"},"Implement Sync and Async validations using simple hooks! \ud83c\udf89\ud83c\udf89"))),o.a.createElement(p.a,{item:!0,xs:12,md:6},o.a.createElement(h.a,{className:t.paper},o.a.createElement(d.a,{variant:"h4",color:"textPrimary"},"Features"),o.a.createElement(E.a,null,o.a.createElement(f.a,null,o.a.createElement(y.a,null,o.a.createElement(g.a,null)),o.a.createElement(v.a,{primary:"Easy to use hook API, Specify a list of validations that should run"})),o.a.createElement(f.a,null,o.a.createElement(y.a,null,o.a.createElement(g.a,null)),o.a.createElement(v.a,{primary:"Supports Asynchronous validations as well.",secondary:o.a.createElement(d.a,{component:"span",variant:"body2",color:"textSecondary",className:t.inline},"you can have a combination of both sync and async validators")})),o.a.createElement(f.a,null,o.a.createElement(y.a,null,o.a.createElement(g.a,null)),o.a.createElement(v.a,{primary:"Returns a list of formatted error messages for user feedback",secondary:o.a.createElement(d.a,{component:"span",variant:"body2",color:"textSecondary",className:t.inline},"Specify fetch size, limit and scroller to monitor fetch behaviour.")})),o.a.createElement(f.a,null,o.a.createElement(y.a,null,o.a.createElement(g.a,null)),o.a.createElement(v.a,{primary:"Out of the box support for required, length, range, regular expression and custom async validations"}))))),o.a.createElement(p.a,{item:!0,xs:12,md:6},o.a.createElement(h.a,{className:t.paper},o.a.createElement(N,{title:"Install",text:"npm install react-validation-hook"}),o.a.createElement(N,{title:"Usage",text:'\n                  import {\n                    useValidator,\n                    requiredValidation,\n                    lengthValidation,\n                    asyncValidation\n                  } from "react-validation-hook";'}))),o.a.createElement(p.a,{item:!0,container:!0,xs:12,md:12},o.a.createElement(p.a,{item:!0,xs:12,md:6},o.a.createElement(h.a,{className:t.paper},o.a.createElement(d.a,{variant:"h4",color:"textPrimary"},"Demo"),o.a.createElement(E.a,null,o.a.createElement(f.a,null,o.a.createElement(v.a,{primary:"Required validation"})),o.a.createElement(f.a,null,o.a.createElement(v.a,{primary:"Asynchronous validation, which involves calling https://jsonplaceholder.typicode.com/photos and verifying the number or photos returned!"})),o.a.createElement(f.a,null,o.a.createElement(v.a,{primary:"Input length validation"}))))),o.a.createElement(p.a,{item:!0,xs:12,md:6},o.a.createElement(h.a,{className:t.paper},o.a.createElement(b.a,{fullWidth:!0,variant:"outlined",label:"First Name",onChange:l((function(e){})),helperText:c.length?c.map((function(e){return o.a.createElement("div",null,e)})):"",error:!!c.length})))),o.a.createElement(p.a,{item:!0,xs:12,md:12},o.a.createElement(h.a,{className:t.paper},o.a.createElement(d.a,{variant:"h4",color:"textPrimary"},"Documentation"),o.a.createElement(d.a,{color:"textPrimary"},"WIP"))))}),null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[59,1,2]]]);
//# sourceMappingURL=main.9e6fe2e1.chunk.js.map