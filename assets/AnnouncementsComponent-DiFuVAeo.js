import{d as g,m as p,l as r,y as f,f as _,z as y,A as h,H as v,o,b as c,F as k,aj as w,c as b,i as x,B}from"./index-BwM74EYG.js";import{_ as C}from"./AnnouncementCard.vue_vue_type_script_setup_true_lang-CUBxhIE2.js";const D={class:"bg-white rounded-lg shadow-lg"},F={key:0,class:"flex flex-wrap items-center justify-evenly"},j=g({__name:"AnnouncementsComponent",setup(I){const i=p(),t=r([]),l=r(!1),u=f(i,`condominios/${_().getCondominiumId}/announcements`),m=y(u,h("category","!=","")),d=async()=>{t.value=[];try{l.value=!0;const n=await B(m);n.empty?console.log("No se encontraron anuncios"):n.forEach(s=>{console.log(s.data()),t.value.push(s.data())})}catch(n){console.error(n)}};return v(()=>{d()}),(n,s)=>(o(),c("div",D,[t.value?(o(),c("section",F,[(o(!0),c(k,null,w(t.value.sort((e,a)=>a.creationDate-e.creationDate),(e,a)=>(o(),b(C,{key:a,category:e.category,title:e.title,description:e.description,date:e.creationDate,isUrgent:e.urgent,img:e.imageUrl,announcementId:e.announcementId},null,8,["category","title","description","date","isUrgent","img","announcementId"]))),128))])):x("",!0)]))}});export{j as default};
