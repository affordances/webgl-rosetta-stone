import React, { Suspense } from "react";
import { createRoot, Root } from "react-dom/client";
import { Canvas } from "@react-three/fiber";

import sceneModules from "@r3f/scenes";
import { SceneProps } from "@/types";

let root: Root | null = null;

const R3FWrapper: React.FC<SceneProps> = ({
  scene,
  vertexShaderSource,
  fragmentShaderSource,
}) => {
  const Scene = React.lazy(sceneModules[scene]);

  return (
    <Canvas frameloop="demand">
      <Suspense fallback={null}>
        <Scene
          vertexShaderSource={vertexShaderSource}
          fragmentShaderSource={fragmentShaderSource}
        />
      </Suspense>
    </Canvas>
  );
};

export function renderR3FScene(
  scene: string,
  container: HTMLElement,
  vertexShaderSource: string,
  fragmentShaderSource: string
) {
  if (!root) {
    root = createRoot(container);
  }
  root.render(
    <R3FWrapper
      scene={scene}
      vertexShaderSource={vertexShaderSource}
      fragmentShaderSource={fragmentShaderSource}
    />
  );
}

export function unmountR3FScene() {
  if (root) {
    root.unmount();
    root = null;
  }
}
