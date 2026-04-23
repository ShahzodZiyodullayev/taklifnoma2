import { useRef, useMemo, useCallback, useState } from "react";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import * as THREE from "three";

/* ─── golden floating particles ─── */

const PARTICLE_COUNT = 120;

const GoldenParticles = () => {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    return Array.from({ length: PARTICLE_COUNT }, () => ({
      x: (Math.random() - 0.5) * 14,
      y: (Math.random() - 0.5) * 20,
      z: (Math.random() - 0.5) * 10,
      speed: 0.002 + Math.random() * 0.008,
      offset: Math.random() * Math.PI * 2,
      scale: 0.02 + Math.random() * 0.04,
    }));
  }, []);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    particles.forEach((particle, index) => {
      const wobbleX = Math.sin(time * 0.3 + particle.offset) * 0.5;
      const wobbleZ = Math.cos(time * 0.2 + particle.offset * 1.3) * 0.3;
      const yPos = ((particle.y + time * particle.speed * 60) % 20) - 10;

      dummy.position.set(particle.x + wobbleX, yPos, particle.z + wobbleZ);
      dummy.scale.setScalar(particle.scale * (0.7 + Math.sin(time * 2 + particle.offset) * 0.3));
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(index, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, PARTICLE_COUNT]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#f1c98d" transparent opacity={0.6} />
    </instancedMesh>
  );
};

/* ─── orbiting wedding rings ─── */

const WeddingRings = () => {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    groupRef.current.rotation.y = time * 0.15;
    groupRef.current.rotation.x = Math.sin(time * 0.1) * 0.15;
  });

  return (
    <group ref={groupRef} position={[0, 2, -2]}>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
        <mesh rotation={[Math.PI / 2, 0, 0.3]} position={[-0.4, 0, 0]}>
          <torusGeometry args={[0.8, 0.06, 16, 48]} />
          <meshStandardMaterial
            color="#f1c98d"
            emissive="#f1c98d"
            emissiveIntensity={0.4}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      </Float>
      <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.5}>
        <mesh rotation={[Math.PI / 2, 0, -0.3]} position={[0.4, 0, 0]}>
          <torusGeometry args={[0.8, 0.06, 16, 48]} />
          <meshStandardMaterial
            color="#e8b87a"
            emissive="#e8b87a"
            emissiveIntensity={0.4}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      </Float>
    </group>
  );
};

/* ─── 3D heart shape ─── */

const createHeartShape = () => {
  const shape = new THREE.Shape();
  const x = 0;
  const y = 0;

  shape.moveTo(x, y + 0.35);
  shape.bezierCurveTo(x, y + 0.35, x - 0.05, y, x - 0.35, y);
  shape.bezierCurveTo(x - 0.7, y, x - 0.7, y + 0.35, x - 0.7, y + 0.35);
  shape.bezierCurveTo(x - 0.7, y + 0.55, x - 0.525, y + 0.714, x, y + 0.95);
  shape.bezierCurveTo(x + 0.525, y + 0.714, x + 0.7, y + 0.55, x + 0.7, y + 0.35);
  shape.bezierCurveTo(x + 0.7, y + 0.35, x + 0.7, y, x + 0.35, y);
  shape.bezierCurveTo(x + 0.05, y, x, y + 0.35, x, y + 0.35);

  return shape;
};

const FloatingHearts = () => {
  const groupRef = useRef<THREE.Group>(null!);

  const hearts = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        position: [
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 14,
          -3 - Math.random() * 4,
        ] as [number, number, number],
        scale: 0.15 + Math.random() * 0.2,
        speed: 0.5 + Math.random() * 1,
        rotSpeed: 0.2 + Math.random() * 0.4,
        offset: (i / 8) * Math.PI * 2,
      })),
    [],
  );

  const heartShape = useMemo(createHeartShape, []);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    groupRef.current.children.forEach((child, index) => {
      const heart = hearts[index];
      child.position.y = heart.position[1] + Math.sin(time * heart.speed + heart.offset) * 1.2;
      child.rotation.z = Math.sin(time * heart.rotSpeed + heart.offset) * 0.3;
      const pulse = 1 + Math.sin(time * 2 + heart.offset) * 0.1;
      child.scale.setScalar(heart.scale * pulse);
    });
  });

  return (
    <group ref={groupRef}>
      {hearts.map((heart, i) => (
        <mesh key={i} position={heart.position} scale={heart.scale} rotation={[0, 0, Math.PI]}>
          <shapeGeometry args={[heartShape]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? "#f1a9a3" : "#f1c98d"}
            transparent
            opacity={0.25}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
};

/* ─── click ripple particles ─── */

type Ripple = {
  id: number;
  position: THREE.Vector3;
  startTime: number;
};

const RIPPLE_PARTICLE_COUNT = 24;

const ClickRipple = ({ position, startTime }: { position: THREE.Vector3; startTime: number }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null!);

  const particles = useMemo(
    () =>
      Array.from({ length: RIPPLE_PARTICLE_COUNT }, (_, i) => ({
        angle: (i / RIPPLE_PARTICLE_COUNT) * Math.PI * 2,
        speed: 1.5 + Math.random() * 2,
        ySpeed: (Math.random() - 0.3) * 3,
        scale: 0.03 + Math.random() * 0.04,
      })),
    [],
  );

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime() - startTime;
    const progress = Math.min(elapsed / 1.5, 1);
    const opacity = Math.max(0, 1 - progress);

    if (materialRef.current) {
      materialRef.current.opacity = opacity * 0.8;
    }

    particles.forEach((p, i) => {
      const dist = p.speed * progress;
      dummy.position.set(
        position.x + Math.cos(p.angle) * dist,
        position.y + p.ySpeed * progress,
        position.z + Math.sin(p.angle) * dist,
      );
      dummy.scale.setScalar(p.scale * (1 - progress * 0.5));
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, RIPPLE_PARTICLE_COUNT]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial ref={materialRef} color="#f1c98d" transparent />
    </instancedMesh>
  );
};

/* ─── ornamental spiral DNA-like ribbon ─── */

const GoldenRibbon = () => {
  const meshRef = useRef<THREE.Mesh>(null!);

  const geometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i < 200; i++) {
      const t = (i / 200) * Math.PI * 6;
      points.push(new THREE.Vector3(Math.cos(t) * 2, (i / 200) * 16 - 8, Math.sin(t) * 2));
    }
    const curve = new THREE.CatmullRomCurve3(points);
    return new THREE.TubeGeometry(curve, 200, 0.015, 8, false);
  }, []);

  useFrame(({ clock }) => {
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.05;
  });

  return (
    <mesh ref={meshRef} geometry={geometry} position={[0, 0, -4]}>
      <meshBasicMaterial color="#f1c98d" transparent opacity={0.12} />
    </mesh>
  );
};

/* ─── main scene ─── */

const SceneContent = () => {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const clockRef = useRef({ time: 0 });

  useFrame(({ clock }) => {
    clockRef.current.time = clock.getElapsedTime();
  });

  const handleClick = useCallback(
    (event: ThreeEvent<PointerEvent>) => {
      event.stopPropagation();
      const point = event.point.clone();
      const id = Date.now() + Math.random();
      const startTime = clockRef.current.time;

      setRipples(prev => [...prev.slice(-5), { id, position: point, startTime }]);

      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== id));
      }, 1600);
    },
    [],
  );

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 8, 5]} intensity={0.6} color="#f1c98d" />
      <pointLight position={[-5, -3, 3]} intensity={0.3} color="#7ed7bb" />

      <Stars radius={50} depth={50} count={1500} factor={3} saturation={0.1} fade speed={0.5} />

      <GoldenParticles />
      <WeddingRings />
      <FloatingHearts />
      <GoldenRibbon />

      {/* invisible click plane */}
      <mesh onPointerDown={handleClick} visible={false}>
        <planeGeometry args={[40, 40]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {ripples.map(ripple => (
        <ClickRipple key={ripple.id} position={ripple.position} startTime={ripple.startTime} />
      ))}
    </>
  );
};

export const Scene3D = () => {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
      }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}>
        <SceneContent />
      </Canvas>
    </div>
  );
};
