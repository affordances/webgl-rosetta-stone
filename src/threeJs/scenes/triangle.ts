import * as THREE from "three";

import { exampleDimensions, sceneSetup } from "@/constants";
import { insertEveryNth } from "@/helpers";

const triangle = (
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

  renderer.setSize(exampleDimensions.width, exampleDimensions.height);
  renderer.setPixelRatio(window.devicePixelRatio);

  const positions = new Float32Array(
    insertEveryNth(sceneSetup["triangle"].vertices, 2, 0)
  );

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const material = new THREE.RawShaderMaterial({
    vertexShader: vertexShaderSource,
    fragmentShader: fragmentShaderSource,
    // so it's not necessary to flip the first and second position coords
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

export default triangle;
