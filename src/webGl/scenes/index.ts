import { SceneModules } from "@/types";

const sceneModules: SceneModules = {
  triangle: () => import("./triangle"),
  pixelPositioning: () => import("./pixelPositioning"),
  multipleRectangles: () => import("./multipleRectangles"),
  varyingTriangle: () => import("./varyingTriangle"),
};

export default sceneModules;
