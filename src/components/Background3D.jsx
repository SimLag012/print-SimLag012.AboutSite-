import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Stars, MeshDistortMaterial, Sphere, Grid, PerspectiveCamera, Environment } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function TechCore({ scrollProgress, smoothMouse }) {
  const groupRef = useRef();
  const count = 64;
  const meshRef = useRef();
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const positions = useMemo(() => {
    const p = [];
    for (let i = 0; i < count; i++) {
      p.push({
        phi: Math.acos(-1 + (2 * i) / count),
        theta: Math.sqrt(count * Math.PI) * Math.acos(-1 + (2 * i) / count),
        rot: Math.random() * Math.PI,
        speed: 0.1 + Math.random() * 0.5
      });
    }
    return p;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    positions.forEach((p, i) => {
      const expansion = scrollProgress * 18;
      
      const targetX = Math.cos(p.theta) * Math.sin(p.phi) * (2 + expansion);
      const targetY = Math.sin(p.theta) * Math.sin(p.phi) * (2 + expansion);
      const targetZ = Math.cos(p.phi) * (2 + expansion);

      const mouseFactor = (1 - scrollProgress) * 6;
      dummy.position.set(
        targetX + smoothMouse.current.x * mouseFactor * p.speed,
        targetY + smoothMouse.current.y * mouseFactor * p.speed,
        targetZ
      );
      
      dummy.rotation.set(time * 0.2 + p.rot, time * 0.3, 0);
      dummy.scale.setScalar(0.4 * (1 - scrollProgress * 0.5));
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    
    meshRef.current.instanceMatrix.needsUpdate = true;
    
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, smoothMouse.current.x * 0.4, 0.05);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -smoothMouse.current.y * 0.4, 0.05);
  });

  return (
    <group ref={groupRef}>
      <instancedMesh ref={meshRef} args={[null, null, count]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#fff" metalness={1} roughness={0} transparent opacity={0.5} />
      </instancedMesh>
    </group>
  );
}

function FloatingCubes({ count = 50, smoothMouse }) {
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        x: (Math.random() - 0.5) * 50,
        y: (Math.random() - 0.5) * 50,
        z: (Math.random() - 0.5) * 30,
        rotSpeed: Math.random() * 0.01,
        floatSpeed: 0.005 + Math.random() * 0.01,
        phase: Math.random() * Math.PI * 2
      });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    particles.forEach((p, i) => {
      // Floating motion + Mouse influence
      const floatX = Math.sin(time * p.floatSpeed + p.phase) * 2;
      const floatY = Math.cos(time * p.floatSpeed + p.phase) * 2;
      
      // Cubes "flee" or follow the mouse slightly with inertia
      const mouseInfluenceX = smoothMouse.current.x * 15 * p.floatSpeed * 100;
      const mouseInfluenceY = smoothMouse.current.y * 15 * p.floatSpeed * 100;

      dummy.position.set(
        p.x + floatX + mouseInfluenceX,
        p.y + floatY + mouseInfluenceY,
        p.z + Math.sin(time * 0.1 + p.phase) * 5
      );
      
      dummy.rotation.x += p.rotSpeed;
      dummy.rotation.y += p.rotSpeed;
      dummy.scale.setScalar(0.2 + Math.sin(time * 0.5 + p.phase) * 0.1);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#333" metalness={1} roughness={0} transparent opacity={0.2} />
    </instancedMesh>
  );
}

export default function Background3D({ scrollProgress = 0 }) {
  const { mouse } = useThree();
  const smoothMouse = useRef({ x: 0, y: 0 });

  useFrame(() => {
    smoothMouse.current.x = THREE.MathUtils.lerp(smoothMouse.current.x, mouse.x, 0.04);
    smoothMouse.current.y = THREE.MathUtils.lerp(smoothMouse.current.y, mouse.y, 0.04);
  });

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: -1 }}>
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={50} />
        <color attach="background" args={['#010101']} />
        
        <ambientLight intensity={0.1} />
        <spotLight position={[15, 20, 5]} angle={0.3} penumbra={1} intensity={2} color="#ffffff" />
        <pointLight position={[-15, -20, -5]} color="#00f2ff" intensity={1} />
        
        <TechCore scrollProgress={scrollProgress} smoothMouse={smoothMouse} />
        <FloatingCubes count={80} smoothMouse={smoothMouse} />
        
        <Grid 
          infiniteGrid 
          fadeDistance={50} 
          fadeStrength={5} 
          cellSize={1} 
          sectionSize={10} 
          sectionColor="#ffffff" 
          cellColor="#050505" 
          position={[0, -10, 0]} 
          opacity={0.04}
        />
        
        <Stars radius={100} depth={50} count={6000} factor={4} saturation={0} fade speed={1} />
        <Environment preset="night" />
        
        <fog attach="fog" args={['#010101', 5, 40]} />
      </Canvas>
    </div>
  );
}
