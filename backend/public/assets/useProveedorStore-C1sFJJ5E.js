import{o as v,h as i,e as t,i as y,u as f,k as g,d as P,f as h,t as s}from"./index-Bo_1Zqy6.js";const m=P(t,"proveedores"),w=async a=>{try{return(await g(m,a)).id}catch(e){console.error("Error al agregar proveedor:",e)}},b=async a=>v(m,e=>{const r=e.docs.map(c=>{var n,d;const o=c.data(),p=(n=o.datos_fiscales)==null?void 0:n.nombre_comercial,u=(d=o.datos_fiscales)==null?void 0:d.rfc;return{id:c.id,...c.data(),nombre_comercial:p,rfc:u}});a(r)}),D=async(a,e)=>{try{delete e.rfc,delete e.nombre_comercial;const r=i(t,"proveedores",a);await f(r,e)}catch(r){console.error("Error al actualizar proveedor:",r)}},E=async a=>{try{const e=i(t,"proveedores",a);await y(e)}catch(e){console.error("Error al eliminar proveedor:",e)}};let l=null;const _=h((a,e)=>({proveedores:[],loading:!1,getDataProveedor:async()=>(a({loading:!0}),new Promise((r,c)=>{try{l?r(e().proveedores):l=b(o=>{a({proveedores:o}),r(o)})}catch(o){console.error(o),c(o)}finally{a({loading:!1})}})),addProveedor:async r=>{const c=async()=>{try{await w(r)}catch(o){console.error(o)}};s.promise(c(),{loading:"Creando registro...",success:"Registro creado correctamente",error:"Falló al crear el registro."})},editProveedor:async r=>{const c=async()=>{try{await D(r.id,r)}catch(o){console.error(o)}};s.promise(c(),{loading:"Actualizando...",success:"Actualizado correctamente",error:"Falló al eliminar."})},deleteProveedor:async r=>{const c=async()=>{try{await E(r)}catch(o){console.error(o)}};s.promise(c(),{loading:"Eliminando...",success:"Eliminado correctamente",error:"Falló al eliminar."})}}));export{_ as u};
