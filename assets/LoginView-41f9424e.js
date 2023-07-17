import{Y as w,ap as x,Z as h,am as k,a1 as S,a3 as B,a4 as s,c as a,aq as C,a8 as o,ar as y,as as c,aj as p,K as F,ab as q}from"./index-b6418769.js";import{c as M,a as i,u as N,d as m,V as U}from"./index.esm-af02d6e3.js";import{V as P}from"./VContainer-e04266d6.js";import{V as d,a as R}from"./VRow-155039a7.js";import"./_commonjsHelpers-39b5b250.js";const T=p("h1",null,"登入",-1),$={class:"text-center"},z={__name:"LoginView",setup(j){const n=w(),V=x(),b=h(),f=M({account:i().required("帳號必填").min(4,"帳號最少 4 個字").max(20,"帳號最多 20 個字"),password:i().required("密碼必填").min(4,"密碼最少 4 個字").max(20,"密碼最多 20 個字")}),{handleSubmit:g,isSubmitting:_}=N({validationSchema:f}),t=m("account"),r=m("password"),v=g(async l=>{try{const{data:e}=await k.post("/users/login",{account:l.account,password:l.password});b.login({token:e.result.token,account:e.result.account,email:e.result.email,cart:e.result.cart,role:e.result.role}),n({text:"登入成功",showCloseButton:!1,snackbarProps:{timeout:2e3,color:"green",location:"bottom"}}),V.push("/")}catch(e){console.log(e),n({text:e.response.data.message,showCloseButton:!1,snackbarProps:{timeout:2e3,color:"red",location:"bottom"}})}});return(l,e)=>(S(),B(P,null,{default:s(()=>[a(R,null,{default:s(()=>[a(d,{col:"12"},{default:s(()=>[T]),_:1}),a(C),a(d,{col:"12"},{default:s(()=>[a(U,{disabled:o(_),onSubmit:y(o(v),["prevent"])},{default:s(()=>[a(c,{modelValue:o(t).value.value,"onUpdate:modelValue":e[0]||(e[0]=u=>o(t).value.value=u),"error-messages":o(t).errorMessage.value,label:"帳號",counter:"",maxlength:"20"},null,8,["modelValue","error-messages"]),a(c,{modelValue:o(r).value.value,"onUpdate:modelValue":e[1]||(e[1]=u=>o(r).value.value=u),"error-messages":o(r).errorMessage.value,label:"密碼",counter:"",maxlength:"20",type:"password"},null,8,["modelValue","error-messages"]),p("div",$,[a(F,{type:"submit",color:"green"},{default:s(()=>[q("登入")]),_:1})])]),_:1},8,["disabled","onSubmit"])]),_:1})]),_:1})]),_:1}))}};export{z as default};
