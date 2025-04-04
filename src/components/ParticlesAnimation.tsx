
import { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ParticlesAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Create scene
    const scene = new THREE.Scene();
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(
      75, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000
    );
    camera.position.z = 30;
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    
    // Create particle geometry
    const particlesCount = 2000;
    const particlesGeometry = new THREE.BufferGeometry();
    const posArray = new Float32Array(particlesCount * 3);
    
    // Create random positions for particles
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 60;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    // Create blue particles
    const blueParticlesMaterial = new THREE.PointsMaterial({
      size: 0.15,
      color: 0x3B82F6,
      transparent: true,
      opacity: 0.8
    });
    const blueParticles = new THREE.Points(particlesGeometry, blueParticlesMaterial);
    scene.add(blueParticles);
    
    // Create cyan particles
    const cyanParticlesGeometry = particlesGeometry.clone();
    const cyanParticlesMaterial = new THREE.PointsMaterial({
      size: 0.1,
      color: 0x06B6D4,
      transparent: true,
      opacity: 0.7
    });
    const cyanParticles = new THREE.Points(cyanParticlesGeometry, cyanParticlesMaterial);
    scene.add(cyanParticles);
    
    // Track mouse position
    let mouseX = 0;
    let mouseY = 0;
    
    const mouseMoveHandler = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    
    window.addEventListener('mousemove', mouseMoveHandler);
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Animation loop
    let frame = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      frame += 0.01;
      
      // Rotate particles
      blueParticles.rotation.x = mouseY * 0.1 + frame * 0.01;
      blueParticles.rotation.y = mouseX * 0.1 - frame * 0.015;
      
      cyanParticles.rotation.x = -mouseY * 0.05 + frame * 0.005;
      cyanParticles.rotation.y = -mouseX * 0.05 - frame * 0.01;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Clean up
    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('mousemove', mouseMoveHandler);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return <div ref={containerRef} id="canvas-container" />;
};

export default ParticlesAnimation;
