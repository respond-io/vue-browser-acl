"use strict";function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}Object.defineProperty(exports,"__esModule",{value:!0});var t="GLOBAL_RULE",r=function(e){return"boolean"==typeof e||void 0===e||"function"==typeof e&&""===e.name},n=function(){function t(){var e=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).strict,r=void 0!==e&&e;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this.strict=r,this.rules=new Map,this.policies=new Map,this.registry=new WeakMap}var n;return(n=[{key:"rule",value:function(e,t){var n=this,o=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];r(t)&&(o=void 0===t||t,t="GLOBAL_RULE");var i=this.subjectMapper(t),a=Array.isArray(e)?e:[e];return a.forEach((function(e){var t=n.rules.get(i)||{};t[e]=o,n.rules.set(i,t)})),this}},{key:"policy",value:function(e,t){var r="function"==typeof e?new e:e,n=this.subjectMapper(t);return this.policies.set(n,r),this}},{key:"register",value:function(e,t){return this.registry.set(e,t),this}},{key:"can",value:function(e,t,r){r=void 0===r?"GLOBAL_RULE":r;var n=this.subjectMapper(r),o=this.policies.get(n),i=o||this.rules.get(n);if(void 0===i){if(this.strict)throw new Error('Unknown subject "'.concat(n,'"'));return!1}for(var a=arguments.length,s=new Array(a>3?a-3:0),c=3;c<a;c++)s[c-3]=arguments[c];if(o&&"function"==typeof o.beforeAll){var l=o.beforeAll.apply(o,[t,e,r,n].concat(s));if(void 0!==l)return l}if("function"==typeof i[t])return Boolean(i[t].apply(i,[e,r,n].concat(s)));if(this.strict&&void 0===i[t])throw new Error('Unknown verb "'.concat(t,'"'));return Boolean(i[t])}},{key:"some",value:function(e,t,r){for(var n=this,o=arguments.length,i=new Array(o>3?o-3:0),a=3;a<o;a++)i[a-3]=arguments[a];return r.some((function(r){return n.can.apply(n,[e,t,r].concat(i))}))}},{key:"every",value:function(e,t,r){for(var n=this,o=arguments.length,i=new Array(o>3?o-3:0),a=3;a<o;a++)i[a-3]=arguments[a];return r.every((function(r){return n.can.apply(n,[e,t,r].concat(i))}))}},{key:"mixin",value:function(e){var t=this;return e.prototype.can=function(){return t.can.apply(t,[this].concat(Array.prototype.slice.call(arguments)))},e.prototype.can.every=function(){return t.every.apply(t,[this].concat(Array.prototype.slice.call(arguments)))},e.prototype.can.some=function(){return t.some.apply(t,[this].concat(Array.prototype.slice.call(arguments)))},this}},{key:"subjectMapper",value:function(e){if("string"==typeof e)return e;var t="function"==typeof e;return t&&this.registry.has(e)?this.registry.get(e):!t&&this.registry.has(e.constructor)?this.registry.get(e.constructor):t?e.name:e.constructor.name}},{key:"reset",value:function(){return this.rules=new Map,this.policies=new Map,this.registry=new WeakMap,this}},{key:"removeRules",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,r=this.subjectMapper(e);if(this.rules.has(r)){if(t){var n=this.rules.get(r);return delete n[t],this}this.rules.delete(r)}return this}},{key:"removePolicy",value:function(e){var t=this.subjectMapper(e);return this.policies.delete(t),this}},{key:"removeAll",value:function(e){return this.removeRules(e),this.removePolicy(e),this}}])&&e(t.prototype,n),t}(),index={install:function(e,r,o,i={}){const a="function"==typeof r?r:()=>r,s=Boolean(i.strict);i=Object.assign({acl:{strict:s},assumeGlobal:!s,caseMode:!0,debug:!1,directive:"can",failRoute:"/",helper:!0,strict:!1},i);let c=o;if("function"==typeof o&&o(c=new n(i.acl)),c.router=function(e){i.router=e;const r=(e,t,...r)=>t&&c.can(a(),e,t,...r)||!t&&!i.strict,n=(e,n,o)=>{let a=null;const s=e.reduce((e,s)=>e.then(e=>{if(!0!==e)return e;a=s.fail;const c="function"==typeof s.can?s.can(n,o,r):Promise.resolve(r(...(e=>{const[r=null,n=(i.assumeGlobal?t:null)]=(e.can||"").split(" ");return[r,n]})(s)));if(i.strict&&!(c instanceof Promise))throw new Error("$route.meta.can must return a promise in strict mode");return c}).catch(e=>(i.debug&&console.error(e),!1)),Promise.resolve(!0));return s.getFail=()=>a,s};e.beforeEach((e,t,r)=>{const o=e.matched.filter(e=>e.meta&&e.meta.can).map(e=>e.meta),a=n(o,e,t);a.then(e=>{if(!0===e)return r();const n="$from"===a.getFail()?t.path:a.getFail();r(n||i.failRoute)})})},i.router&&c.router(i.router),e.directive(i.directive,(function(e,r,n){const o=r.modifiers.disable?"disable":"hide";let s,l,u,p;if(l=r.arg,Array.isArray(r.value)&&r.expression.startsWith("[")?[s,u,p]=r.modifiers.global?arrayToGlobalExprTpl(r):arrayToExprTpl(r):"string"==typeof r.value?[s,u,p]=stringToExprTpl(r,n,i):l&&"object"==typeof r.value?(s=l,u=r.value,p=[]):void 0===r.value&&!r.modifiers.global&&i.assumeGlobal&&(s=l,u=t,p=[]),i.assumeGlobal&&!u&&(u=t,p=p||[],s=s||l),!s||!u)throw new Error("Missing verb or subject");const f=(r.modifiers.some?"some":r.modifiers.every&&"every")||"can",y=c[f](a(),s,u,...p),v=r.modifiers.not;e.disabled=!1,e.readOnly=!1,(y&&v||!y&&!v)&&("hide"===o?commentNode(e,n):"disable"===o?e.disabled=!0:"readonly"===o&&(e.readOnly=!0))})),i.helper){const t=`$${i.directive}`;e.prototype[t]=function(){return c.can(a(),...arguments)},e.prototype[t].not=function(){return!c.can(a(),...arguments)},e.prototype[t].every=function(){return c.every(a(),...arguments)},e.prototype[t].some=function(){return c.some(a(),...arguments)}}}};function commentNode(e,t){const r=document.createComment(" ");Object.defineProperty(r,"setAttribute",{value:()=>void 0}),t.text=" ",t.elm=r,t.isComment=!0,t.tag=void 0,t.data.directives=void 0,t.componentInstance&&(t.componentInstance.$el=r),e.parentNode&&e.parentNode.replaceChild(r,e)}const arrayToExprTpl=({arg:e,value:t})=>[e||t[0],e?t[0]:t[1],e?t.slice(1):t.slice(2)],arrayToGlobalExprTpl=({arg:e,value:r})=>[e||r[0],t,e?r:r.slice(1)],stringToExprTpl=({arg:e,value:t,modifiers:r},n,o)=>{let[i,a]=e?[e,t]:t.split(" ");if(a&&r.global)throw new Error("You cannot provide subject and use global modifier at the same time");return"string"==typeof a&&o.caseMode&&a[0].match(/[a-z]/)&&(a=n.context[a]),[i,a,[]]};exports.default=index;
//# sourceMappingURL=vue-browser-acl.common.js.map
