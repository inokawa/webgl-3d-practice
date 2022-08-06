export type RenderingMode =
  | "TRIANGLES"
  | "LINES"
  | "POINTS"
  | "LINE_LOOP"
  | "LINE_STRIP"
  | "TRIANGLE_STRIP"
  | "TRIANGLE_FAN";

export type Vao = {
  vao: WebGLVertexArrayObject;
  // vertices: WebGLBuffer;
  // indices: IndexBuffer;
  use: (fn: (count?: number) => void) => void;
  dispose: () => void;
};

// type IndexBuffer = {
//   data: WebGLBuffer;
//   count: number;
// };

export type Program<A extends string = string, U extends string = string> = {
  data: WebGLProgram;
  uniforms: { [key in U]: WebGLUniformLocation };
  attributes: { [key in A]: number };
  use: () => void;
  dispose: () => void;
  getUniform: (name: U) => any;
};

const createShader = (
  gl: WebGL2RenderingContext,
  shaderString: string,
  type: "VERTEX_SHADER" | "FRAGMENT_SHADER"
) => {
  const shader = gl.createShader(gl[type])!;

  gl.shaderSource(shader, shaderString);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    return null;
  }

  return shader;
};

export const createProgram = <A extends string, U extends string>(
  gl: WebGL2RenderingContext,
  vert: string,
  frag: string,
  attributes: A[],
  uniforms: U[]
): Program<A, U> => {
  const program = gl.createProgram()!;
  const vertShader = createShader(gl, vert, "VERTEX_SHADER")!;
  const fragShader = createShader(gl, frag, "FRAGMENT_SHADER")!;
  gl.attachShader(program, vertShader);
  gl.attachShader(program, fragShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Could not initialize shaders");
  }
  gl.deleteShader(vertShader);
  gl.deleteShader(fragShader);

  const self = {
    data: program,
    attributes: attributes.reduce((acc, k) => {
      acc[k] = gl.getAttribLocation(program, k);
      return acc;
    }, {} as { [key in A]: number }),
    uniforms: uniforms.reduce((acc, k) => {
      acc[k] = gl.getUniformLocation(program, k)!;
      return acc;
    }, {} as { [key in U]: WebGLUniformLocation }),
    use: () => {
      gl.useProgram(program);
    },
    dispose: () => {
      gl.deleteProgram(program);
    },
    getUniform: (name: U) => {
      return gl.getUniform(program, self.uniforms[name]);
    },
  };
  return self;
};

export type Vertex<A extends string> = {
  name: A;
  data: number[];
  size: number;
};

export const createVertexArray = <A extends string, U extends string>(
  gl: WebGL2RenderingContext,
  program: Program<A, U>,
  vertices: Vertex<A>[],
  indices?: number[]
): Vao => {
  const vao = gl.createVertexArray()!;
  gl.bindVertexArray(vao);

  const vertexBuffers: WebGLBuffer[] = [];
  vertices.forEach(({ name, data, size }) => {
    const vertexBuffer = gl.createBuffer()!;
    vertexBuffers.push(vertexBuffer);
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);

    gl.vertexAttribPointer(
      program.attributes[name],
      size,
      gl.FLOAT,
      false,
      0,
      0
    );
    gl.enableVertexAttribArray(program.attributes[name]);
  });

  let indexBuffer: WebGLBuffer | null = null;
  if (indices) {
    indexBuffer = gl.createBuffer()!;
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(
      gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(indices),
      gl.STATIC_DRAW
    );
  }

  gl.bindVertexArray(null);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  if (indices) {
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
  }
  const self: Vao = {
    vao: vao,
    // vertices: vertexBuffer,
    // indices: { data: indexBuffer, count: indices.length },
    use: (fn) => {
      gl.bindVertexArray(self.vao);
      fn(indices ? indices.length : undefined);
      gl.bindVertexArray(null);
    },
    dispose: () => {
      gl.deleteVertexArray(self.vao);
      vertexBuffers.forEach((vertexBuffer) => {
        gl.deleteBuffer(vertexBuffer);
      });
      gl.deleteBuffer(indexBuffer);
    },
  };
  return self;
};

export const draw = (
  gl: WebGL2RenderingContext,
  vao: Vao,
  mode: RenderingMode
) => {
  vao.use((count) => {
    if (count != null) {
      gl.drawElements(gl[mode], count, gl.UNSIGNED_SHORT, 0);
    } else {
      gl.drawArrays(gl[mode], gl.UNSIGNED_SHORT, 0);
    }
  });
};
