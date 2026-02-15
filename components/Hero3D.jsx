'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function BoCore({ mouse }) {
  const meshRef = useRef();
  const glowRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.2 + mouse.current[1] * 0.3;
      meshRef.current.rotation.y = Math.cos(t * 0.2) * 0.3 + mouse.current[0] * 0.3;
      meshRef.current.position.y = Math.sin(t * 0.5) * 0.15;
    }
    if (glowRef.current) {
      glowRef.current.rotation.x = -Math.sin(t * 0.2) * 0.1;
      glowRef.current.rotation.y = -Math.cos(t * 0.3) * 0.2;
    }
  });

  return (
    <group>
      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.8}>
        <mesh ref={meshRef} scale={1.8}>
          <icosahedronGeometry args={[1, 8]} />
          <MeshDistortMaterial
            color="#2D9CDB"
            emissive="#1A5F7A"
            emissiveIntensity={0.4}
            roughness={0.2}
            metalness={0.8}
            distort={0.35}
            speed={2}
            transparent
            opacity={0.9}
          />
        </mesh>
      </Float>

      <mesh ref={glowRef} scale={1.5}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#56CCF2" transparent opacity={0.15} />
      </mesh>

      <mesh scale={2.8}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#2D9CDB" transparent opacity={0.05} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}

function OrbitingParticles({ mouse }) {
  const groupRef = useRef();
  const count = 6;
  const colors = ['#56CCF2', '#FF6B9D', '#F2C94C', '#2D9CDB', '#56CCF2', '#FF6B9D'];

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.15 + mouse.current[0] * 0.5;
      groupRef.current.rotation.x = Math.sin(t * 0.1) * 0.2 + mouse.current[1] * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * Math.PI * 2;
        const radius = 2.8 + Math.sin(i * 1.5) * 0.4;
        const y = Math.cos(i * 0.8) * 0.8;
        return (
          <Float key={i} speed={3 + i * 0.5} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh position={[Math.cos(angle) * radius, y, Math.sin(angle) * radius]} scale={0.15 + i * 0.03}>
              <dodecahedronGeometry args={[1, 0]} />
              <MeshDistortMaterial
                color={colors[i]}
                emissive={colors[i]}
                emissiveIntensity={0.6}
                distort={0.3}
                speed={3}
                roughness={0.1}
                metalness={0.9}
              />
            </mesh>
          </Float>
        );
      })}
    </group>
  );
}

function HomeworkFragments() {
  const groupRef = useRef();
  const fragments = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6 - 3,
      ],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
      scale: 0.08 + Math.random() * 0.06,
      speed: 0.2 + Math.random() * 0.5,
    }));
  }, []);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        const t = clock.getElapsedTime();
        const f = fragments[i];
        if (f) {
          child.position.y = f.position[1] + Math.sin(t * f.speed + i) * 0.5;
          child.rotation.z = Math.sin(t * f.speed * 0.5 + i) * 0.3;
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {fragments.map((f, i) => (
        <mesh key={i} position={f.position} rotation={f.rotation} scale={f.scale}>
          <boxGeometry args={[1, 1, 0.1]} />
          <meshBasicMaterial color="#56CCF2" transparent opacity={0.12} />
        </mesh>
      ))}
    </group>
  );
}

function SceneContent({ mouse }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#56CCF2" />
      <pointLight position={[-5, -3, 3]} intensity={0.6} color="#FF6B9D" />
      <pointLight position={[0, 3, -5]} intensity={0.4} color="#F2C94C" />
      <BoCore mouse={mouse} />
      <OrbitingParticles mouse={mouse} />
      <HomeworkFragments />
      <Sparkles count={80} scale={10} size={2} speed={0.4} color="#56CCF2" opacity={0.5} />
    </>
  );
}

function MouseTracker({ mouse }) {
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current = [
        (e.clientX / window.innerWidth - 0.5) * 2,
        -(e.clientY / window.innerHeight - 0.5) * 2,
      ];
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouse]);

  return null;
}

export default function Hero3D() {
  const mouse = useRef([0, 0]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="absolute inset-0 w-full h-full bg-dark-bg">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 rounded-full bg-primary-blue/20 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <MouseTracker mouse={mouse} />
        <SceneContent mouse={mouse} />
      </Canvas>
    </div>
  );
}
