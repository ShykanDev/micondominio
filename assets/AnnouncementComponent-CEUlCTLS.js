import{g as y,c as p,a as b}from"./index.esm2017-DkIOf4jH.js";import{d as f,a1 as h,o as s,e as l,a as e,j as g,a0 as d,n as v,m as k,h as c,a2 as w,F as D,a3 as S,c as A}from"./index-TFeQVYrp.js";const C={key:0,class:"flex items-center mb-4"},I={key:1,class:"flex items-center mb-4"},L={class:"text-lg font-semibold text-gray-800 break-all"},U={class:"mb-4 text-gray-700 break-all"},_={class:"flex items-center mb-4 text-gray-600"},B={class:"flex items-center mb-4 text-gray-600"},j={class:"break-all"},F=["src"],O=f({__name:"AnnouncementCard",props:{title:{type:String,default:"lorem"},description:{type:String,default:"lorem"},date:{type:Object,default:()=>({})},category:{type:String,default:"General"},isUrgent:{type:Boolean,default:!1},img:{type:String,default:""}},setup(t){const o=t,i=h(()=>{if(typeof o.date=="object"&&o.date.toDate){const r=o.date.toDate();return r.toLocaleDateString()+" "+r.toLocaleTimeString()}return o.date});return(r,n)=>(s(),l("div",{class:v([{"border-[2px] border-red-700":t.isUrgent,"border-none":!t.isUrgent},"max-w-sm p-6 mx-auto mt-10 rounded-lg shadow-md bg-slate-50 font-poppins"])},[t.isUrgent?g("",!0):(s(),l("div",C,n[0]||(n[0]=[e("i",{class:"mr-3 text-xl text-blue-600 fas fa-bullhorn"},null,-1),e("h2",{class:"text-lg font-bold text-gray-800"},"Anuncio del administrador",-1)]))),t.isUrgent?(s(),l("div",I,n[1]||(n[1]=[e("i",{class:"mr-3 text-xl text-red-600 fas fa-bullhorn animate-pulse"},null,-1),e("h2",{class:"text-lg font-bold text-rose-800"},"Anuncio urgente del administrador",-1)]))):g("",!0),e("div",null,[e("h3",L,d(t.title),1)]),e("p",U,d(t.description),1),e("div",_,[n[2]||(n[2]=e("i",{class:"mr-2 fas fa-calendar-alt"},null,-1)),e("span",null,d(i.value),1)]),e("div",B,[n[3]||(n[3]=e("i",{class:"mr-2 fas fa-tags"},null,-1)),e("span",j,"Categoría: "+d(t.category),1)]),e("div",null,[t.img!=""?(s(),l("img",{key:0,src:t.img,alt:"Imagen del anuncio del administrador"},null,8,F)):g("",!0)])],2))}}),V={class:"flex flex-wrap gap-3 p-4 bg-white shadow-lg justify-evenly"},N=f({__name:"AnnouncementComponent",setup(t){const o=y(),i=k([]),r=p(o,`condominios/${c().getAdminDocId}/announcements`),n=async()=>{c().setIsLoadingOwner(!0);try{(await b(r)).forEach(u=>{console.log(u.data()),i.value.push(u.data())}),c().setIsLoadingOwner(!1)}catch(m){console.log(m),c().setIsLoadingOwner(!1)}};return w(()=>{n()}),(m,u)=>(s(),l("div",V,[(s(!0),l(D,null,S(i.value,(a,x)=>(s(),A(O,{key:x,category:a.category,"announcement-id":a.announcementId,date:a.creationDate,description:a.description,img:a.imageUrl,"is-urgent":a.urgent,title:a.title},null,8,["category","announcement-id","date","description","img","is-urgent","title"]))),128))]))}});export{N as default};
