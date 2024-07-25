import { loadModule } from "@/helpers";
import sceneModules from "@webGl/scenes";
import { resizePixelRatio } from "@webGl/helpers";

export function createWebGLScene(scene: string) {
  const canvas = document.createElement("canvas");

  resizePixelRatio(canvas);

  canvas.id = "webgl-canvas";

  let gl: WebGLRenderingContext | null = null;
  let sceneModule: any = null;

  const loadScene = async () => {
    sceneModule = await loadModule(sceneModules, scene);

    gl = canvas.getContext("webgl");

    if (gl) {
      sceneModule.default(gl);
    }
  };

  const dispose = () => {
    if (gl) {
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      console.log("webgl context lost");
    }

    gl = null;
  };

  return { canvas, dispose, loadScene };
}
