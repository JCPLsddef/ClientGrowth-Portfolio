"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/** prefers-reduced-motion hook: initializes on mount, updates on change. */
function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/** Normalized [x, y] outline of the knight silhouette. y is negated when drawn. */
const OUTLINE: [number, number][] = [
  [-0.042, -1.0], [-0.0496, -0.9288], [-0.1024, -0.7985], [-0.3191, -0.6071],
  [-0.4857, -0.4189], [-0.4787, -0.356], [-0.3687, -0.2384], [-0.2893, -0.2384],
  [-0.2511, -0.2797], [-0.213, -0.321], [-0.096, -0.321], [0.0903, -0.3586],
  [0.1125, -0.3751], [0.1004, -0.356], [-0.1322, -0.0636], [-0.4882, 0.4139],
  [-0.5308, 0.7947], [-0.4406, 0.9841], [0.0083, 0.4641], [0.1316, 0.335],
  [0.246, 0.232], [0.1583, 0.3687], [0.0184, 0.5734], [-0.1863, 0.8748],
  [-0.2486, 0.9873], [-0.2314, 1.0], [-0.0381, 0.9415], [0.3312, 0.8239],
  [0.5308, 0.7546], [0.5238, 0.6828], [0.4863, 0.3783], [0.4933, 0.2289],
  [0.5168, 0.0509], [0.5289, -0.4539], [0.3922, -0.7565], [0.0292, -0.9975],
  [-0.042, -1.0],
];

const SPIN_DURATION_MS = 1800;

type KnightLogoProps = {
  size?: number;
  spinInterval?: number;
};

export default function KnightLogo({
  size = 36,
  spinInterval = 8000,
}: KnightLogoProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();

    // Build the shape (negate y so it is not upside down).
    const shape = new THREE.Shape();
    OUTLINE.forEach(([x, y], i) => {
      if (i === 0) shape.moveTo(x, -y);
      else shape.lineTo(x, -y);
    });
    shape.closePath();

    const geometry = new THREE.ExtrudeGeometry(shape, {
      steps: 2,
      depth: 0.12,
      bevelEnabled: true,
      bevelThickness: 0.018,
      bevelSize: 0.012,
      bevelSegments: 12,
    });
    geometry.center();
    geometry.computeVertexNormals();

    const material = new THREE.MeshStandardMaterial({
      color: 0xd4a030,
      emissive: 0x7a4a00,
      emissiveIntensity: 0.55,
      metalness: 1.0,
      roughness: 0.12,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.scale.set(1.4, 1.4, 1.4);
    scene.add(mesh);

    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
    camera.position.set(0, 0, 4.2);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(size, size, false);
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.6;
    mount.appendChild(renderer.domElement);
    // setSize(..., false) keeps the canvas at its high-DPI buffer size in CSS px
    // (e.g. 80px for a 40px logo), which overflows the box and overlaps adjacent
    // text. Pin the displayed size to `size`; the drawing buffer stays crisp.
    renderer.domElement.style.width = `${size}px`;
    renderer.domElement.style.height = `${size}px`;
    renderer.domElement.style.display = "block";

    const ambient = new THREE.AmbientLight(0xffcc55, 1.8);
    const key = new THREE.DirectionalLight(0xfff5d0, 5.0);
    key.position.set(-3, 5, 4);
    const rim = new THREE.DirectionalLight(0xddeeff, 3.0);
    rim.position.set(4, 2, -3);
    const fill = new THREE.DirectionalLight(0xffd580, 2.5);
    fill.position.set(0, 1, 6);
    const sparkle = new THREE.PointLight(0xffe090, 5.0, 8);
    sparkle.position.set(0, 1.5, 1);
    scene.add(ambient, key, rim, fill, sparkle);

    let raf = 0;
    let timeout: ReturnType<typeof setTimeout> | undefined;
    let base = 0;
    let spinStart = 0;

    const ease = (t: number) =>
      t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

    // Show the knight immediately.
    mesh.rotation.y = base;
    renderer.render(scene, camera);

    if (!reducedMotion) {
      const frame = (now: number) => {
        if (!spinStart) spinStart = now;
        const progress = Math.min((now - spinStart) / SPIN_DURATION_MS, 1);
        mesh.rotation.y = base + ease(progress) * Math.PI * 2;
        renderer.render(scene, camera);
        if (progress < 1) {
          raf = requestAnimationFrame(frame);
        } else {
          base = base + Math.PI * 2;
          mesh.rotation.y = base;
          renderer.render(scene, camera);
          timeout = setTimeout(runSpin, spinInterval);
        }
      };
      const runSpin = () => {
        spinStart = 0;
        raf = requestAnimationFrame(frame);
      };
      timeout = setTimeout(runSpin, spinInterval);
    }

    return () => {
      cancelAnimationFrame(raf);
      if (timeout) clearTimeout(timeout);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [size, spinInterval, reducedMotion]);

  return <div ref={mountRef} style={{ width: size, height: size }} aria-hidden="true" />;
}
