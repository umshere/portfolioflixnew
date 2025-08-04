"use client";

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface GlobalNebulaBackgroundProps {
  className?: string;
}

export default function GlobalNebulaBackground({ className = '' }: GlobalNebulaBackgroundProps) {
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

      // Create nebula material with enhanced shader
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

        // Improved noise functions
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
          float amplitude = 0.3; // Reduced from 0.5
          for (int i = 0; i < 4; i++) { // Reduced iterations for subtlety
            value += amplitude * noise(st);
            st *= 1.8;
            amplitude *= 0.6;
          }
          return value;
        }

        // Very subtle turbulence
        float subtleTurbulence(vec2 st) {
          float value = 0.0;
          float amplitude = 0.2;
          for (int i = 0; i < 3; i++) {
            value += amplitude * abs(noise(st) - 0.5);
            st *= 1.5;
            amplitude *= 0.7;
          }
          return value;
        }

        void main() {
          vec2 st = vUv * 2.5; // Reduced scale for larger patterns
          
          // Much slower rotation layers for subtle movement
          float time1 = time * 0.008; // Much slower
          float time2 = time * 0.005;
          float time3 = time * 0.003;
          
          // Create very gentle rotating layers
          mat2 rotation1 = mat2(cos(time1), -sin(time1), sin(time1), cos(time1));
          mat2 rotation2 = mat2(cos(-time2 * 0.7), -sin(-time2 * 0.7), sin(-time2 * 0.7), cos(-time2 * 0.7));
          mat2 rotation3 = mat2(cos(time3 * 0.5), -sin(time3 * 0.5), sin(time3 * 0.5), cos(time3 * 0.5));
          
          // Apply rotations to different noise layers
          vec2 st1 = rotation1 * st;
          vec2 st2 = rotation2 * (st * 1.2);
          vec2 st3 = rotation3 * (st * 0.8);
          
          // Generate very subtle nebula layers
          float nebula1 = fbm(st1 + time * 0.002); // Much slower movement
          float nebula2 = fbm(st2 + time * 0.001);
          float nebula3 = subtleTurbulence(st3 + time * 0.0005);
          
          // Add very gentle flowing effect
          float flow = fbm(st + vec2(time * 0.001, time * 0.0005));
          
          // Combine layers with much lower weights
          float combined = nebula1 * 0.2 + nebula2 * 0.15 + nebula3 * 0.1 + flow * 0.05;
          
          // Distance from center for very gentle falloff
          vec2 center = vUv - 0.5;
          float dist = length(center);
          
          // Much more subtle color palette
          vec3 deepSpace = vec3(0.01, 0.01, 0.03);     // Very dark
          vec3 subtleRed = vec3(0.15, 0.02, 0.04);     // Very muted red
          vec3 subtleBlue = vec3(0.02, 0.04, 0.12);    // Very muted blue
          vec3 subtlePurple = vec3(0.08, 0.02, 0.10);  // Very muted purple
          vec3 cosmicDust = vec3(0.05, 0.03, 0.02);    // Brown dust
          
          // Very gentle color mixing
          vec3 color1 = mix(deepSpace, subtleRed, combined * 0.3);
          color1 = mix(color1, subtleBlue, nebula2 * 0.2);
          color1 = mix(color1, subtlePurple, nebula3 * 0.15);
          color1 = mix(color1, cosmicDust, flow * 0.1);
          
          // Add very subtle energy variations
          float subtleVariation = fbm(st * 0.3 + time * 0.0008);
          color1 += subtleRed * subtleVariation * 0.05;
          
          // Very gentle falloff
          float falloff = 1.0 - smoothstep(0.0, 1.8, dist);
          float alpha = combined * 0.15 * falloff; // Much lower alpha
          
          // Very subtle breathing effect
          alpha *= (sin(time * 0.1) * 0.05 + 0.95); // Much gentler breathing
          alpha += subtleVariation * 0.03 * falloff;
          
          // Keep alpha very low for subtlety
          alpha = clamp(alpha, 0.0, 0.12); // Much lower max alpha
          
          gl_FragColor = vec4(color1, alpha);
        }
      `;

      // Create larger nebula plane to cover more area
      const nebulaGeometry = new THREE.PlaneGeometry(6, 6);
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
      nebulaMesh.position.z = -3;
      scene.add(nebulaMesh);

      // Create enhanced star field with subtle blinking
      const starGeometry = new THREE.BufferGeometry();
      const starCount = 800; // Reduced star count for subtlety
      const starPositions = new Float32Array(starCount * 3);
      const starColors = new Float32Array(starCount * 3);
      const starSizes = new Float32Array(starCount);
      const starBlinkSpeeds = new Float32Array(starCount);
      const starBlinkOffsets = new Float32Array(starCount);

      for (let i = 0; i < starCount; i++) {
        // Spread stars across larger area
        starPositions[i * 3] = (Math.random() - 0.5) * 20;
        starPositions[i * 3 + 1] = (Math.random() - 0.5) * 20;
        starPositions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 3;

        // More subtle color variety
        const colorChoice = Math.random();
        if (colorChoice < 0.8) {
          // Dimmer white stars
          starColors[i * 3] = 0.8;
          starColors[i * 3 + 1] = 0.8;
          starColors[i * 3 + 2] = 0.8;
        } else if (colorChoice < 0.9) {
          // Very subtle blue tint
          starColors[i * 3] = 0.6;
          starColors[i * 3 + 1] = 0.7;
          starColors[i * 3 + 2] = 0.9;
        } else {
          // Very subtle red tint
          starColors[i * 3] = 0.9;
          starColors[i * 3 + 1] = 0.6;
          starColors[i * 3 + 2] = 0.6;
        }

        // Smaller, more realistic star sizes
        starSizes[i] = Math.random() * 1.5 + 0.2;
        
        // Much slower, subtle blinking
        starBlinkSpeeds[i] = Math.random() * 0.3 + 0.1; // Much slower speeds
        starBlinkOffsets[i] = Math.random() * Math.PI * 2;
      }

      starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
      starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
      starGeometry.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));
      starGeometry.setAttribute('blinkSpeed', new THREE.BufferAttribute(starBlinkSpeeds, 1));
      starGeometry.setAttribute('blinkOffset', new THREE.BufferAttribute(starBlinkOffsets, 1));

      const starMaterial = new THREE.ShaderMaterial({
        vertexShader: `
          attribute float size;
          attribute float blinkSpeed;
          attribute float blinkOffset;
          varying vec3 vColor;
          varying float vSize;
          varying float vBlinkSpeed;
          varying float vBlinkOffset;
          
          void main() {
            vColor = color; // Use built-in color attribute
            vSize = size;
            vBlinkSpeed = blinkSpeed;
            vBlinkOffset = blinkOffset;
            
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = size * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          uniform float time;
          varying vec3 vColor;
          varying float vSize;
          varying float vBlinkSpeed;
          varying float vBlinkOffset;
          
          void main() {
            float dist = length(gl_PointCoord - vec2(0.5));
            if (dist > 0.5) discard;
            
            // Create subtle star shape with gentle brightness falloff
            float alpha = 1.0 - (dist * 2.0);
            alpha = pow(alpha, 1.2);
            
            // Very subtle blinking effect
            float blink = sin(time * vBlinkSpeed + vBlinkOffset) * 0.1 + 0.9; // Much gentler range
            alpha *= blink;
            
            // Very gentle twinkling
            float twinkle = sin(time * vBlinkSpeed * 1.5 + vBlinkOffset * 1.5) * 0.05 + 0.95; // Much subtler
            alpha *= twinkle;
            
            // Softer core
            float core = 1.0 - smoothstep(0.0, 0.4, dist);
            alpha += core * 0.1; // Much gentler core brightness
            
            gl_FragColor = vec4(vColor, alpha * 0.4); // Much lower overall opacity
          }
        `,
        uniforms: {
          time: { value: 0 }
        },
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
        
        // Update star blinking
        starMaterial.uniforms.time.value = elapsed;
        
        // Slow nebula rotation for Earth-like movement
        nebulaMesh.rotation.z = elapsed * 0.008;
        
        // Multi-layered star movement for depth
        stars.rotation.z = elapsed * 0.005;
        stars.rotation.y = elapsed * 0.003;
        stars.rotation.x = elapsed * 0.002;
        
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
      className={`fixed inset-0 pointer-events-none ${className} ${fallback ? 'global-particles-fallback' : ''}`}
      style={{ 
        zIndex: -1, // Behind all content
        width: '100vw',
        height: '100vh',
      }}
    />
  );
}
