var c=Object.defineProperty;var e=(r,t,a)=>t in r?c(r,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):r[t]=a;var s=(r,t,a)=>(e(r,typeof t!="symbol"?t+"":t,a),a);class u{constructor(t=10){s(this,"vertices");s(this,"indices");s(this,"alias");s(this,"wireframe");this.alias="axis",this.wireframe=!0,this.indices=[0,1,2,3,4,5],this.vertices=h(t)}}const h=r=>(r&&(r=r),[-r,0,0,r,0,0,0,-r/2,0,0,r/2,0,0,0,-r,0,0,r]);export{u as A};
