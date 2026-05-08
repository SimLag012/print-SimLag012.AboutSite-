import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Stars, MeshDistortMaterial, Sphere, Grid, PerspectiveCamera, Environment } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function TechCore({ scrollProgress }) {
  const groupRef = useRef();
  const count = 64;
  const meshRef = useRef();
  const { mouse } = useThree();
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const positions = useMemo(() => {
    const p = [];
    for (let i = 0; i < count; i++) {
      p.push({
        phi: Math.acos(-1 + (2 * i) / count),
        theta: Math.sqrt(count * Math.PI) * Math.acos(-1 + (2 * i) / count),
        rot: Math.random() * Math.PI
      });
    }
    return p;
  }, []);

  // Smooth mouse values with lerp
  const smoothMouse = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Lerp mouse movement for buttery smoothness
    smoothMouse.current.x = THREE.MathUtils.lerp(smoothMouse.current.x, mouse.x, 0.05);
    smoothMouse.current.y = THREE.MathUtils.lerp(smoothMouse.current.y, mouse.y, 0.05);
    
    positions.forEach((p, i) => {
      const expansion = scrollProgress * 18;
      
      // Calculate target sphere position
      const targetX = Math.cos(p.theta) * Math.sin(p.phi) * (2 + expansion);
      const targetY = Math.sin(p.theta) * Math.sin(p.phi) * (2 + expansion);
      const targetZ = Math.cos(p.phi) * (2 + expansion);

      // Add mouse displacement
      const mouseFactor = (1 - scrollProgress) * 5;
      dummy.position.set(
        targetX + smoothMouse.current.x * mouseFactor,
        targetY + smoothMouse.current.y * mouseFactor,
        targetZ
      );
      
      dummy.rotation.set(time * 0.2 + p.rot, time * 0.3, 0);
      dummy.scale.setScalar(0.4 * (1 - scrollProgress * 0.5));
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    
    meshRef.current.instanceMatrix.needsUpdate = true;
    
    // Tilt the whole group slightly based on mouse
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, smoothMouse.current.x * 0.5, 0.05);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -smoothMouse.current.y * 0.5, 0.05);
  });

  return (
    <group ref={groupRef}>
      <instancedMesh ref={meshRef} args={[null, null, count]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#fff" metalness={0.9} roughness={0.05} transparent opacity={0.6} />
      </instancedMesh>
      
      <Sphere args={[1.5, 64, 64]}>
        <meshBasicMaterial color="#00f2ff" transparent opacity={0.05 * (1 - scrollProgress)} />
      </Sphere>
    </group>
  );
}

function GridBackground() {
  const { mouse } = useThree();
  const gridRef = useRef();
  const smoothMouse = useRef({ x: 0, y: 0 });

  useFrame(() => {
    smoothMouse.current.x = THREE.MathUtils.lerp(smoothMouse.current.x, mouse.x, 0.03);
    smoothMouse.current.y = THREE.MathUtils.lerp(smoothMouse.current.y, mouse.y, 0.03);
    
    if (gridRef.current) {
      gridRef.current.position.x = smoothMouse.current.x * 2;
      gridRef.current.position.z = smoothMouse.current.y * 2;
    }
  });

  return (
    <group ref={gridRef}>
      <Grid 
        infiniteGrid 
        fadeDistance={40} 
        fadeStrength={5} 
        cellSize={1} 
        sectionSize={10} 
        sectionColor="#ffffff" 
        cellColor="#111111" 
        position={[0, -8, 0]} 
        opacity={0.05}
      />
    </group>
  );
}

export default function Background3D({ scrollProgress = 0 }) {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: -1 }}>
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={50} />
        <color attach="background" args={['#010101']} />
        
        <ambientLight intensity={0.1} />
        <spotLight position={[10, 10, 10]} angle={0.2} penumbra={1} intensity={1.5} />
        <pointLight position={[-10, -10, -10]} color="#00f2ff" intensity={0.5} />
        
        <TechCore scrollProgress={scrollProgress} />
        <GridBackground />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <Environment preset="night" />
        
        <fog attach="fog" args={['#010101', 5, 35]} />
      </Canvas>
    </div>
  );
}
