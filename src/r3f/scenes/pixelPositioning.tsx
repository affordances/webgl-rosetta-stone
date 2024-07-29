import React from "react";
import * as THREE from "three";

import { exampleDimensions, sceneSetup } from "@/constants";
import { insertEveryNth } from "@/helpers";
import { ShaderProps } from "@/types";

const pixelPositioning: React.FC<ShaderProps> = ({
  vertexShaderSource,
  fragmentShaderSource,
}) => {
  const positions = new Float32Array(
    insertEveryNth(sceneSetup["pixelPositioning"].vertices, 2, 0)
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
        vertexShader={vertexShaderSource}
        fragmentShader={fragmentShaderSource}
        uniforms={{
          resolution: {
            value: new THREE.Vector2(
              exampleDimensions.width * window.devicePixelRatio,
              exampleDimensions.height * window.devicePixelRatio
            ),
          },
        }}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

export default pixelPositioning;
