class o{constructor(n=50,e=5){this.alias="floor",this.dimension=n,this.lines=e,this.vertices=[],this.indices=[],this.wireframe=!0,this.visible=!0,this.build(this.dimension,this.lines)}build(n,e){n&&(this.dimension=n),e&&(this.lines=2*this.dimension/e);const h=2*this.dimension/this.lines,s=[],t=[];for(let i=0;i<=this.lines;i++)s[6*i]=-this.dimension,s[6*i+1]=0,s[6*i+2]=-this.dimension+i*h,s[6*i+3]=this.dimension,s[6*i+4]=0,s[6*i+5]=-this.dimension+i*h,s[6*(this.lines+1)+6*i]=-this.dimension+i*h,s[6*(this.lines+1)+6*i+1]=0,s[6*(this.lines+1)+6*i+2]=-this.dimension,s[6*(this.lines+1)+6*i+3]=-this.dimension+i*h,s[6*(this.lines+1)+6*i+4]=0,s[6*(this.lines+1)+6*i+5]=this.dimension,t[2*i]=2*i,t[2*i+1]=2*i+1,t[2*(this.lines+1)+2*i]=2*(this.lines+1)+2*i,t[2*(this.lines+1)+2*i+1]=2*(this.lines+1)+2*i+1;this.vertices=s,this.indices=t}}export{o as F};
