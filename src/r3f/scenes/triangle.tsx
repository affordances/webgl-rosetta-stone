import React from "react";
import * as THREE from "three";

import { sceneSetup } from "@/constants";
import { insertEveryNth } from "@/helpers";

const triangle: React.FC = () => {
  const positions = new Float32Array(
    insertEveryNth(sceneSetup["triangle"].vertices, 2, 0)
  );

  return (
    <mesh>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <rawShaderMaterial
        vertexShader={sceneSetup["triangle"].vert}
        fragmentShader={sceneSetup["triangle"].frag}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

export default triangle;
