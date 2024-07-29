import * as THREE from "three";

import { exampleDimensions } from "@/constants";
import { insertEveryNth, randomInt } from "@/helpers";

const multipleRectangles = (
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

  renderer.setPixelRatio(dpr);
  renderer.setSize(width, height);
  renderer.domElement.style.width = `${width}px`;
  renderer.domElement.style.height = `${height}px`;

  function createRectangle(
    x: number,
    y: number,
    width: number,
    height: number,
    color: THREE.Vector4
  ) {
    const positions = new Float32Array(
      insertEveryNth(
        [
          x,
          y,
          x + width,
          y,
          x,
          y + height,
          x,
          y + height,
          x + width,
          y,
          x + width,
          y + height,
        ],
        2,
        0
      )
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
        color: {
          value: color,
        },
      },
      side: THREE.DoubleSide,
    });

    const mesh = new THREE.Mesh(geometry, material);
    return mesh;
  }

  for (let i = 0; i < 50; i++) {
    const color = new THREE.Vector4(
      Math.random(),
      Math.random(),
      Math.random()
    );

    const rectangle = createRectangle(
      randomInt(300),
      randomInt(300),
      randomInt(300),
      randomInt(300),
      color
    );

    scene.add(rectangle);
  }

  const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  };

  animate();
};

export default multipleRectangles;
