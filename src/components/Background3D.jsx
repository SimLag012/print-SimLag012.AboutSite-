import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Float, Sparkles, MeshWobbleMaterial } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, Noise, ChromaticAberration } from '@react-three/postprocessing';
import { useRef, useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';

function InteractiveElements({ smoothScroll, smoothMouse }) {
  const meshRef = useRef();
  const count = 120; // Perfect balance of particle density and performance
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const pos = new THREE.Vector3(
        (Math.random() - 0.5) * 55,
        (Math.random() - 0.5) * 55,
        (Math.random() - 0.5) * 35
      );
      temp.push({
        basePos: pos.clone(),
        velocity: new THREE.Vector3(),
        currentPos: pos.clone(),
        rotSpeed: Math.random() * 0.015,
        scale: 0.15 + Math.random() * 0.3
      });
    }
    return temp;
  }, [count]);

  const v1 = useMemo(() => new THREE.Vector3(), []);
  const v2 = useMemo(() => new THREE.Vector3(), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    const scroll = THREE.MathUtils.clamp(smoothScroll.current, 0, 1);

    particles.forEach((p, i) => {
      const waveX = Math.sin(time * 0.15 + i) * 1.5;
      const waveY = Math.cos(time * 0.15 + i) * 1.5;
      
      const targetX = p.basePos.x + waveX + (smoothMouse.current.x * 2.5);
      const targetY = p.basePos.y + waveY + (smoothMouse.current.y * 2);
      const targetZ = p.basePos.z - scroll * 15;

      v1.set(smoothMouse.current.x * 18, -smoothMouse.current.y * 12, 0);
      const dist = p.currentPos.distanceTo(v1);
      const force = Math.max(0, 6 - dist) * 0.04;
      v2.subVectors(p.currentPos, v1).normalize();
      
      p.velocity.add(v2.multiplyScalar(force));
      p.velocity.x += (targetX - p.currentPos.x) * 0.01;
      p.velocity.y += (targetY - p.currentPos.y) * 0.01;
      p.velocity.z += (targetZ - p.currentPos.z) * 0.01;
      
      p.velocity.multiplyScalar(0.91);
      p.currentPos.add(p.velocity);

      dummy.position.copy(p.currentPos);
      dummy.rotation.x += p.rotSpeed;
      dummy.rotation.y += p.rotSpeed;
      
      const s = p.scale * (1 + force * 0.5);
      dummy.scale.set(s, s, s);
      
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]} frustumCulled={false}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial 
        metalness={0.9} 
        roughness={0.2} 
        emissive="#00ff66" 
        emissiveIntensity={0.6}
        transparent 
        opacity={0.35} 
      />
    </instancedMesh>
  );
}

// RESTORED ORIGINAL SHAPES - Made highly subtle, elegant and perfectly positioned to not block text
function HeroStructure({ smoothScroll, smoothMouse }) {
  const meshRef = useRef();
  const innerRef = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const scroll = THREE.MathUtils.clamp(smoothScroll.current, 0, 1);
    
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.1 + scroll * Math.PI;
      meshRef.current.rotation.z = Math.sin(t * 0.3) * 0.15;
      
      // Centered position behind the content
      meshRef.current.position.x = smoothMouse.current.x * 2;
      meshRef.current.position.y = -scroll * 15 - smoothMouse.current.y * 2;
      meshRef.current.position.z = -12 - scroll * 5; // Pushed deep to look clean and act as a backdrop
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.2;
      innerRef.current.rotation.x = t * 0.15;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
      <group ref={meshRef}>
        {/* Outer Wireframe Octahedron - Monochromatic green theme */}
        <mesh>
          <octahedronGeometry args={[4.6, 2]} />
          <meshStandardMaterial 
            color="#00ff66" 
            wireframe 
            transparent 
            opacity={0.16} // Subtle transparency
            emissive="#00ff66" 
            emissiveIntensity={1.0}
          />
        </mesh>
        
        {/* Inner Wobbling Icosahedron Core - Glassmorphic cyberpunk core */}
        <mesh ref={innerRef}>
          <icosahedronGeometry args={[2.2, 0]} />
          <MeshWobbleMaterial 
            color="#050505"
            emissive="#00ff66"
            emissiveIntensity={1.5}
            factor={0.3} 
            speed={1.0} 
            metalness={0.95}
            roughness={0.15}
            transparent
            opacity={0.3}
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
      gridRef.current.position.y = -12 + smoothScroll.current * 5;
      gridRef.current.rotation.x = -Math.PI / 2 + smoothMouse.current.y * 0.15;
      gridRef.current.rotation.z = smoothMouse.current.x * 0.15;
    }
  });

  return (
    <group ref={gridRef}>
      <gridHelper args={[140, 70, "#051108", "#051108"]} opacity={0.12} transparent frustumCulled={false} />
    </group>
  );
}

export default function Background3D({ scrollRef }) {
  const [canvasKey, setCanvasKey] = useState(0);
  const smoothMouse = useRef({ x: 0, y: 0 });
  const smoothScroll = useRef(0);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        setCanvasKey(prev => prev + 1);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100vh', 
      zIndex: 0,
      // More transparent background gradient
      background: 'radial-gradient(circle at 60% 40%, rgba(0, 255, 102, 0.05) 0%, rgba(6, 12, 8, 0.6) 60%, rgba(1, 3, 2, 0.7) 100%)'
    }}>
      <Canvas 
        key={canvasKey}
        dpr={[1, 1.5]} 
        gl={{ 
          antialias: true,
          alpha: true, // Show the radial CSS gradient
          powerPreference: "high-performance"
        }}
        camera={{ position: [0, 0, 30], fov: 45 }}
      >
        <SceneController smoothMouse={smoothMouse} smoothScroll={smoothScroll} scrollRef={scrollRef} />
        
        <SceneRotator smoothMouse={smoothMouse}>
          <ambientLight intensity={0.9} />
          <pointLight position={[15, 15, 15]} intensity={2.5} color="#00ff66" />
          <pointLight position={[-15, -15, 15]} intensity={0.8} color="#004411" />

          <InteractiveElements smoothScroll={smoothScroll} smoothMouse={smoothMouse} />
          <HeroStructure smoothScroll={smoothScroll} smoothMouse={smoothMouse} />
          <DynamicGrid smoothScroll={smoothScroll} smoothMouse={smoothMouse} />
          
          <Sparkles count={150} scale={60} size={2} speed={0.25} opacity={0.3} color="#00ff66" />
          <Stars radius={150} depth={40} count={1000} factor={4} saturation={0} fade speed={0.5} />
        </SceneRotator>

        <EffectComposer multisampling={0}>
          <Bloom luminanceThreshold={0.5} mipmapBlur intensity={0.5} radius={0.25} />
          <ChromaticAberration offset={[0.0006, 0.0006]} />
          <Vignette eskil={false} offset={0.15} darkness={0.65} />
          <Noise opacity={0.01} />
        </EffectComposer>

        <fog attach="fog" args={['#030303', 60, 160]} />
      </Canvas>
    </div>
  );
}

function SceneRotator({ children, smoothMouse }) {
  const groupRef = useRef();
  
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, smoothMouse.current.x * 0.15, 0.04);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -smoothMouse.current.y * 0.08, 0.04);
    }
  });
  
  return <group ref={groupRef}>{children}</group>;
}

function SceneController({ smoothMouse, smoothScroll, scrollRef }) {
  const { mouse } = useThree();
  useFrame(() => {
    smoothScroll.current = THREE.MathUtils.lerp(smoothScroll.current, scrollRef.current, 0.1);
    smoothMouse.current.x = THREE.MathUtils.lerp(smoothMouse.current.x, mouse.x, 0.04);
    smoothMouse.current.y = THREE.MathUtils.lerp(smoothMouse.current.y, mouse.y, 0.04);
  });
  return null;
}
