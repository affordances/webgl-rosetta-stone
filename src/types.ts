export type ShaderSourceType =
  | WebGLRenderingContextBase["VERTEX_SHADER"]
  | WebGLRenderingContextBase["FRAGMENT_SHADER"];

export type SceneModule = () => Promise<any>;

export type SceneModules = Record<string, SceneModule>;

export type TabType = "webgl" | "threejs" | "r3f";

export type SceneProps = {
  scene: string;
  vertexShaderSource: string;
  fragmentShaderSource: string;
};
