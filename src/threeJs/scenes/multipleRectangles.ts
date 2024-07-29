import * as THREE from "three";

import { exampleDimensions } from "@/constants";
import { insertEveryNth, randomInt } from "@/helpers";

const multipleRectangles = (
  scene: THREE.Scene,
  renderer: THREE.WebGLRenderer,
  vertexShaderSource: string,
  fragmentShaderSource: string
) => {
  const dpr = window.devicePixelRatio;
  const width = exampleDimensions.width;
  const height = exampleDimensions.height;

  const camera = new THREE.OrthographicCamera(0, width / dpr, 0, height / dpr);

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
      Math.random(),
      1
    );

    const rectangle = createRectangle(
      randomInt(exampleDimensions.width),
      randomInt(exampleDimensions.height),
      randomInt(exampleDimensions.width),
      randomInt(exampleDimensions.height),
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
