import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Sphere, Grid, PerspectiveCamera, Environment } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function TechCore({ scrollProgress, smoothMouse }) {
  const groupRef = useRef();
  const meshRef = useRef();
  const count = 64;
  
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
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current || !groupRef.current) return;
    const time = state.clock.getElapsedTime();
    
    positions.forEach((p, i) => {
      const expansion = scrollProgress * 15;
      const targetX = Math.cos(p.theta) * Math.sin(p.phi) * (2 + expansion);
      const targetY = Math.sin(p.theta) * Math.sin(p.phi) * (2 + expansion);
      const targetZ = Math.cos(p.phi) * (2 + expansion);

      const mouseFactor = (1 - scrollProgress) * 5;
      dummy.position.set(
        targetX + smoothMouse.current.x * mouseFactor * p.speed,
        targetY + smoothMouse.current.y * mouseFactor * p.speed,
        targetZ
      );
      
      dummy.rotation.set(time * 0.1 + p.rot, time * 0.2, 0);
      dummy.scale.setScalar(0.4 * (1 - scrollProgress * 0.5));
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    
    meshRef.current.instanceMatrix.needsUpdate = true;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, smoothMouse.current.x * 0.3, 0.05);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -smoothMouse.current.y * 0.3, 0.05);
  });

  return (
    <group ref={groupRef}>
      <instancedMesh ref={meshRef} args={[null, null, count]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#ffffff" metalness={1} roughness={0.1} transparent opacity={0.6} />
      </instancedMesh>
    </group>
  );
}

function FloatingCubes({ count = 100, smoothMouse }) {
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        pos: new THREE.Vector3(
          (Math.random() - 0.5) * 50,
          (Math.random() - 0.5) * 50,
          (Math.random() - 0.5) * 20
        ),
        rotSpeed: Math.random() * 0.01,
        floatSpeed: 0.005 + Math.random() * 0.005,
        phase: Math.random() * Math.PI * 2,
        scale: 0.1 + Math.random() * 0.2
      });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    
    particles.forEach((p, i) => {
      // Base floating motion
      const floatX = Math.sin(time * p.floatSpeed + p.phase) * 1.5;
      const floatY = Math.cos(time * p.floatSpeed + p.phase) * 1.5;
      
      const currentPos = new THREE.Vector3(
        p.pos.x + floatX,
        p.pos.y + floatY,
        p.pos.z
      );

      // Magnetic Mouse Interaction
      const mousePos = new THREE.Vector3(smoothMouse.current.x * 25, -smoothMouse.current.y * 15, 0);
      const dist = currentPos.distanceTo(mousePos);
      const force = Math.max(0, 15 - dist) * 0.5; // Force field radius 15
      
      const dir = new THREE.Vector3().subVectors(currentPos, mousePos).normalize();
      currentPos.add(dir.multiplyScalar(force));

      dummy.position.copy(currentPos);
      dummy.rotation.x += p.rotSpeed;
      dummy.rotation.y += p.rotSpeed;
      dummy.scale.setScalar(p.scale + Math.sin(time * 0.5 + p.phase) * 0.05);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#444" metalness={1} roughness={0.2} transparent opacity={0.4} />
    </instancedMesh>
  );
}

export default function Background3D({ scrollProgress = 0 }) {
  const smoothMouse = useRef({ x: 0, y: 0 });

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: -1 }}>
      <Canvas dpr={[1, 2]} gl={{ antialias: true }}>
        <SceneController smoothMouse={smoothMouse} />
        <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={50} />
        <color attach="background" args={['#010101']} />
        
        <ambientLight intensity={0.2} />
        <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} intensity={2} />
        <pointLight position={[-10, -10, -10]} color="#00f2ff" intensity={1} />
        
        <TechCore scrollProgress={scrollProgress} smoothMouse={smoothMouse} />
        <FloatingCubes count={120} smoothMouse={smoothMouse} />
        
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

function SceneController({ smoothMouse }) {
  const { mouse } = useThree();
  useFrame(() => {
    smoothMouse.current.x = THREE.MathUtils.lerp(smoothMouse.current.x, mouse.x, 0.05);
    smoothMouse.current.y = THREE.MathUtils.lerp(smoothMouse.current.y, mouse.y, 0.05);
  });
  return null;
}
