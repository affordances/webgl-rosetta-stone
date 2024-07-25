import { SceneModules } from "@/types";

const sceneModules: SceneModules = {
  triangle: () => import("./triangle"),
};

export default sceneModules;
