import{o as m,h as d,e as s,i as p,u as y,k as f,d as u,f as g,t as c}from"./index-Bo_1Zqy6.js";import{d as n}from"./dayjs.min-C6mA835O.js";const l=u(s,"temporadas"),h=async o=>{try{return(await f(l,o)).id}catch(r){console.error("Error al agregar temporada:",r)}},T=async o=>m(l,r=>{const a=r.docs.map(e=>({id:e.id,...e.data(),date_inicio:n(e.data().fecha_inicio).format("DD/MM/YYYY"),date_fin:n(e.data().fecha_fin).format("DD/MM/YYYY")}));o(a)}),D=async(o,r)=>{try{delete r.date_inicio,delete r.date_fin;const a=d(s,"temporadas",o);await y(a,r)}catch(a){console.error("Error al actualizar temporada:",a)}},Y=async o=>{try{const r=d(s,"temporadas",o);await p(r)}catch(r){console.error("Error al eliminar temporada:",r)}};let i=null;const E=g((o,r)=>({temporadas:[],loading:!1,getDataTemporadas:async()=>(o({loading:!0}),new Promise((a,e)=>{try{i?a(r().temporadas):i=T(t=>{o({temporadas:t}),a(t)})}catch(t){console.error(t),e(t)}finally{o({loading:!1})}})),addTemporada:async a=>{const e=async()=>{try{await h(a)}catch(t){console.error(t)}};c.promise(e(),{loading:"Creando registro...",success:"Registro creado correctamente",error:"Falló al crear el registro."})},editTemporada:async a=>{const e=async()=>{try{await D(a.id,a)}catch(t){console.error(t)}};c.promise(e(),{loading:"Actualizando...",success:"Actualizado correctamente",error:"Falló al eliminar."})},deleteTemporada:async a=>{const e=async()=>{try{await Y(a)}catch(t){console.error(t)}};c.promise(e(),{loading:"Eliminando...",success:"Eliminado correctamente",error:"Falló al eliminar."})}}));export{E as u};
