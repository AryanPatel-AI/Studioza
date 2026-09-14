"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { Sliders } from "lucide-react";

interface StudioLightingStage3DProps {
  className?: string;
  initialPreset?: "chiaroscuro" | "rembrandt" | "split" | "rim";
  photoTitle?: string;
}

interface LightingPreset {
  name: string;
  keyAngle: number; // in radians
  keyElevation: number;
  keyIntensity: number;
  rimAngle: number;
  rimElevation: number;
  rimIntensity: number;
  description: string;
}

const PRESETS: Record<string, LightingPreset> = {
  chiaroscuro: {
    name: "Classic Chiaroscuro",
    keyAngle: -Math.PI * 0.3,
    keyElevation: 1.8,
    keyIntensity: 3.8,
    rimAngle: Math.PI * 0.65,
    rimElevation: 1.4,
    rimIntensity: 4.2,
    description: "Deep dimensional shadows with 5200K daylight key and warm 2800K tungsten rim contour.",
  },
  rembrandt: {
    name: "Rembrandt Triangle",
    keyAngle: Math.PI * 0.25,
    keyElevation: 2.2,
    keyIntensity: 4.0,
    rimAngle: -Math.PI * 0.7,
    rimElevation: 0.9,
    rimIntensity: 3.0,
    description: "Iconic triangular cheek highlight with delicate golden tungsten ambient fill.",
  },
  split: {
    name: "Dual-Tone Split",
    keyAngle: -Math.PI * 0.5,
    keyElevation: 1.2,
    keyIntensity: 4.5,
    rimAngle: Math.PI * 0.5,
    rimElevation: 1.2,
    rimIntensity: 4.5,
    description: "Full lateral face division: 5200K Daylight on the left, Golden Amber on the right.",
  },
  rim: {
    name: "Golden Halo Rim",
    keyAngle: 0,
    keyElevation: 1.2,
    keyIntensity: 1.8,
    rimAngle: Math.PI,
    rimElevation: 1.8,
    rimIntensity: 6.0,
    description: "Silhouette-focused backlight emphasizing hair, shoulders, and ambient studio atmosphere.",
  },
};

export default function StudioLightingStage3D({
  className = "",
  initialPreset = "chiaroscuro",
  photoTitle,
}: StudioLightingStage3DProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [activePreset, setActivePreset] = useState<string>(initialPreset);
  const [keyPower, setKeyPower] = useState(3.8);
  const [rimPower, setRimPower] = useState(4.2);

  // Scene references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const keyLightRef = useRef<THREE.SpotLight | null>(null);
  const rimLightRef = useRef<THREE.SpotLight | null>(null);
  const keyStrobeMeshRef = useRef<THREE.Group | null>(null);
  const rimStrobeMeshRef = useRef<THREE.Group | null>(null);
  const subjectMeshRef = useRef<THREE.Group | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);

  // Orbit angle tracking
  const currentAngles = useRef({
    keyAngle: PRESETS[initialPreset].keyAngle,
    keyElevation: PRESETS[initialPreset].keyElevation,
    rimAngle: PRESETS[initialPreset].rimAngle,
    rimElevation: PRESETS[initialPreset].rimElevation,
  });

  const targetAngles = useRef({
    keyAngle: PRESETS[initialPreset].keyAngle,
    keyElevation: PRESETS[initialPreset].keyElevation,
    rimAngle: PRESETS[initialPreset].rimAngle,
    rimElevation: PRESETS[initialPreset].rimElevation,
  });

  // Update light 3D positions in the scene
  const updateLightPositions = useCallback(() => {
    const radius = 3.2;

    // Key Light (Blue Octabox)
    if (keyLightRef.current && keyStrobeMeshRef.current) {
      const kAngle = currentAngles.current.keyAngle;
      const kElev = currentAngles.current.keyElevation;
      const kX = Math.cos(kAngle) * radius;
      const kZ = Math.sin(kAngle) * radius;
      const kY = kElev;

      keyLightRef.current.position.set(kX, kY, kZ);
      keyStrobeMeshRef.current.position.set(kX, kY, kZ);
      keyStrobeMeshRef.current.lookAt(0, 0.4, 0);
    }

    // Rim Light (Amber Stripbox)
    if (rimLightRef.current && rimStrobeMeshRef.current) {
      const rAngle = currentAngles.current.rimAngle;
      const rElev = currentAngles.current.rimElevation;
      const rX = Math.cos(rAngle) * radius;
      const rZ = Math.sin(rAngle) * radius;
      const rY = rElev;

      rimLightRef.current.position.set(rX, rY, rZ);
      rimStrobeMeshRef.current.position.set(rX, rY, rZ);
      rimStrobeMeshRef.current.lookAt(0, 0.4, 0);
    }
  }, []);

  // Apply Preset
  const selectPreset = (key: string) => {
    const preset = PRESETS[key];
    if (!preset) return;
    setActivePreset(key);
    targetAngles.current.keyAngle = preset.keyAngle;
    targetAngles.current.keyElevation = preset.keyElevation;
    targetAngles.current.rimAngle = preset.rimAngle;
    targetAngles.current.rimElevation = preset.rimElevation;
    setKeyPower(preset.keyIntensity);
    setRimPower(preset.rimIntensity);
  };

  useEffect(() => {
    if (initialPreset && PRESETS[initialPreset]) {
      selectPreset(initialPreset);
    }
  }, [initialPreset]);

  useEffect(() => {
    if (keyLightRef.current) {
      keyLightRef.current.intensity = keyPower;
    }
  }, [keyPower]);

  useEffect(() => {
    if (rimLightRef.current) {
      rimLightRef.current.intensity = rimPower;
    }
  }, [rimPower]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 400;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 50);
    camera.position.set(0, 1.6, 4.8);
    camera.lookAt(0, 0.35, 0);
    cameraRef.current = camera;

    // 3. Renderer with shadow map support
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;

    // 4. Studio Environment
    // Seamless Studio Cyclorama Curved Floor & Backdrop (Obsidian Plaster)
    const floorGeo = new THREE.PlaneGeometry(16, 16, 32, 32);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x0c0b0a,
      roughness: 0.7,
      metalness: 0.15,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.7;
    floor.receiveShadow = true;
    scene.add(floor);

    // Subtle studio grid circles (Brass and warm charcoal)
    const gridCircle1 = new THREE.Mesh(
      new THREE.RingGeometry(1.5, 1.52, 48),
      new THREE.MeshBasicMaterial({ color: 0x26221d, side: THREE.DoubleSide })
    );
    gridCircle1.rotation.x = -Math.PI / 2;
    gridCircle1.position.y = -0.69;
    scene.add(gridCircle1);

    const gridCircle2 = new THREE.Mesh(
      new THREE.RingGeometry(3.18, 3.2, 48),
      new THREE.MeshBasicMaterial({ color: 0xd97706, side: THREE.DoubleSide, opacity: 0.25, transparent: true })
    );
    gridCircle2.rotation.x = -Math.PI / 2;
    gridCircle2.position.y = -0.69;
    scene.add(gridCircle2);

    // 5. Subject Model (Sculptural Studio Portrait Bust & Plinth)
    const subjectGroup = new THREE.Group();
    subjectMeshRef.current = subjectGroup;
    scene.add(subjectGroup);

    // Marble/Plaster Material with soft subsurface scattering look
    const bustMat = new THREE.MeshStandardMaterial({
      color: 0xe8e5df,
      roughness: 0.45,
      metalness: 0.05,
    });

    // Sculptural Head / Torso Form
    const head = new THREE.Mesh(
      new THREE.SphereGeometry(0.55, 48, 48),
      bustMat
    );
    head.scale.set(0.85, 1.15, 0.95);
    head.position.y = 0.65;
    head.castShadow = true;
    head.receiveShadow = true;
    subjectGroup.add(head);

    // Neck
    const neck = new THREE.Mesh(
      new THREE.CylinderGeometry(0.24, 0.28, 0.35, 32),
      bustMat
    );
    neck.position.y = 0.18;
    neck.castShadow = true;
    neck.receiveShadow = true;
    subjectGroup.add(neck);

    // Shoulders
    const shoulders = new THREE.Mesh(
      new THREE.CylinderGeometry(0.3, 0.85, 0.5, 32),
      bustMat
    );
    shoulders.scale.set(1.4, 0.9, 0.85);
    shoulders.position.y = -0.15;
    shoulders.castShadow = true;
    shoulders.receiveShadow = true;
    subjectGroup.add(shoulders);

    // Plinth Pedestal
    const pedestal = new THREE.Mesh(
      new THREE.CylinderGeometry(0.55, 0.65, 0.4, 32),
      new THREE.MeshStandardMaterial({ color: 0x141210, roughness: 0.85, metalness: 0.15 })
    );
    pedestal.position.y = -0.5;
    pedestal.castShadow = true;
    pedestal.receiveShadow = true;
    subjectGroup.add(pedestal);

    // 6. Strobes Construction
    const strobeBodyMat = new THREE.MeshStandardMaterial({
      color: 0x141210,
      metalness: 0.85,
      roughness: 0.25,
    });

    // Key Light: 5200K Daylight Octabox
    const keyGroup = new THREE.Group();
    keyStrobeMeshRef.current = keyGroup;
    scene.add(keyGroup);

    // Octabox Mesh
    const keyOcta = new THREE.Mesh(
      new THREE.CylinderGeometry(0.6, 0.25, 0.4, 8),
      new THREE.MeshStandardMaterial({ color: 0x181512, roughness: 0.4 })
    );
    keyOcta.rotation.x = Math.PI / 2;
    keyGroup.add(keyOcta);

    // Octabox Diffuser Screen (Glowing warm daylight)
    const keyScreen = new THREE.Mesh(
      new THREE.CircleGeometry(0.58, 8),
      new THREE.MeshBasicMaterial({ color: 0xfffaed })
    );
    keyScreen.position.z = 0.205;
    keyGroup.add(keyScreen);

    // Key SpotLight (5200K Soft Studio Flash)
    const keyLight = new THREE.SpotLight(0xfffaed, keyPower, 12, Math.PI / 4, 0.45, 1.2);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0005;
    keyLight.target = subjectGroup;
    scene.add(keyLight);
    keyLightRef.current = keyLight;

    // Rim Light: Golden Amber Stripbox (2800K Tungsten Rim)
    const rimGroup = new THREE.Group();
    rimStrobeMeshRef.current = rimGroup;
    scene.add(rimGroup);

    // Stripbox Mesh (Tall rectangular softbox)
    const rimStrip = new THREE.Mesh(
      new THREE.BoxGeometry(0.35, 0.9, 0.35),
      strobeBodyMat
    );
    rimGroup.add(rimStrip);

    // Stripbox Diffuser Screen (Glowing amber)
    const rimScreen = new THREE.Mesh(
      new THREE.PlaneGeometry(0.32, 0.85),
      new THREE.MeshBasicMaterial({ color: 0xf59e0b })
    );
    rimScreen.position.z = 0.18;
    rimGroup.add(rimScreen);

    // Rim SpotLight
    const rimLight = new THREE.SpotLight(0xf59e0b, rimPower, 12, Math.PI / 3.5, 0.5, 1.2);
    rimLight.castShadow = true;
    rimLight.shadow.mapSize.width = 1024;
    rimLight.shadow.mapSize.height = 1024;
    rimLight.shadow.bias = -0.0005;
    rimLight.target = subjectGroup;
    scene.add(rimLight);
    rimLightRef.current = rimLight;

    // Ambient Fill (Deep Warm Obsidian Atmosphere)
    const ambient = new THREE.AmbientLight(0x14110e, 0.8);
    scene.add(ambient);

    // Update positions initially
    updateLightPositions();

    // 7. Viewport Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          isVisibleRef.current = e.isIntersecting;
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    // 8. Resize Handler
    const onResize = () => {
      if (!container || !renderer || !camera) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener("resize", onResize);

    // 9. Render Loop with Smooth Interpolation
    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);

      if (!isVisibleRef.current) return;

      // Smooth interpolation towards target preset angles
      currentAngles.current.keyAngle +=
        (targetAngles.current.keyAngle - currentAngles.current.keyAngle) * 0.08;
      currentAngles.current.keyElevation +=
        (targetAngles.current.keyElevation - currentAngles.current.keyElevation) * 0.08;
      currentAngles.current.rimAngle +=
        (targetAngles.current.rimAngle - currentAngles.current.rimAngle) * 0.08;
      currentAngles.current.rimElevation +=
        (targetAngles.current.rimElevation - currentAngles.current.rimElevation) * 0.08;

      updateLightPositions();

      renderer.render(scene, camera);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      observer.disconnect();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", onResize);

      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
      renderer.dispose();
    };
  }, [updateLightPositions]);

  return (
    <div
      ref={containerRef}
      className={`relative rounded-3xl border border-white/[0.1] bg-[#0c0b0a]/90 backdrop-blur-2xl overflow-hidden shadow-2xl ${className}`}
    >
      {/* 3D WebGL Canvas */}
      <canvas ref={canvasRef} className="w-full h-full min-h-[340px] block" />

      {/* Top Telemetry Header */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-wider bg-white/[0.05] border border-white/[0.1] text-amber-300 backdrop-blur-md flex items-center gap-1.5 shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            3D Studio Lighting Simulator
          </span>
          {photoTitle && (
            <span className="hidden sm:inline-block px-2.5 py-1 rounded-full text-[10px] font-mono bg-black/60 border border-white/10 text-zinc-300 backdrop-blur-md">
              Plate Target: {photoTitle}
            </span>
          )}
        </div>

        {/* Live Strobe Power Indicators */}
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-white/[0.05] border border-white/[0.1] text-zinc-200 backdrop-blur-md">
            Key: 5200K Daylight
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-amber-950/40 border border-amber-400/30 text-amber-300 backdrop-blur-md">
            Rim: 2800K Tungsten
          </span>
        </div>
      </div>

      {/* Lighting Schematic Presets */}
      <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-[#141210]/90 border border-white/[0.1] backdrop-blur-xl flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono tracking-wider text-zinc-200 font-semibold flex items-center gap-1.5">
            <Sliders className="w-3 h-3 text-amber-400" />
            Active Schematic: {PRESETS[activePreset]?.name}
          </span>
          <span className="text-[10px] font-mono text-zinc-400 hidden sm:inline">
            {PRESETS[activePreset]?.description}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {Object.entries(PRESETS).map(([key, preset]) => (
            <button
              key={key}
              onClick={() => selectPreset(key)}
              className={`px-3 py-2 rounded-xl text-xs font-mono transition-all text-left flex flex-col cursor-pointer ${
                activePreset === key
                  ? "bg-amber-400 text-black font-semibold shadow-md shadow-amber-500/20"
                  : "bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 border border-white/[0.08]"
              }`}
            >
              <span className="truncate">{preset.name}</span>
              <span
                className={`text-[9px] ${
                  activePreset === key ? "text-zinc-900 font-medium" : "text-zinc-400"
                }`}
              >
                {key === "chiaroscuro" ? "45° Daylight Key" : key === "rembrandt" ? "Cheek Triangle" : key === "split" ? "Lateral Divide" : "Backlight Halo"}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
