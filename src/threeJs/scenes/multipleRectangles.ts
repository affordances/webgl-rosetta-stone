import * as THREE from "three";

import { getRandomRGBAColor, randomInt } from "@/helpers";
import { exampleDimensions } from "@/constants";

const multipleRectangles = (
  scene: THREE.Scene,
  renderer: THREE.WebGLRenderer
) => {
  const width = exampleDimensions.width;
  const height = exampleDimensions.height;

  const camera = new THREE.OrthographicCamera(
    width / -2,
    width / 2,
    height / 2,
    height / -2,
    1,
    1000
  );

  camera.position.z = 5;

  renderer.setSize(width, height);

  for (let i = 0; i < 50; i++) {
    const w = randomInt(width / 2);
    const h = randomInt(height / 2);

    const x = Math.random() * (width - w) - (width / 2 - w / 2);
    const y = Math.random() * (height - h) - (height / 2 - h / 2);

    const geometry = new THREE.PlaneGeometry(w, h);
    const material = new THREE.MeshBasicMaterial({
      color: getRandomRGBAColor(),
    });

    const rectangle = new THREE.Mesh(geometry, material);

    rectangle.position.set(x, y, 0);

    scene.add(rectangle);
  }

  renderer.render(scene, camera);
};

export default multipleRectangles;
