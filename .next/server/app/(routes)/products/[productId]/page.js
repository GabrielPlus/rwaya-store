(()=>{var e={};e.id=916,e.ids=[916],e.modules={10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},19121:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},55511:e=>{"use strict";e.exports=require("crypto")},33873:e=>{"use strict";e.exports=require("path")},79551:e=>{"use strict";e.exports=require("url")},77598:e=>{"use strict";e.exports=require("node:crypto")},73024:e=>{"use strict";e.exports=require("node:fs")},76760:e=>{"use strict";e.exports=require("node:path")},16581:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>i.a,__next_app__:()=>c,pages:()=>p,routeModule:()=>u,tree:()=>l});var s=r(70260),o=r(28203),n=r(25155),i=r.n(n),a=r(67292),d={};for(let e in a)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(d[e]=()=>a[e]);r.d(t,d);let l=["",{children:["(routes)",{children:["products",{children:["[productId]",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,16116)),"E:\\rwaya-store\\app\\(routes)\\products\\[productId]\\page.tsx"]}]},{}]},{}]},{"not-found":[()=>Promise.resolve().then(r.t.bind(r,19937,23)),"next/dist/client/components/not-found-error"],forbidden:[()=>Promise.resolve().then(r.t.bind(r,69116,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(r.t.bind(r,41485,23)),"next/dist/client/components/unauthorized-error"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,46055))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(r.bind(r,16814)),"E:\\rwaya-store\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,19937,23)),"next/dist/client/components/not-found-error"],forbidden:[()=>Promise.resolve().then(r.t.bind(r,69116,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(r.t.bind(r,41485,23)),"next/dist/client/components/unauthorized-error"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,46055))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],p=["E:\\rwaya-store\\app\\(routes)\\products\\[productId]\\page.tsx"],c={require:r,loadChunk:()=>Promise.resolve()},u=new s.AppPageRouteModule({definition:{kind:o.RouteKind.APP_PAGE,page:"/(routes)/products/[productId]/page",pathname:"/products/[productId]",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:l}})},87176:(e,t,r)=>{Promise.resolve().then(r.bind(r,59899)),Promise.resolve().then(r.bind(r,66494)),Promise.resolve().then(r.bind(r,37945))},74024:(e,t,r)=>{Promise.resolve().then(r.bind(r,45685)),Promise.resolve().then(r.bind(r,1730)),Promise.resolve().then(r.bind(r,32945))},16116:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>p});var s=r(62740);let o=async e=>(await fetch(`https://digihippo-admin.vercel.app/api/327d42b2-4f67-48f7-b3d0-6e3aa5b3e2d8/products/${e}`)).json();var n=r(50436),i=r(59899),a=r(66494),d=r(77816),l=r(88208);let p=async({params:e})=>{let{productId:t}=await e;if(!t)return(0,s.jsx)("div",{children:"Product not found"});let r=await o(t);if(!r)return(0,s.jsx)("div",{children:"Product not found"});let p=r.category?.id?await (0,n.A)({categoryId:r.category.id}):[];return(0,s.jsx)("div",{className:"bg-white",children:(0,s.jsx)(l.A,{children:(0,s.jsxs)("div",{className:"px-4 py-10 sm:px-6 lg:px-8",children:[(0,s.jsxs)("div",{className:"lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8",children:[r.images?.length>0?(0,s.jsx)(i.default,{images:r.images}):(0,s.jsx)("p",{children:"No images available"}),(0,s.jsx)("div",{className:"mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0",children:(0,s.jsx)(a.default,{data:r})})]}),(0,s.jsx)("hr",{className:"my-10"}),p.length>0?(0,s.jsx)(d.A,{title:"Related Items",items:p}):(0,s.jsx)("p",{className:"text-center text-gray-500",children:"No related items found."})]})})})}},59899:(e,t,r)=>{"use strict";r.d(t,{default:()=>s});let s=(0,r(46760).registerClientReference)(function(){throw Error("Attempted to call the default export of \"E:\\\\rwaya-store\\\\components\\\\gallery\\\\index.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"E:\\rwaya-store\\components\\gallery\\index.tsx","default")},66494:(e,t,r)=>{"use strict";r.d(t,{default:()=>s});let s=(0,r(46760).registerClientReference)(function(){throw Error("Attempted to call the default export of \"E:\\\\rwaya-store\\\\components\\\\info.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"E:\\rwaya-store\\components\\info.tsx","default")},77816:(e,t,r)=>{"use strict";r.d(t,{A:()=>i});var s=r(62740),o=r(62796),n=r(37945);let i=({title:e,items:t})=>(0,s.jsxs)("div",{className:"space-y-4",children:[(0,s.jsx)("h3",{className:"font-bold text-3xl",children:e}),0===t.length&&(0,s.jsx)(o.A,{}),(0,s.jsx)("div",{className:"flex overflow-x-auto sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 scrollbar-hide",children:t.map(e=>(0,s.jsx)("div",{className:"flex-shrink-0 w-64 sm:w-auto",children:(0,s.jsx)(n.default,{data:e})},e.id))})]})}};var t=require("../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[680,395,77,425,73],()=>r(16581));module.exports=s})();