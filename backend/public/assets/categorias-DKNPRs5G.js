import{q as d,w as r,p as m,o as g,h as _,e as f,i as h,T as i,u as p,k as D,d as y}from"./index-Bo_1Zqy6.js";import{d as n}from"./dayjs.min-C6mA835O.js";const s=y(f,"categorias"),C=async e=>{try{return e.fecha_inicio_filter=i.fromDate(new Date(e.fecha_inicio)),e.fecha_fin_filter=i.fromDate(new Date(e.fecha_fin)),(await D(s,e)).id}catch(a){console.error("Error al agregar categoria:",a)}},b=async e=>g(s,a=>{const t=a.docs.map(o=>({id:o.id,...o.data(),date_inicio:n(o.data().fecha_inicio).format("DD/MM/YYYY"),date_fin:n(o.data().fecha_fin).format("DD/MM/YYYY")}));e(t)}),M=async e=>{const a=d(s,r("temporadaId","==",e));return(await m(a)).docs.map(c=>({value:c.data().nombre_categoria,label:c.data().nombre_categoria}))},q=async(e,a,t)=>{const o=n(a,"YYYY-MM-DD").toDate(),c=d(s,r("temporadaId","==",e),r("sexo","==",t),r("fecha_inicio_filter","<=",o),r("fecha_fin_filter",">=",o));return(await m(c)).docs.map(l=>l.data().nombre_categoria)},R=async(e,a)=>{try{delete a.date_inicio,delete a.date_fin,a.fecha_inicio_filter=i.fromDate(new Date(a.fecha_inicio)),a.fecha_fin_filter=i.fromDate(new Date(a.fecha_fin));const t=_(f,"categorias",e);await p(t,a)}catch(t){console.error("Error al actualizar categoria:",t)}},T=async e=>{try{const a=_(f,"categorias",e);await h(a)}catch(a){console.error("Error al eliminar categoria:",a)}};export{M as a,q as b,C as c,b as g,T as r,R as u};
