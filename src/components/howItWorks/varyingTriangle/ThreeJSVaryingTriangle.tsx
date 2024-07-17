import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

import {
  fragmentShaderSource,
  vertexShaderSource,
  vertices,
} from "./constants";
import { exampleDimensions } from "../../../constants";
import { ControlsState } from "./useControls";
import { getMatrix } from "../../../helpers";

export const ThreeJSVaryingTriangleExample = ({
  posX,
  posY,
  angleInRadians,
  scaleX,
  scaleY,
}: ControlsState) => {
  const mountRef = useRef<HTMLDivElement>(null);

  const dpr = window.devicePixelRatio;
  const width = exampleDimensions.width;
  const height = exampleDimensions.height;

  const initialMatrix = getMatrix({
    posX,
    posY,
    angleInRadians,
    scaleX,
    scaleY,
    height,
    width,
  });

  // Memoize the scene, camera, and renderer
  const { scene, camera, renderer } = useMemo(() => {
    const scene = new THREE.Scene();

    const camera = new THREE.OrthographicCamera(0, width, height, 0, -1, 1);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width * dpr, height * dpr, false);
    renderer.domElement.style.width = `${width}px`;
    renderer.domElement.style.height = `${height}px`;
    renderer.setPixelRatio(dpr);

    return { scene, camera, renderer };
  }, [dpr, height, width]);

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
