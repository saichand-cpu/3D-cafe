'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, ContactShadows, Sparkles, RoundedBox, OrbitControls } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function Cup() {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.18;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.08;
  });
  return (
    <group ref={group}>
      <RoundedBox args={[2.35, 1.45, 2.35]} radius={0.28} smoothness={5} position={[0, 0, 0]}>
        <meshStandardMaterial color="#11100e" roughness={0.24} metalness={0.22} />
      </RoundedBox>
      <mesh torusGeometry={[0.52, 0.13, 24, 64]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0.73, 0]}>
        <meshStandardMaterial color="#c9a66b" roughness={0.22} metalness={0.82} />
      </mesh>
      <mesh position={[0, 0.77, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.82, 0.82, 0.035, 64]} />
        <meshStandardMaterial color="#28170d" roughness={0.3} />
      </mesh>
      <mesh position={[1.22, 0.1, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.43, 0.13, 20, 48, Math.PI * 1.35]} />
        <meshStandardMaterial color="#c9a66b" metalness={0.85} roughness={0.2} />
      </mesh>
    </group>
  );
}

function Beans() {
  return <group>{Array.from({ length: 18 }).map((_, i) => {
    const a = (i / 18) * Math.PI * 2;
    const r = 2.8 + (i % 3) * 0.35;
    return <mesh key={i} position={[Math.cos(a) * r, Math.sin(a * 1.7) * 0.8, Math.sin(a) * r]} rotation={[a, a * 0.7, a * 0.4]}>
      <sphereGeometry args={[0.11 + (i % 2) * 0.035, 16, 12]} />
      <meshStandardMaterial color="#6f4020" roughness={0.48} />
    </mesh>;
  })}</group>;
}

export default function CafeScene() {
  return <div className="scene-wrap"><Canvas camera={{ position: [0, 1.1, 7.6], fov: 38 }} dpr={[1, 1.6]}>
    <ambientLight intensity={0.7} />
    <spotLight position={[4, 6, 4]} intensity={85} angle={0.32} penumbra={1} />
    <pointLight position={[-4, 1, 2]} intensity={20} color="#d69a4a" />
    <Float speed={1.4} rotationIntensity={0.18} floatIntensity={0.25}><Cup /></Float>
    <Beans />
    <Sparkles count={75} scale={8} size={1.4} speed={0.35} color="#d7b477" />
    <Environment preset="studio" />
    <ContactShadows position={[0, -1.25, 0]} opacity={0.5} scale={8} blur={2.8} far={4} />
    <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
  </Canvas></div>;
}