import{N as x}from"./notyf.min-ll9y_k96.js";import{d as b,a1 as y,o as a,e as r,a as e,j as l,a0 as d,g as c,n as p,h as i}from"./index-TFeQVYrp.js";import{g as C,d as I,f as h}from"./index.esm2017-DkIOf4jH.js";const k={key:0,class:"flex items-center mb-4"},v={key:1,class:"flex items-center mb-4"},S={class:"text-lg font-semibold text-gray-800 break-all"},L={class:"mb-4 text-gray-700 break-all"},w={class:"flex items-center mb-4 text-gray-600"},A={class:"flex items-center mb-4 text-gray-600"},D={class:"break-all"},E=["src"],N={key:2,class:"text-sm text-gray-600"},j=b({__name:"AnnouncementCard",props:{title:String,description:String,date:Object,category:String,isUrgent:Boolean,img:String,isEdition:Boolean,announcementId:{type:String,required:!0}},setup(n){const m=new x({duration:4e3,position:{x:"left",y:"top"},ripple:!0,dismissible:!0}),o=n,u=y(()=>{if(typeof o.date=="object"&&o.date.toDate){const s=o.date.toDate();return s.toLocaleDateString()+" "+s.toLocaleTimeString()}return o.date}),g=C(),f=async()=>{if(i().setIsLoadingComponent(!0),!o.announcementId){console.error("announcementId no está definido."),i().setIsLoadingComponent(!1),m.error("Error al borrar el elemento: announcementId no está definido.");return}const s=I(g,"condominios",i().getCondominiumId,"announcements",o.announcementId);try{await h(s),i().setIsLoadingComponent(!1),m.success(`Se ha eliminado el Anuncio '${o.title}' `)}catch(t){console.error("Error al borrar el elemento:",t),i().setIsLoadingComponent(!1)}};return(s,t)=>(a(),r("div",{class:p([{"border-[2px] border-red-700":n.isUrgent,"border-none":!n.isUrgent},"max-w-sm p-6 mx-auto mt-10 bg-white rounded-lg shadow-md font-poppins"])},[n.isUrgent?l("",!0):(a(),r("div",k,t[0]||(t[0]=[e("i",{class:"mr-3 text-xl text-blue-600 fas fa-bullhorn"},null,-1),e("h2",{class:"text-lg font-bold text-gray-800"},"Anuncio del administrador",-1)]))),n.isUrgent?(a(),r("div",v,t[1]||(t[1]=[e("i",{class:"mr-3 text-xl text-red-600 fas fa-bullhorn animate-pulse"},null,-1),e("h2",{class:"text-lg font-bold text-rose-800"},"Anuncio urgente del administrador",-1)]))):l("",!0),e("div",null,[e("h3",S,d(n.title),1)]),e("p",L,d(n.description),1),e("div",w,[t[2]||(t[2]=e("i",{class:"mr-2 fas fa-calendar-alt"},null,-1)),e("span",null,d(u.value),1)]),e("div",A,[t[3]||(t[3]=e("i",{class:"mr-2 fas fa-tags"},null,-1)),e("span",D,"Categoría: "+d(n.category),1)]),e("div",null,[n.img!=""?(a(),r("img",{key:0,src:n.img,alt:"Imagen del anuncio del administrador"},null,8,E)):l("",!0)]),n.isEdition?(a(),r("small",N,t[4]||(t[4]=[e("i",{class:"mr-2 fas fa-info-circle"},null,-1),c("Nota: La imagen solo se visualizará una vez que se publique el anuncio")]))):l("",!0),e("button",{onClick:f,class:"p-1 my-2 text-white rounded-lg bg-rose-800"},t[5]||(t[5]=[e("i",{class:"mr-2 fas fa-trash"},null,-1),c(" Eliminar ")]))],2))}});export{j as _};
