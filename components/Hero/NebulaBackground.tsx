"use client";

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface NebulaBackgroundProps {
  className?: string;
}

export default function NebulaBackground({ className = '' }: NebulaBackgroundProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;
    
    // Check for WebGL support
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    if (!gl) {
      setFallback(true);
      return;
    }
    
    const currentMount = mountRef.current;

    try {
      // Scene setup
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      // Camera setup
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 1;

      // Renderer setup
      const renderer = new THREE.WebGLRenderer({ 
        alpha: true, 
        antialias: true,
        powerPreference: "high-performance"
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      rendererRef.current = renderer;

      currentMount.appendChild(renderer.domElement);

    // Create nebula material with custom shader
    const nebulaVertexShader = `
      varying vec2 vUv;
      varying vec3 vPosition;
      
      void main() {
        vUv = uv;
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const nebulaFragmentShader = `
      uniform float time;
      uniform vec2 resolution;
      varying vec2 vUv;
      varying vec3 vPosition;

      // Noise function
      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
      }

      float noise(vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }

      float fbm(vec2 st) {
        float value = 0.0;
        float amplitude = 0.5;
        float frequency = 0.0;
        for (int i = 0; i < 6; i++) {
          value += amplitude * noise(st);
          st *= 2.0;
          amplitude *= 0.5;
        }
        return value;
      }

      void main() {
        vec2 st = vUv * 3.0;
        
        // Create swirling motion
        float angle = time * 0.1;
        mat2 rotation = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
        st = rotation * st;
        
        // Generate nebula pattern
        float nebula1 = fbm(st + time * 0.05);
        float nebula2 = fbm(st * 1.5 + time * 0.03);
        float nebula3 = fbm(st * 0.5 + time * 0.02);
        
        // Combine layers
        float combined = nebula1 * 0.6 + nebula2 * 0.3 + nebula3 * 0.1;
        
        // Create color gradient from center
        vec2 center = vUv - 0.5;
        float dist = length(center);
        
        // Netflix red and cosmic blues/purples
        vec3 color1 = vec3(0.9, 0.04, 0.08); // Netflix red
        vec3 color2 = vec3(0.25, 0.41, 0.88); // Royal blue
        vec3 color3 = vec3(0.54, 0.17, 0.89); // Purple
        vec3 color4 = vec3(0.05, 0.05, 0.2); // Dark blue
        
        // Mix colors based on noise and distance
        vec3 finalColor = mix(color4, color1, combined * 0.8);
        finalColor = mix(finalColor, color2, nebula2 * 0.6);
        finalColor = mix(finalColor, color3, nebula3 * 0.4);
        
        // Fade to black at edges and create depth
        float alpha = combined * 0.8 * (1.0 - dist * 1.5);
        alpha = clamp(alpha, 0.0, 0.7);
        
        // Add subtle breathing effect
        alpha *= (sin(time * 0.5) * 0.1 + 0.9);
        
        gl_FragColor = vec4(finalColor, alpha);
      }
    `;

    // Create nebula plane
    const nebulaGeometry = new THREE.PlaneGeometry(4, 4);
    const nebulaMaterial = new THREE.ShaderMaterial({
      vertexShader: nebulaVertexShader,
      fragmentShader: nebulaFragmentShader,
      uniforms: {
        time: { value: 0 },
        resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
    });

    const nebulaMesh = new THREE.Mesh(nebulaGeometry, nebulaMaterial);
    nebulaMesh.position.z = -2;
    scene.add(nebulaMesh);

    // Create star field
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 1000;
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    const starSizes = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {
      // Position
      starPositions[i * 3] = (Math.random() - 0.5) * 10;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 5 - 2;

      // Colors - mix of white, blue, and red tints
      const colorChoice = Math.random();
      if (colorChoice < 0.7) {
        // White stars
        starColors[i * 3] = 1;
        starColors[i * 3 + 1] = 1;
        starColors[i * 3 + 2] = 1;
      } else if (colorChoice < 0.85) {
        // Blue tint
        starColors[i * 3] = 0.8;
        starColors[i * 3 + 1] = 0.9;
        starColors[i * 3 + 2] = 1;
      } else {
        // Red tint
        starColors[i * 3] = 1;
        starColors[i * 3 + 1] = 0.8;
        starColors[i * 3 + 2] = 0.8;
      }

      // Size
      starSizes[i] = Math.random() * 3 + 1;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
    starGeometry.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));

    const starMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        varying float vSize;
        
        void main() {
          vColor = color;
          vSize = size;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vSize;
        
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          
          float alpha = 1.0 - (dist * 2.0);
          alpha = pow(alpha, 2.0);
          
          gl_FragColor = vec4(vColor, alpha * 0.8);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
    });

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Animation loop
    const clock = new THREE.Clock();
    
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      
      const elapsed = clock.getElapsedTime();
      
      // Update nebula animation
      nebulaMaterial.uniforms.time.value = elapsed;
      
      // Slowly rotate the nebula
      nebulaMesh.rotation.z = elapsed * 0.02;
      
      // Gentle star movement
      stars.rotation.z = elapsed * 0.01;
      stars.rotation.y = elapsed * 0.005;
      
      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!renderer || !camera) return;
      
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      
      nebulaMaterial.uniforms.resolution.value.set(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      
      // Dispose of Three.js objects
      renderer.dispose();
      nebulaGeometry.dispose();
      nebulaMaterial.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
    };
    
    } catch (error) {
      console.error('Three.js initialization failed:', error);
      setFallback(true);
    }
  }, []);

  return (
    <div 
      ref={mountRef} 
      className={`absolute inset-0 pointer-events-none ${className} ${fallback ? 'particles-fallback' : ''}`}
      style={{ 
        zIndex: 0,
        background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 70%, rgba(11,11,15,1) 100%)'
      }}
    />
  );
}
