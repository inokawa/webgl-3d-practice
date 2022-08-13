const A=(r,i,n)=>{const a=r.createShader(r[n]);return r.shaderSource(a,i),r.compileShader(a),r.getShaderParameter(a,r.COMPILE_STATUS)?a:(console.error(r.getShaderInfoLog(a)),null)},d=(r,i,n,a,b)=>{const o=r.createProgram(),u=A(r,i,"VERTEX_SHADER"),c=A(r,n,"FRAGMENT_SHADER");r.attachShader(o,u),r.attachShader(o,c),r.linkProgram(o),r.getProgramParameter(o,r.LINK_STATUS)||console.error("Could not initialize shaders"),r.deleteShader(u),r.deleteShader(c);const t={data:o,attributes:a.reduce((e,s)=>(e[s]=r.getAttribLocation(o,s),e),{}),uniforms:b.reduce((e,s)=>(e[s]=r.getUniformLocation(o,s),e),{}),use:()=>{r.useProgram(o)},dispose:()=>{r.deleteProgram(o)},getUniform:e=>r.getUniform(o,t.uniforms[e]),setUniform:(e,s,f)=>{switch(s){case"float":r.uniform1f(t.uniforms[e],f);break;case"int":r.uniform1i(t.uniforms[e],f);break;case"bool":r.uniform1f(t.uniforms[e],f);break;case"vec2":r.uniform2fv(t.uniforms[e],f);break;case"ivec2":r.uniform2iv(t.uniforms[e],f);break;case"bvec2":r.uniform2fv(t.uniforms[e],f);break;case"vec3":r.uniform3fv(t.uniforms[e],f);break;case"ivec3":r.uniform3iv(t.uniforms[e],f);break;case"bvec3":r.uniform3fv(t.uniforms[e],f);break;case"vec4":r.uniform4fv(t.uniforms[e],f);break;case"ivec4":r.uniform4iv(t.uniforms[e],f);break;case"bvec4":r.uniform4fv(t.uniforms[e],f);break;case"mat2":r.uniformMatrix2fv(t.uniforms[e],!1,f);break;case"mat3":r.uniformMatrix3fv(t.uniforms[e],!1,f);break;case"mat4":r.uniformMatrix4fv(t.uniforms[e],!1,f);break}}};return t},m=(r,i,n,a)=>{const b=r.createVertexArray();r.bindVertexArray(b);const o=[];n.forEach(({name:t,data:e,size:s})=>{const f=r.createBuffer();o.push(f),r.bindBuffer(r.ARRAY_BUFFER,f),r.bufferData(r.ARRAY_BUFFER,new Float32Array(e),r.STATIC_DRAW),r.vertexAttribPointer(i.attributes[t],s,r.FLOAT,!1,0,0),r.enableVertexAttribArray(i.attributes[t])});let u=null;a&&(u=r.createBuffer(),r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,u),r.bufferData(r.ELEMENT_ARRAY_BUFFER,new Uint16Array(a),r.STATIC_DRAW)),r.bindVertexArray(null),r.bindBuffer(r.ARRAY_BUFFER,null),a&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,null);const c={vao:b,use:t=>{r.bindVertexArray(c.vao),t(a?a.length:void 0),r.bindVertexArray(null)},dispose:()=>{r.deleteVertexArray(c.vao),o.forEach(t=>{r.deleteBuffer(t)}),r.deleteBuffer(u)}};return c},E=(r,i,n)=>{i.use(a=>{a!=null?r.drawElements(r[n],a,r.UNSIGNED_SHORT,0):r.drawArrays(r[n],r.UNSIGNED_SHORT,0)})};export{m as a,d as c,E as d};
