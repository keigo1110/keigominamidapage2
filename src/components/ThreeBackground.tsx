'use client'

import { useEffect, useRef } from 'react';
import * as THREE from 'three';


// 共通のジオメトリを再利用
const sharedGeometries = {
  ring: new THREE.RingGeometry(0.5, 1, 6),
  circle: new THREE.CircleGeometry(0.3, 8),
  plane: new THREE.PlaneGeometry(0.8, 0.8),
};

export function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationRef = useRef<number | null>(null);
  const materialsRef = useRef<THREE.MeshBasicMaterial[]>([]);
  // ダークモード固定
  const isDark = true;

  // マウス位置のthrottling
  const mousePosition = useRef({ x: 0, y: 0 });
  const targetPosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false, // パフォーマンス向上のため無効化
      powerPreference: "high-performance"
    });

    rendererRef.current = renderer;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // 最大1.5に制限
    mountRef.current.appendChild(renderer.domElement);

    // Create materials pool (材料を事前に作成して再利用)
    const createMaterials = () => {
      const materials: THREE.MeshBasicMaterial[] = [];
      for (let i = 0; i < 5; i++) {
        materials.push(new THREE.MeshBasicMaterial({
          color: new THREE.Color().setHSL(
            (i / 5 * 0.1) + (isDark ? 0.6 : 0.58), // 青色の色相範囲に変更
            0.4,
            isDark ? 0.3 : 0.7
          ),
          transparent: true,
          opacity: 0.1,
          side: THREE.DoubleSide,
        }));
      }
      materialsRef.current = materials;
      return materials;
    };

    const materials = createMaterials();

    // Create subtle geometric background with reduced number of meshes
    const createGeometricMesh = () => {
      const meshes: THREE.Mesh[] = [];
      const geometryKeys = Object.keys(sharedGeometries) as Array<keyof typeof sharedGeometries>;

      // 20から12に削減
      for (let i = 0; i < 12; i++) {
        const randomIndex = Math.floor(Math.random() * geometryKeys.length);
        const geometryKey = geometryKeys[randomIndex];
        if (!geometryKey) continue;
        const geometry = sharedGeometries[geometryKey];
        const material = materials[i % materials.length]; // 材料を再利用

        const mesh = new THREE.Mesh(geometry, material);

        // Position shapes in 3D space
        mesh.position.set(
          (Math.random() - 0.5) * 100,
          (Math.random() - 0.5) * 60,
          (Math.random() - 0.5) * 80
        );

        // Random rotation
        mesh.rotation.set(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        );

        // 各メッシュに速度を保存（再計算を避ける）
        mesh.userData.rotationSpeed = {
          x: 0.002 * (0.5 + Math.random() * 0.5),
          y: 0.001 * (0.5 + Math.random() * 0.5),
          z: 0.0005 * (0.5 + Math.random() * 0.5)
        };

        meshes.push(mesh);
        scene.add(mesh);
      }

      return meshes;
    };

    const geometricMeshes = createGeometricMesh();

    // Create subtle wireframe grid with reduced lines
    const createWireframeGrid = () => {
      const gridGroup = new THREE.Group();
      const lineMaterial = new THREE.LineBasicMaterial({
        color: isDark ? 0x4a5568 : 0xe2e8f0,
        transparent: true,
        opacity: 0.1
      });

      // Horizontal lines (11から7に削減)
      for (let i = -3; i <= 3; i++) {
        const geometry = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(-50, i * 15, -20),
          new THREE.Vector3(50, i * 15, -20)
        ]);

        const line = new THREE.Line(geometry, lineMaterial);
        gridGroup.add(line);
      }

      // Vertical lines (11から7に削減)
      for (let i = -3; i <= 3; i++) {
        const geometry = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(i * 15, -50, -20),
          new THREE.Vector3(i * 15, 50, -20)
        ]);

        const line = new THREE.Line(geometry, lineMaterial.clone());
        gridGroup.add(line);
      }

      return gridGroup;
    };

    const wireframeGrid = createWireframeGrid();
    scene.add(wireframeGrid);

    camera.position.z = 60;

    // Throttled mouse move handler
    let mouseThrottle = 0;
    const handleMouseMove = (event: MouseEvent) => {
      const now = Date.now();
      if (now - mouseThrottle < 50) return; // 50msごとに更新
      mouseThrottle = now;

      mousePosition.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mousePosition.current.y = -(event.clientY / window.innerHeight) * 2 + 1;

      targetPosition.current.x = mousePosition.current.x * 5;
      targetPosition.current.y = mousePosition.current.y * 3;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Smooth animation loop
    let lastTime = 0;
    const animate = (currentTime: number) => {
      animationRef.current = requestAnimationFrame(animate);

      // フレームレート制限（30fps）
      if (currentTime - lastTime < 33) return;
      lastTime = currentTime;

      const time = currentTime * 0.0005;

      // Gentle rotation for geometric shapes
      geometricMeshes.forEach((mesh, index) => {
        const speed = mesh.userData.rotationSpeed;
        mesh.rotation.x += speed.x;
        mesh.rotation.y += speed.y;
        mesh.rotation.z += speed.z;

        // Subtle floating motion
        mesh.position.y += Math.sin(time + index) * 0.02;
      });

      // Very subtle grid movement
      wireframeGrid.rotation.y = Math.sin(time * 0.5) * 0.05;

      // Smooth camera movement
      camera.position.x += (targetPosition.current.x - camera.position.x) * 0.01;
      camera.position.y += (targetPosition.current.y - camera.position.y) * 0.01;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate(0);

    // Handle window resize with debounce
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }, 200);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      // mountRef.currentをクリーンアップ関数内でコピーして使用
      const currentMount = mountRef.current;
      if (currentMount && rendererRef.current?.domElement) {
        currentMount.removeChild(rendererRef.current.domElement);
      }

      // Dispose of materials
      materialsRef.current.forEach(material => material.dispose());

      // Dispose of wireframe grid
      wireframeGrid.children.forEach(child => {
        const line = child as THREE.Line;
        line.geometry.dispose();
        (line.material as THREE.Material).dispose();
      });

      renderer.dispose();
    };
  }, [isDark]);

  // Update colors based on theme
  useEffect(() => {
    if (!sceneRef.current || !materialsRef.current.length) return;

    // Update materials
    materialsRef.current.forEach((material, i) => {
      material.color.setHSL(
        (i / 5 * 0.3) + (isDark ? 0.6 : 0.2),
        0.3,
        isDark ? 0.3 : 0.7
      );
      material.opacity = isDark ? 0.15 : 0.08;
    });

    // Update wireframe grid colors
    sceneRef.current.children.forEach(child => {
      if (child instanceof THREE.Group) {
        child.children.forEach(line => {
          const lineMesh = line as THREE.Line;
          const material = lineMesh.material as THREE.LineBasicMaterial;
          material.color.setHex(isDark ? 0x4a5568 : 0xe2e8f0);
          material.opacity = isDark ? 0.1 : 0.08;
        });
      }
    });
  }, [isDark]);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ zIndex: -1 }}
    />
  );
}