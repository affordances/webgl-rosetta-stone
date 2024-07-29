import * as THREE from "three";

import { exampleDimensions, sceneSetup } from "@/constants";
import { insertEveryNth } from "@/helpers";

const pixelPositioning = (
  scene: THREE.Scene,
  renderer: THREE.WebGLRenderer,
  vertexShaderSource: string,
  fragmentShaderSource: string
) => {
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  const dpr = window.devicePixelRatio;
  const width = exampleDimensions.width;
  const height = exampleDimensions.height;

  renderer.setSize(width * dpr, height * dpr, false);
  renderer.domElement.style.width = `${width}px`;
  renderer.domElement.style.height = `${height}px`;
  renderer.setPixelRatio(dpr);

  const positions = new Float32Array(
    insertEveryNth(sceneSetup["pixelPositioning"].vertices, 2, 0)
  );

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const material = new THREE.RawShaderMaterial({
    vertexShader: vertexShaderSource,
    fragmentShader: fragmentShaderSource,
    uniforms: {
      resolution: {
        value: new THREE.Vector2(width * dpr, height * dpr),
      },
    },
    side: THREE.DoubleSide,
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  };

  animate();
};

export default pixelPositioning;
