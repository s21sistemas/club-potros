import{c as d,s as c,r as m,j as e,P as n,Q as u}from"./index-Bo_1Zqy6.js";import{E as x}from"./eye-DdfdWaaB.js";/**
 * @license lucide-react v0.483.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h=[["path",{d:"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",key:"ct8e1f"}],["path",{d:"M14.084 14.158a3 3 0 0 1-4.242-4.242",key:"151rxh"}],["path",{d:"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",key:"13bj9a"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]],b=d("EyeOff",h),p=()=>{const{login:t}=c(),[a,o]=m.useState(!1),l=async r=>{r.preventDefault();const i=new FormData(r.target),s=Object.fromEntries(i);localStorage.setItem("email",s.email),localStorage.setItem("mensaje",s.password),await t(s.email,s.password)};return e.jsxs("form",{onSubmit:l,className:"space-y-4",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsx("label",{htmlFor:"email",className:"block text-sm font-medium text-gray-700",children:"Email"}),e.jsx("div",{className:"mt-1",children:e.jsx("input",{id:"email",name:"email",type:"email",placeholder:"your@email.com",required:!0,className:"shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border disabled:bg-gray-100"})})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("label",{htmlFor:"password",className:"block text-sm font-medium text-gray-700",children:"Password"}),e.jsxs("div",{className:"relative",children:[e.jsx("input",{id:"password",name:"password",type:a?"text":"password",placeholder:"••••••••",className:"shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border disabled:bg-gray-100",required:!0}),e.jsx("button",{type:"button",className:"absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700",onClick:()=>o(!a),children:a?e.jsx(b,{size:18}):e.jsx(x,{size:18})})]})]}),e.jsx("button",{type:"submit",className:"w-full py-2 bg-primary text-white font-semibold rounded-md cursor-pointer hover:bg-primary-dark transition-all",children:"Iniciar sesión"})]})};function g(){return e.jsxs(e.Fragment,{children:[e.jsx(n,{richColors:!0,position:"bottom-right"}),e.jsx("div",{className:"flex min-h-screen items-center justify-center bg-primary-dark p-4",children:e.jsxs("div",{className:"mx-auto w-full max-w-md rounded-lg bg-white p-6 shadow-md",children:[e.jsx("div",{className:"mb-6 flex justify-center",children:e.jsx("div",{className:"h-24 w-24 overflow-hidden rounded-full bg-primary/10",children:e.jsx("img",{src:u,alt:"Logo del club potros",className:"h-full w-full object-cover"})})}),e.jsx("h2",{className:"mb-6 text-center text-2xl font-bold text-gray-900",children:"Iniciar sesión"}),e.jsx(p,{})]})})]})}export{g as default};
