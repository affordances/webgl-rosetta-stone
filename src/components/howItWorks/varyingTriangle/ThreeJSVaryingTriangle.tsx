import { useEffect, useRef } from "react";
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
  // const meshRef = useRef<THREE.Mesh | null>(null);
  // const materialRef = useRef<THREE.RawShaderMaterial | null>(null);

  useEffect(() => {
    // if (!mountRef.current || !meshRef.current || !materialRef.current) return;
    if (!mountRef.current) return;

    const ref = mountRef.current;

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

    ref.appendChild(renderer.domElement);

    const positions = new Float32Array(vertices.threeAndR3f);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const initialMatrix = getMatrix({
      posX,
      posY,
      angleInRadians,
      scaleX,
      scaleY,
    });

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

    // materialRef.current = material;

    const mesh = new THREE.Mesh(geometry, material);

    // meshRef.current = mesh;

    scene.add(mesh);

    const animate = () => {
      // const matrix = getMatrix({
      //   posX,
      //   posY,
      //   angleInRadians,
      //   scaleX,
      //   scaleY,
      // });
      // material.uniforms.matrix.value = matrix;
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (ref) {
        ref.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
    // }, [posX, posY, angleInRadians, scaleX, scaleY]);
  });

  // useEffect(() => {
  //   if (materialRef.current && meshRef.current) {
  //     const matrix = getMatrix({ posX, posY, angleInRadians, scaleX, scaleY });
  //     materialRef.current.uniforms.matrix.value = matrix;
  //   }
  // }, [posX, posY, angleInRadians, scaleX, scaleY]);

  return <div ref={mountRef} />;
};
