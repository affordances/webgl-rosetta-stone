import { useEffect, useRef } from "react";
import * as THREE from "three";

import {
  fragmentShaderSource,
  vertexShaderSource,
  vertices,
} from "../constants";

export const ThreeJSExample = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const ref = mountRef.current;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(ref.clientWidth, ref.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    ref.appendChild(renderer.domElement);

    const positions = new Float32Array(vertices.threeAndR3f);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.RawShaderMaterial({
      vertexShader: vertexShaderSource,
      fragmentShader: fragmentShaderSource,
      // so it's not necessary to flip the first and second position coords
      side: THREE.FrontSide,
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

  return <div className="three" ref={mountRef} />;
};
