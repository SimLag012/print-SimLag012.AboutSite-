import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Stars, MeshDistortMaterial, Sphere, Grid, PerspectiveCamera, Environment, Center } from '@react-three/drei';
import { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

function TechCore({ scrollProgress }) {
  const groupRef = useRef();
  const count = 64;
  const meshRef = useRef();
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const positions = useMemo(() => {
    const p = [];
    for (let i = 0; i < count; i++) {
      p.push({
        x: (Math.random() - 0.5) * 4,
        y: (Math.random() - 0.5) * 4,
        z: (Math.random() - 0.5) * 4,
        rot: Math.random() * Math.PI
      });
    }
    return p;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    positions.forEach((p, i) => {
      // Calculate expansion based on scroll
      const expansion = scrollProgress * 15;
      
      // Normal circular position
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      
      const targetX = Math.cos(theta) * Math.sin(phi) * (2 + expansion);
      const targetY = Math.sin(theta) * Math.sin(phi) * (2 + expansion);
      const targetZ = Math.cos(phi) * (2 + expansion);

      dummy.position.set(targetX, targetY, targetZ);
      dummy.rotation.set(time * 0.2 + p.rot, time * 0.3, 0);
      dummy.scale.setScalar(0.4 * (1 - scrollProgress * 0.5));
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    
    meshRef.current.instanceMatrix.needsUpdate = true;
    groupRef.current.rotation.y += 0.002;
  });

  return (
    <group ref={groupRef}>
      <instancedMesh ref={meshRef} args={[null, null, count]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#fff" metalness={0.8} roughness={0.1} transparent opacity={0.8} />
      </instancedMesh>
      
      {/* Central Light Core */}
      <Sphere args={[1.5, 32, 32]}>
        <meshBasicMaterial color="#00f2ff" transparent opacity={0.1 * (1 - scrollProgress)} />
      </Sphere>
    </group>
  );
}

function HudLines() {
  const { mouse } = useThree();
  const lineRef = useRef();

  useFrame(() => {
    if (lineRef.current) {
      lineRef.current.rotation.y = THREE.MathUtils.lerp(lineRef.current.rotation.y, mouse.x * 0.5, 0.05);
      lineRef.current.rotation.x = THREE.MathUtils.lerp(lineRef.current.rotation.x, -mouse.y * 0.5, 0.05);
    }
  });

  return (
    <group ref={lineRef}>
      <Grid 
        infiniteGrid 
        fadeDistance={50} 
        fadeStrength={5} 
        cellSize={1} 
        sectionSize={5} 
        sectionColor="#ffffff" 
        cellColor="#222222" 
        position={[0, -10, 0]} 
        rotation={[Math.PI / 2, 0, 0]}
        opacity={0.1}
      />
    </group>
  );
}

export default function Background3D({ scrollProgress = 0 }) {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: -1 }}>
      <Canvas shadows gl={{ antialias: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={50} />
        <color attach="background" args={['#050505']} />
        
        <ambientLight intensity={0.2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
        <pointLight position={[-10, -10, -10]} color="#00f2ff" intensity={1} />
        
        <TechCore scrollProgress={scrollProgress} />
        <HudLines />
        
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        <Environment preset="city" />
        
        <fog attach="fog" args={['#050505', 10, 40]} />
      </Canvas>
    </div>
  );
}
