'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, Environment, Float, Sparkles } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function CoffeeCup() {
  const group = useRef<THREE.Group>(null);
  const target = useRef(new THREE.Vector2());
  useFrame((state) => {
    if (!group.current) return;
    target.current.lerp(new THREE.Vector2(state.pointer.x * 0.28, state.pointer.y * 0.16), 0.045);
    group.current.rotation.y += (target.current.x - group.current.rotation.y) * 0.035;
    group.current.rotation.x += (-target.current.y - group.current.rotation.x) * 0.035;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.9) * 0.1;
  });

  return <group ref={group}>
    <mesh castShadow receiveShadow position={[0, 0, 0]}>
      <cylinderGeometry args={[1.08, 0.94, 1.38, 64]} />
      <meshPhysicalMaterial color="#17130f" roughness={0.16} metalness={0.2} clearcoat={1} clearcoatRoughness={0.12} />
    </mesh>
    <mesh position={[0, 0.7, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[0.49, 0.12, 28, 64]} />
      <meshPhysicalMaterial color="#d4ae70" roughness={0.15} metalness={0.95} />
    </mesh>
    <mesh position={[0, 0.73, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[0.82, 0.82, 0.045, 64]} />
      <meshStandardMaterial color="#24140c" roughness={0.2} />
    </mesh>
    <mesh position={[0, 0.755, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <torusGeometry args={[0.3, 0.018, 16, 64]} />
      <meshStandardMaterial color="#c47b35" emissive="#6b3211" emissiveIntensity={2} />
    </mesh>
    <mesh position={[1.04, 0.02, 0]} rotation={[0, 0, Math.PI / 2]}>
      <torusGeometry args={[0.37, 0.11, 24, 48, Math.PI * 1.48]} />
      <meshPhysicalMaterial color="#d4ae70" roughness={0.14} metalness={0.95} />
    </mesh>
    <mesh position={[0, -0.76, 0]} scale={[1.25, 0.08, 1.25]}>
      <cylinderGeometry args={[0.9, 0.9, 1, 64]} />
      <meshStandardMaterial color="#090807" roughness={0.25} />
    </mesh>
  </group>;
}

function Steam() {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (group.current) group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.7) * 0.06;
  });
  return <group ref={group} position={[0, 1.15, 0]}>
    <mesh position={[-0.18, 0.65, 0]} rotation={[0, 0, -0.22]}>
      <torusKnotGeometry args={[0.2, 0.035, 96, 12, 2, 3]} />
      <meshStandardMaterial color="#e8d8bd" transparent opacity={0.22} emissive="#cda36b" emissiveIntensity={0.5} />
    </mesh>
    <mesh position={[0.18, 1.0, 0]} rotation={[0, 0, 0.2]} scale={0.72}>
      <torusKnotGeometry args={[0.2, 0.035, 96, 12, 2, 3]} />
      <meshStandardMaterial color="#e8d8bd" transparent opacity={0.16} emissive="#cda36b" emissiveIntensity={0.4} />
    </mesh>
  </group>;
}

function EspressoMachine() {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (group.current) group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.35) * 0.04;
  });
  return <group ref={group} position={[2.05, -0.45, -0.8]} scale={0.75}>
    <mesh castShadow><boxGeometry args={[1.5, 2.2, 0.85]} /><meshPhysicalMaterial color="#24211d" metalness={0.72} roughness={0.22} clearcoat={0.5} /></mesh>
    <mesh position={[0, 0.65, 0.46]}><boxGeometry args={[1.05, 0.45, 0.08]} /><meshStandardMaterial color="#0d0c0a" metalness={0.7} roughness={0.16} /></mesh>
    <mesh position={[-0.38, 0.35, 0.48]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.2, 0.2, 0.08, 32]} /><meshStandardMaterial color="#c79a5b" metalness={0.85} roughness={0.15} /></mesh>
    <mesh position={[0.38, 0.35, 0.48]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.2, 0.2, 0.08, 32]} /><meshStandardMaterial color="#c79a5b" metalness={0.85} roughness={0.15} /></mesh>
    <mesh position={[0, -0.18, 0.48]}><boxGeometry args={[0.95, 0.06, 0.08]} /><meshStandardMaterial color="#c79a5b" emissive="#4b2b12" emissiveIntensity={1.2} metalness={0.8} /></mesh>
    <mesh position={[0, -0.8, 0.5]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.27, 0.035, 16, 48]} /><meshStandardMaterial color="#d4ae70" metalness={0.9} /></mesh>
  </group>;
}

function Table() {
  return <group position={[0, -1.45, 0]}>
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}><cylinderGeometry args={[4.8, 4.8, 0.12, 96]} /><meshPhysicalMaterial color="#171411" roughness={0.28} metalness={0.35} /></mesh>
    <mesh position={[0, -0.85, 0]}><cylinderGeometry args={[1.8, 2.2, 1.6, 64]} /><meshStandardMaterial color="#0c0b09" roughness={0.5} /></mesh>
    <mesh position={[0, 0.07, 0]} rotation={[-Math.PI / 2, 0, 0]}><torusGeometry args={[4.1, 0.025, 12, 96]} /><meshStandardMaterial color="#8e6737" emissive="#5c3816" emissiveIntensity={0.8} /></mesh>
  </group>;
}

function Beans() {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => { if (group.current) group.current.rotation.y += delta * 0.045; });
  return <group ref={group}>{Array.from({ length: 42 }).map((_, i) => {
    const a = (i / 42) * Math.PI * 2;
    const r = 2.7 + (i % 7) * 0.22;
    return <mesh key={i} position={[Math.cos(a) * r, Math.sin(a * 2.4) * 0.8 + 0.1, Math.sin(a) * r]} rotation={[a * 1.3, a * 0.8, a * 0.5]}>
      <sphereGeometry args={[0.055 + (i % 4) * 0.012, 12, 10]} />
      <meshStandardMaterial color={i % 3 === 0 ? '#9b5a2e' : '#4c2816'} roughness={0.58} />
    </mesh>;
  })}</group>;
}

function FloatingRings() {
  return <group position={[-2.35, 0.25, -0.4]}>
    {[1.05, 1.35, 1.65].map((r, i) => <mesh key={r} rotation={[Math.PI / 2, i * 0.4, i * 0.2]}>
      <torusGeometry args={[r, 0.012, 12, 96]} />
      <meshStandardMaterial color="#b9894e" transparent opacity={0.22 - i * 0.04} emissive="#5c3516" emissiveIntensity={1} />
    </mesh>)}
  </group>;
}

function CameraRig() {
  const { camera } = useThree();
  useFrame((state) => {
    camera.position.x += (state.pointer.x * 0.65 - camera.position.x) * 0.018;
    camera.position.y += ((0.6 + state.pointer.y * 0.3) - camera.position.y) * 0.018;
    camera.position.z += (6.8 + Math.abs(state.pointer.x) * 0.35 - camera.position.z) * 0.012;
    camera.lookAt(0, -0.15, 0);
  });
  return null;
}

export default function CafeScene() {
  return <div className="scene-wrap">
    <Canvas shadows dpr={[1, 1.65]} camera={{ position: [0, 0.6, 6.8], fov: 38 }} gl={{ antialias: true, powerPreference: 'high-performance' }}>
      <color attach="background" args={['#090806']} />
      <fog attach="fog" args={['#090806', 5, 12]} />
      <CameraRig />
      <ambientLight intensity={0.38} />
      <spotLight castShadow position={[4.5, 6, 3]} intensity={120} angle={0.3} penumbra={1} />
      <spotLight position={[-4, 4, 1]} intensity={45} angle={0.45} penumbra={1} color="#c77c34" />
      <pointLight position={[-3, 0.2, 2]} intensity={24} color="#8d4b21" />
      <pointLight position={[2, 1, -2]} intensity={15} color="#d2a15e" />
      <Float speed={1.15} rotationIntensity={0.1} floatIntensity={0.18}><CoffeeCup /></Float>
      <Steam />
      <EspressoMachine />
      <FloatingRings />
      <Beans />
      <Table />
      <Sparkles count={130} scale={8} size={1.1} speed={0.22} color="#d9b678" />
      <Environment preset="city" />
      <ContactShadows position={[0, -1.42, 0]} opacity={0.65} scale={8} blur={2.6} far={5} />
    </Canvas>
  </div>;
}
