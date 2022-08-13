import { draw, createVertexArray, createProgram } from "../webgl";
import * as utils from "../utils";
import vert from "./2.vert?raw";
import frag from "./2.frag?raw";

import { mat4 } from "gl-matrix";

export const init = async (gl: WebGL2RenderingContext) => {
  gl.clearColor(0, 0, 0, 1);
  gl.enable(gl.DEPTH_TEST);

  const program = createProgram(
    gl,
    vert,
    frag,
    ["aVertexPosition"],
    ["uProjectionMatrix", "uModelViewMatrix", "uModelColor"]
  );

  const models = await Promise.all(
    utils
      .range(1, 179)
      .map((i) =>
        import(`../models/nissan-gtr/part${i}.json`).then((model) =>
          createVertexArray(
            gl,
            program,
            [{ name: "aVertexPosition", data: model.vertices, size: 3 }],
            model.indices
          )
        )
      )
  );

  const projectionMatrix = mat4.create();
  const modelViewMatrix = mat4.create();

  let stop = false;
  (function render() {
    if (stop) return;
    requestAnimationFrame(render);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    program.use();

    mat4.perspective(
      projectionMatrix,
      45,
      gl.canvas.width / gl.canvas.height,
      10,
      10000
    );
    mat4.identity(modelViewMatrix);
    mat4.translate(modelViewMatrix, modelViewMatrix, [-10, 0, -100]);
    mat4.rotate(
      modelViewMatrix,
      modelViewMatrix,
      (30 * Math.PI) / 180,
      [1, 0, 0]
    );
    mat4.rotate(
      modelViewMatrix,
      modelViewMatrix,
      (30 * Math.PI) / 180,
      [0, 1, 0]
    );
    gl.uniformMatrix4fv(
      program.uniforms.uProjectionMatrix,
      false,
      projectionMatrix
    );
    gl.uniformMatrix4fv(
      program.uniforms.uModelViewMatrix,
      false,
      modelViewMatrix
    );

    models.forEach((vao) => {
      draw(gl, vao, "LINE_LOOP");
    });
  })();

  return () => {
    stop = true;
    program.dispose();
    models.forEach((vao) => {
      vao.dispose();
    });
  };
};