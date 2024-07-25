import React, { Suspense } from "react";
import { createRoot, Root } from "react-dom/client";
import { Canvas } from "@react-three/fiber";

import sceneModules from "@r3f/scenes";

type R3FWrapperProps = {
  scene: string;
};

let root: Root | null = null;

const R3FWrapper: React.FC<R3FWrapperProps> = ({ scene }) => {
  const Scene = React.lazy(sceneModules[scene]);

  return (
    <Canvas frameloop="demand">
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
};

export function renderR3FScene(scene: string, container: HTMLElement) {
  if (!root) {
    root = createRoot(container);
  }
  root.render(<R3FWrapper scene={scene} />);
}

export function unmountR3FScene() {
  if (root) {
    root.unmount();
    root = null;
  }
}
