'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, Environment, Float, Sparkles } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function Cup() {
  const group = useRef<THREE.Group>(null);
  const target = useRef(new THREE.Vector2());
  useFrame((state) => {
    if (!group.current) return;
    target.current.lerp(new THREE.Vector2(state.pointer.x * 0.18, state.pointer.y * 0.12), 0.04);
    group.current.rotation.y += (target.current.x - group.current.rotation.y) * 0.025;
    group.current.rotation.x += (-target.current.y - group.current.rotation.x) * 0.025;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.85) * 0.09;
  });
  return <group ref={group}>
    <mesh castShadow receiveShadow><cylinderGeometry args={[1.12, 1.02, 1.45, 64]} /><meshPhysicalMaterial color="#171310" roughness={0.2} metalness={0.18} clearcoat={0.7} /></mesh>
    <mesh position={[0,0.72,0]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[0.52,0.115,24,64]} /><meshStandardMaterial color="#d2ad70" roughness={0.18} metalness={0.9} /></mesh>
    <mesh position={[0,0.76,0]} rotation={[-Math.PI/2,0,0]}><cylinderGeometry args={[0.83,0.83,0.035,64]} /><meshStandardMaterial color="#28160d" roughness={0.3} /></mesh>
    <mesh position={[1.08,0.05,0]} rotation={[0,0,Math.PI/2]}><torusGeometry args={[0.38,0.115,20,48,Math.PI*1.45]} /><meshStandardMaterial color="#d2ad70" metalness={0.9} roughness={0.18} /></mesh>
    <mesh position={[0,0.79,0]} rotation={[-Math.PI/2,0,0]}><torusGeometry args={[0.3,0.018,12,64]} /><meshStandardMaterial color="#9d6332" emissive="#5a2c12" emissiveIntensity={1.5} /></mesh>
  </group>;
}

function Beans() {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => { if (group.current) group.current.rotation.y += delta * 0.055; });
  return <group ref={group}>{Array.from({length:28}).map((_,i)=>{const a=(i/28)*Math.PI*2;const r=2.65+(i%5)*0.28;return <mesh key={i} position={[Math.cos(a)*r,Math.sin(a*2.1)*1.1,Math.sin(a)*r]} rotation={[a,a*.7,a*.4]}><sphereGeometry args={[0.075+(i%3)*.018,12,10]}/><meshStandardMaterial color="#6b3b1d" roughness={.55}/></mesh>})}</group>;
}

function CameraRig() { const { camera } = useThree(); useFrame((state)=>{camera.position.x += (state.pointer.x*.35-camera.position.x)*.015;camera.position.y += ((1.05+state.pointer.y*.18)-camera.position.y)*.015;camera.lookAt(0,.15,0);}); return null; }

export default function CafeScene(){return <div className="scene-wrap"><Canvas shadows dpr={[1,1.65]} camera={{position:[0,1.05,7.4],fov:37}} gl={{antialias:true,powerPreference:'high-performance'}}><CameraRig/><ambientLight intensity={.55}/><spotLight castShadow position={[4.5,6,4]} intensity={90} angle={.28} penumbra={1}/><pointLight position={[-4,1,2]} intensity={22} color="#d28a3c"/><pointLight position={[1,-1,-2]} intensity={8} color="#7b3f1f"/><Float speed={1.3} rotationIntensity={.08} floatIntensity={.22}><Cup/></Float><Beans/><Sparkles count={90} scale={8} size={1.25} speed={.25} color="#d8b77d"/><Environment preset="studio"/><ContactShadows position={[0,-1.4,0]} opacity={.5} scale={7} blur={2.8} far={4}/></Canvas></div>}