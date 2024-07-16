import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

import {
  fragmentShaderSource,
  vertexShaderSource,
  vertices,
} from "./constants";
import { exampleDimensions } from "../../../constants";
import { projection, translate, rotate, scale } from "../../../helpers";
import { ControlsState } from "./useControls";

const getMatrix = ({
  posX,
  posY,
  angleInRadians,
  scaleX,
  scaleY,
}: ControlsState) => {
  const projected = projection(
    exampleDimensions.width,
    exampleDimensions.height
  );
  const translated = translate(projected, posX, posY);
  const rotated = rotate(translated, angleInRadians);
  const result = scale(rotated, scaleX, scaleY);

  return result;
};

export const ThreeJSVaryingTriangle = ({
  posX,
  posY,
  angleInRadians,
  scaleX,
  scaleY,
}: ControlsState) => {
  const mountRef = useRef<HTMLDivElement>(null);

  const initialMatrix = getMatrix({
    posX,
    posY,
    angleInRadians,
    scaleX,
    scaleY,
  });

  // Memoize the scene, camera, and renderer
  const { scene, camera, renderer } = useMemo(() => {
    const scene = new THREE.Scene();

    const dpr = window.devicePixelRatio;
    const width = exampleDimensions.width;
    const height = exampleDimensions.height;

    const camera = new THREE.OrthographicCamera(0, width, height, 0, -1, 1);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width * dpr, height * dpr, false);
    renderer.domElement.style.width = `${width}px`;
    renderer.domElement.style.height = `${height}px`;
    renderer.setPixelRatio(dpr);

    return { scene, camera, renderer };
  }, []);

  useEffect(() => {
    if (!mountRef.current) return;

    const ref = mountRef.current;
    ref.appendChild(renderer.domElement);

    const positions = new Float32Array(vertices.threeAndR3f);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.RawShaderMaterial({
      vertexShader: vertexShaderSource,
      fragmentShader: fragmentShaderSource,
      uniforms: {
        matrix: {
          value: initialMatrix,
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

    // Cleanup function
    return () => {
      scene.remove(mesh);
      renderer.dispose();
    };
  }, [initialMatrix, renderer, scene, camera]);

  return <div ref={mountRef} />;
};
