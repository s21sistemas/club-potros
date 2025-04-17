import{j as a,r as f}from"./index-Bo_1Zqy6.js";import{B as g,a as T}from"./ButtonsModal-rjNumsnu.js";import{B as h}from"./BaseTable-CG0hieRc.js";import{M as x}from"./ModalDelete-C1zEzITC.js";import{u as p,a as c,I as b}from"./InputField-Bgiqn5r0.js";import{u as n}from"./useTemporadasStore-CRYStg82.js";import{C as y}from"./CancelButtonModal-C6qEQDgJ.js";import"./dayjs.min-C6mA835O.js";import"./chevron-right-BHG4n6AS.js";import"./players-CfGsYTWQ.js";import"./es-BFm7WDBc.js";import"./square-pen-C_HaDAF2.js";import"./eye-DdfdWaaB.js";import"./categorias-DKNPRs5G.js";const j=()=>{const t=p(e=>e.modalType),d=p(e=>e.formData),r=p(e=>e.closeModal),m=n(e=>e.loading),s=n(e=>e.temporadas),o=n(e=>e.getDataTemporadas),l=n(e=>e.addTemporada),i=n(e=>e.editTemporada),u=n(e=>e.deleteTemporada);return{temporadas:s,loading:m,getDataTemporadas:o,handleSubmit:e=>{e.preventDefault(),t==="add"?l(d):t==="edit"&&i(d),r()},handleDelete:e=>{u(e),r()}}},F={generalFields:[{required:!0,type:"text",label:"Nombre de temporada *",name:"temporada"},{required:!0,type:"select",label:"Estado de la temporada *",name:"estado_temporada",opcSelect:[{value:"",label:"Selecciona una opción"},{value:"Activa",label:"Activa"},{value:"Finalizada",label:"Finalizada"}]},{required:!0,type:"date",label:"Fecha de inicio *",name:"fecha_inicio"},{required:!0,type:"date",label:"Fecha de fin *",name:"fecha_fin"}]},v=()=>{const{view:t,formData:d,handleInputChange:r}=c();return a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6",children:F.generalFields.map(({type:m,label:s,name:o,required:l,opcSelect:i})=>a.jsx(b,{type:m,label:s,name:o,required:l,value:d[o]||"",opcSelect:i,onChange:r,disabled:t,classInput:"md:col-span-3"},o))}),t?a.jsx(y,{}):a.jsx(g,{})]})},D=[{key:"temporada",name:"Temporada"},{key:"estado_temporada",name:"Estado"},{key:"date_inicio",name:"Fecha de inicio"},{key:"date_fin",name:"Fecha de fin"}];function R(){const{modalType:t,currentItem:d}=c(),{temporadas:r,loading:m,getDataTemporadas:s,handleSubmit:o,handleDelete:l}=j();return f.useEffect(()=>{(async()=>await s())()},[s]),a.jsxs("div",{className:"md:p-4 bg-gray-100",children:[a.jsx(h,{columns:D,data:r,title:"Gestión de temporadas",loading:m}),(t==="add"||t==="edit"||t==="view")&&a.jsx(T,{handleSubmit:o,Inputs:a.jsx(v,{})}),t==="delete"&&d&&a.jsx(x,{handleDelete:l})]})}export{R as default};
