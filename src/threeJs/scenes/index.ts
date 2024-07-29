import { SceneModules } from "@/types";

const sceneModules: SceneModules = {
  triangle: () => import("./triangle"),
  pixelPositioning: () => import("./pixelPositioning"),
};

export default sceneModules;
