import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Float, MeshDistortMaterial, Sparkles, MeshWobbleMaterial } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, Noise, ChromaticAberration } from '@react-three/postprocessing';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function InteractiveElements({ smoothScroll, smoothMouse }) {
  const meshRef = useRef();
  const count = 160;
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const pos = new THREE.Vector3(
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 40
      );
      temp.push({
        basePos: pos.clone(),
        velocity: new THREE.Vector3(),
        currentPos: pos.clone(),
        rotSpeed: Math.random() * 0.02,
        scale: 0.2 + Math.random() * 0.4
      });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    const scroll = smoothScroll.current;

    particles.forEach((p, i) => {
      // Smoother vortex math
      const vortexRadius = 12 + Math.sin(time * 0.3 + i) * 3;
      const vortexX = Math.cos(i * 0.1 + time * 0.8) * vortexRadius;
      const vortexY = Math.sin(i * 0.1 + time * 0.8) * vortexRadius;
      const vortexZ = (i - count/2) * 0.15;

      const targetX = THREE.MathUtils.lerp(p.basePos.x, vortexX, scroll);
      const targetY = THREE.MathUtils.lerp(p.basePos.y, vortexY, scroll);
      const targetZ = THREE.MathUtils.lerp(p.basePos.z, vortexZ, scroll);

      const mouse3D = new THREE.Vector3(smoothMouse.current.x * 25, -smoothMouse.current.y * 18, 5);
      const dist = p.currentPos.distanceTo(mouse3D);
      const force = Math.max(0, 10 - dist) * 0.12;
      const dir = new THREE.Vector3().subVectors(p.currentPos, mouse3D).normalize();
      
      p.velocity.add(dir.multiplyScalar(force));
      p.velocity.x += (targetX - p.currentPos.x) * 0.03;
      p.velocity.y += (targetY - p.currentPos.y) * 0.03;
      p.velocity.z += (targetZ - p.currentPos.z) * 0.03;
      
      p.velocity.multiplyScalar(0.95);
      p.currentPos.add(p.velocity);

      dummy.position.copy(p.currentPos);
      dummy.rotation.x += p.rotSpeed + p.velocity.x * 0.1;
      dummy.rotation.y += p.rotSpeed + p.velocity.y * 0.1;
      
      const s = p.scale * (1 + force * 0.8);
      dummy.scale.set(s, s, s);
      
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial 
        metalness={1} 
        roughness={0.2} 
        emissive="#00f2ff" 
        emissiveIntensity={1}
        transparent 
        opacity={0.7} 
      />
    </instancedMesh>
  );
}

function HeroStructure({ smoothScroll }) {
  const meshRef = useRef();
  const innerRef = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const scroll = smoothScroll.current;
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.15 + scroll * Math.PI;
      meshRef.current.rotation.z = Math.sin(t * 0.5) * 0.2;
      meshRef.current.scale.setScalar(1.2 - scroll * 0.4);
      meshRef.current.position.z = THREE.MathUtils.lerp(5, -10, scroll);
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.3;
      innerRef.current.rotation.x = t * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={meshRef}>
        <mesh>
          <octahedronGeometry args={[4, 2]} />
          <meshStandardMaterial 
            color="#ffffff" 
            wireframe 
            transparent 
            opacity={0.3} 
            emissive="#00f2ff" 
            emissiveIntensity={2}
          />
        </mesh>
        <mesh ref={innerRef}>
          <icosahedronGeometry args={[2, 0]} />
          <MeshWobbleMaterial 
            color="#050505"
            emissive="#bc00ff"
            emissiveIntensity={4}
            factor={0.4} 
            speed={2} 
            metalness={1}
            roughness={0}
          />
        </mesh>
      </group>
    </Float>
  );
}

function DynamicGrid({ smoothScroll, smoothMouse }) {
  const gridRef = useRef();
  
  useFrame(() => {
    if (gridRef.current) {
      gridRef.current.position.y = -14 + smoothScroll.current * 7;
      gridRef.current.rotation.x = -Math.PI / 2 + smoothMouse.current.y * 0.2;
      gridRef.current.rotation.z = smoothMouse.current.x * 0.2;
    }
  });

  return (
    <group ref={gridRef}>
      <gridHelper args={[160, 80, "#333", "#111"]} opacity={0.2} transparent />
    </group>
  );
}

export default function Background3D({ scrollProgress = 0 }) {
  const smoothMouse = useRef({ x: 0, y: 0 });
  const smoothScroll = useRef(0);

  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100vh', 
      zIndex: -1,
      background: '#010103'
    }}>
      <Canvas 
        dpr={[1, 2]} 
        gl={{ 
          antialias: true,
          alpha: false,
          powerPreference: "high-performance"
        }}
        camera={{ position: [0, 0, 35], fov: 45 }}
      >
        <color attach="background" args={['#010103']} />
        <SceneController smoothMouse={smoothMouse} smoothScroll={smoothScroll} scrollProgress={scrollProgress} />
        
        <SceneRotator smoothMouse={smoothMouse}>
          <ambientLight intensity={1} />
          <pointLight position={[20, 20, 20]} intensity={5} color="#00f2ff" />
          <pointLight position={[-20, -20, 20]} intensity={5} color="#bc00ff" />

          <InteractiveElements smoothScroll={smoothScroll} smoothMouse={smoothMouse} />
          <HeroStructure smoothScroll={smoothScroll} />
          <DynamicGrid smoothScroll={smoothScroll} smoothMouse={smoothMouse} />
          
          <Sparkles count={300} scale={70} size={3} speed={0.5} opacity={0.4} color="#00f2ff" />
          <Stars radius={180} depth={50} count={6000} factor={6} saturation={0} fade speed={1.2} />
        </SceneRotator>

        <EffectComposer multisampling={4}>
          <Bloom luminanceThreshold={0.1} mipmapBlur intensity={1.5} radius={0.4} />
          <ChromaticAberration offset={[0.002, 0.002]} />
          <Vignette eskil={false} offset={0.1} darkness={0.4} />
          <Noise opacity={0.03} />
        </EffectComposer>

        <fog attach="fog" args={['#010103', 100, 250]} />
      </Canvas>
    </div>
  );
}

function SceneRotator({ children, smoothMouse }) {
  const groupRef = useRef();
  
  useFrame(() => {
    if (groupRef.current) {
      // 3D Orbit feel: Rotate the entire group based on mouse
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, smoothMouse.current.x * 0.4, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -smoothMouse.current.y * 0.2, 0.05);
    }
  });
  
  return <group ref={groupRef}>{children}</group>;
}


function SceneController({ smoothMouse, smoothScroll, scrollProgress }) {
  const { mouse } = useThree();
  useFrame(() => {
    // 1. Decoupled Smooth Scroll
    smoothScroll.current = THREE.MathUtils.lerp(smoothScroll.current, scrollProgress, 0.05);
    
    // 2. Smooth Mouse
    smoothMouse.current.x = THREE.MathUtils.lerp(smoothMouse.current.x, mouse.x, 0.04);
    smoothMouse.current.y = THREE.MathUtils.lerp(smoothMouse.current.y, mouse.y, 0.04);
  });
  return null;
}





