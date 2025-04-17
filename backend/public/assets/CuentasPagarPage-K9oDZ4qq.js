import{q as h,w as v,o as C,h as x,e as g,u as y,d as P,f as j,t as I,j as e,r as _}from"./index-Bo_1Zqy6.js";import{B as S}from"./BaseTable-CG0hieRc.js";import{b as D}from"./almacen-4C00n9e6.js";import{d as f}from"./dayjs.min-C6mA835O.js";import{c as w}from"./compras-BueScjSQ.js";import{u,a as b,I as c}from"./InputField-Bgiqn5r0.js";import{B as M,a as q}from"./ButtonsModal-rjNumsnu.js";import{C as B}from"./CancelButtonModal-C6qEQDgJ.js";import{A as F}from"./AlertaCard-Y7DSOmzU.js";import{u as k}from"./useReports-feVwTBxo.js";import"./chevron-right-BHG4n6AS.js";import"./players-CfGsYTWQ.js";import"./es-BFm7WDBc.js";import"./square-pen-C_HaDAF2.js";import"./eye-DdfdWaaB.js";import"./categorias-DKNPRs5G.js";import"./useBankStore-D-aMFBbt.js";import"./useTemporadasStore-CRYStg82.js";import"./useProveedorStore-C1sFJJ5E.js";const O=P(g,"ordenes_compra"),T=async r=>{const a=h(O,v("estatus","==","pendiente"));return C(a,t=>{const n=t.docs.map(o=>({id:o.id,...o.data(),proveedor:o.data().proveedorId.label,articulo:o.data().articuloId.label,banco:o.data().bancoId.label,fecha:f.unix(o.data().fecha.seconds).format("DD/MM/YYYY")}));r(n)})},Y=async(r,a)=>{try{delete a.proveedor,delete a.articulo,delete a.banco,delete a.fecha;const t=x(g,"ordenes_compra",r);if(await y(t,a),a.estatus==="pagada"){await D(a.articuloId,a.cantidad_articulos);const n={proveedorId:a.proveedorId,articuloId:a.articuloId,bancoId:a.bancoId,concepto:"Compra de artículos",cantidad_articulos:a.cantidad_articulos,precio_articulo:a.precio_articulo,subtotal:a.subtotal,total:a.total,fecha:f().format("DD/MM/YYYY"),metodo_pago:a.metodo_pago};await w(n)}}catch(t){console.error("Error al actualizar orden de compra:",t)}};let p=null;const d=j((r,a)=>({cuentasPagar:[],loading:!1,getDataCuentasPagar:async()=>(r({loading:!0}),new Promise((t,n)=>{try{p?t(a().cuentasPagar):p=T(o=>{r({cuentasPagar:o}),t(o)})}catch(o){console.error(o),n(o)}finally{r({loading:!1})}})),editOrdenCompra:async t=>{const n=async()=>{try{await Y(t.id,t)}catch(o){console.error(o)}};I.promise(n(),{loading:"Actualizando...",success:"Actualizado correctamente",error:"Falló al eliminar."})}})),E=()=>{const r=u(s=>s.modalType),a=u(s=>s.formData),t=u(s=>s.closeModal),n=d(s=>s.loading),o=d(s=>s.cuentasPagar),l=d(s=>s.editOrdenCompra),i=d(s=>s.getDataCuentasPagar);return{cuentasPagar:o,loading:n,getDataCuentasPagar:i,handleSubmit:s=>{s.preventDefault(),r==="edit"&&l(a),t()}}},m={opcSelectPago:[{value:"",label:"Selecciona una opción"},{value:"pendiente",label:"Pendiente"},{value:"pagada",label:"Pagada"},{value:"cancelada",label:"Cancelada"}],opcSelectMetodo:[{value:"",label:"Selecciona una opción"},{value:"transferencia bancaria",label:"Transferencia bancaria"},{value:"tarjeta",label:"Tarjeta de crédito/débito"},{value:"efectivo",label:"Efectivo"},{value:"cheques",label:" Cheques"}]},R=()=>{const{view:r,formData:a,handleInputChange:t}=b();return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6",children:[e.jsx(c,{type:"select",label:"Estatus de la orden",name:"estatus",required:!0,value:a.estatus||"",onChange:t,disabled:r,classInput:"md:col-span-6",opcSelect:m.opcSelectPago}),a.estatus==="pagada"&&e.jsxs(e.Fragment,{children:[e.jsx(c,{type:"select",label:"Método de pago",name:"metodo_pago",required:!0,value:a.metodo_pago||"",onChange:t,disabled:r,classInput:"md:col-span-6",opcSelect:m.opcSelectMetodo}),e.jsx(c,{type:"text",label:"Total a pagar",name:"total",required:!0,value:a.total||"",onChange:t,disabled:!0,classInput:"md:col-span-6"})]})]}),r?e.jsx(B,{}):e.jsx(M,{})]})},A=()=>{const{generarReporteCuentasPagar:r,loadOptionsBancos:a,loadOptionsProveedor:t,handleInputChange:n,formReport:o}=k(),l=i=>{i.preventDefault(),r(o)};return e.jsxs("form",{className:"grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6 mt-3",onSubmit:l,children:[e.jsx(c,{label:"Fecha inicio",id:"fecha_inicio",name:"fecha_inicio",type:"date",required:!0,value:o.fecha_inicio,onChange:n,classInput:"md:col-span-3"}),e.jsx(c,{label:"Fecha fin",id:"fecha_fin",name:"fecha_fin",type:"date",required:!0,value:o.fecha_fin,onChange:n,classInput:"md:col-span-3"}),e.jsx(c,{label:"Bancos",id:"bancoId",name:"bancoId",type:"async",required:!0,value:o.bancoId,onChange:n,loadOptions:a,classInput:"md:col-span-3"}),e.jsx(c,{label:"Proveedor",id:"proveedorId",name:"proveedorId",type:"async",required:!0,value:o.proveedorId,onChange:n,loadOptions:t,classInput:"md:col-span-3"}),e.jsx("div",{className:"md:col-span-6 sm:col-span-6",children:e.jsx("button",{className:"rounded-sm text-white font-medium py-2 px-3 bg-[#3674B5] hover:bg-[#486483] transition-all cursor-pointer",children:"Generar reporte"})})]})},N=()=>e.jsxs("div",{className:"mt-6 bg-white p-4 rounded-xl mx-auto",children:[e.jsx(F,{text:"Generarador de reporte"}),e.jsx(A,{})]}),z=[{key:"proveedor",name:"Proveedor"},{key:"banco",name:"Banco"},{key:"articulo",name:"Artículo"},{key:"cantidad_articulos",name:"Cantidad"},{key:"total",name:"Total"},{key:"estatus",name:"Estatus"},{key:"fecha",name:"Fecha de orden"}];function la(){const{modalType:r}=b(),{cuentasPagar:a,loading:t,getDataCuentasPagar:n,handleSubmit:o}=E();return _.useEffect(()=>{(async()=>await n())()},[n]),e.jsxs("div",{className:"md:p-4 bg-gray-100",children:[e.jsx(S,{columns:z,data:a,title:"Cuentas a pagar",loading:t}),(r==="add"||r==="edit"||r==="view")&&e.jsx(q,{handleSubmit:o,Inputs:e.jsx(R,{})}),e.jsx(N,{})]})}export{la as default};
