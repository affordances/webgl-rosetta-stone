import * as THREE from "three";

import sceneModules from "@threeJs/scenes";
import { loadModule } from "@/helpers";

export function createThreeJSScene(scene: string) {
  const canvas = document.createElement("canvas");
  canvas.id = "threejs-canvas";

  let renderer: THREE.WebGLRenderer | null = null;
  let threeScene: THREE.Scene | null = null;

  const loadScene = async () => {
    const sceneModule = await loadModule(sceneModules, scene);
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    threeScene = new THREE.Scene();

    sceneModule.default(threeScene, renderer);
  };

  const dispose = () => {
    if (renderer) {
      renderer.dispose();
    }

    if (threeScene) {
      threeScene.traverse((object) => {
        if ((object as THREE.Mesh).isMesh) {
          const mesh = object as THREE.Mesh;
          mesh.geometry.dispose();
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((material) => material.dispose());
          } else {
            mesh.material.dispose();
          }
        }
      });
    }
    renderer = null;
    threeScene = null;
  };

  return { canvas, dispose, loadScene };
}
