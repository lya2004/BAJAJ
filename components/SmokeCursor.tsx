"use client";
import { useEffect, useRef } from "react";

class Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  colorTemplate: string;
  life: number;
  maxLife: number;

  constructor(x: number, y: number) {
    this.x = x + (Math.random() * 20 - 10);
    this.y = y + (Math.random() * 20 - 10);
    this.size = Math.random() * 30 + 20; // Larger size for smoke
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * -1 - 0.5; // Drift upwards slowly
    
    // Mix of primary (purple) and secondary (blue) colors
    const colors = [
      'rgba(168, 130, 240, OPACITY)', // primary
      'rgba(56, 189, 248, OPACITY)',  // secondary
      'rgba(120, 120, 150, OPACITY)'  // greyish smoke
    ];
    this.colorTemplate = colors[Math.floor(Math.random() * colors.length)];
    this.life = 0;
    this.maxLife = Math.random() * 60 + 40;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life++;
    this.size += 0.5; // Expand as it rises
  }

  draw(ctx: CanvasRenderingContext2D) {
    const progress = this.life / this.maxLife;
    // Fade out smoothly
    const opacity = Math.max(0, (1 - progress) * 0.4); 
    
    ctx.save();
    ctx.beginPath();
    
    // Create radial gradient for soft smoke edge
    const gradient = ctx.createRadialGradient(
      this.x, this.y, 0,
      this.x, this.y, this.size
    );
    gradient.addColorStop(0, this.colorTemplate.replace('OPACITY', opacity.toString()));
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    
    ctx.fillStyle = gradient;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

export default function SmokeCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let mouse = { x: -1000, y: -1000 };
    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resize);
    resize();

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - mouse.x;
      const dy = e.clientY - mouse.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      
      // Add particles, more if moving faster
      const particlesToAdd = Math.min(Math.max(Math.floor(distance / 10), 1), 5);
      for (let i = 0; i < particlesToAdd; i++) {
        particles.push(new Particle(mouse.x, mouse.y));
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw(ctx);
        
        if (particles[i].life >= particles[i].maxLife) {
          particles.splice(i, 1);
          i--;
        }
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-50 mix-blend-screen"
    />
  );
}
