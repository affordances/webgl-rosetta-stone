import { useEffect, useRef } from "react";
import * as THREE from "three";

import { fragmentShaderSource, vertexShaderSource } from "./constants";
import { exampleDimensions } from "../../../constants";

export const ThreeJSMultipleRectanglesExample = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

    // const positions = new Float32Array(vertices.threeAndR3f);

    const geometry = new THREE.BufferGeometry();
    // geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.RawShaderMaterial({
      vertexShader: vertexShaderSource,
      fragmentShader: fragmentShaderSource,
      uniforms: {
        resolution: {
          value: new THREE.Vector2(width * dpr, height * dpr),
        },
      },
      //   side: THREE.DoubleSide,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const animate = () => {
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
  }, []);

  return <div ref={mountRef} />;
};
