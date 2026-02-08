// components/Hero3D.jsx
'use client';

import { useEffect, useRef } from 'react';

export default function Hero3D() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Bo character represented as floating spheres
    class BoSphere {
      constructor(index, total) {
        const angle = (index / total) * Math.PI * 2;
        const radius = 150;
        this.baseX = canvas.width / 2 + Math.cos(angle) * radius;
        this.baseY = canvas.height / 2 + Math.sin(angle) * radius;
        this.x = this.baseX;
        this.y = this.baseY;
        this.size = 20 + Math.random() * 15;
        this.color = this.getColor(index, total);
        this.pulsePhase = Math.random() * Math.PI * 2;
      }

      getColor(index, total) {
        const colors = [
          { r: 45, g: 156, b: 219 },   // primary blue
          { r: 86, g: 204, b: 242 },   // bright cyan
          { r: 242, g: 201, b: 76 },   // warm yellow
          { r: 255, g: 107, b: 157 }   // soft pink
        ];
        return colors[index % colors.length];
      }

      update(mouseX, mouseY, time) {
        // Follow mouse with lag
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        this.x += dx * 0.05;
        this.y += dy * 0.05;

        // Pulse animation
        this.pulsePhase += 0.02;
        const pulse = Math.sin(this.pulsePhase) * 5;
        this.currentSize = this.size + pulse;
      }

      draw(ctx) {
        // Glow effect
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.currentSize * 2
        );
        gradient.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.8)`);
        gradient.addColorStop(0.5, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.3)`);
        gradient.addColorStop(1, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.currentSize * 2, 0, Math.PI * 2);
        ctx.fill();

        // Core sphere
        ctx.fillStyle = `rgb(${this.color.r}, ${this.color.g}, ${this.color.b})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.currentSize, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Homework fragments (text particles)
    class HomeworkFragment {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = -50;
        this.size = Math.random() * 20 + 10;
        this.speed = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.05;
        this.text = this.getRandomText();
      }

      getRandomText() {
        const texts = ['÷', '×', '+', '=', 'ABC', '123', '?', '!'];
        return texts[Math.floor(Math.random() * texts.length)];
      }

      update() {
        this.y += this.speed;
        this.rotation += this.rotationSpeed;
        
        if (this.y > canvas.height + 50) {
          this.y = -50;
          this.x = Math.random() * canvas.width;
        }
      }

      draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = '#56CCF2';
        ctx.font = `${this.size}px Space Mono, monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.text, 0, 0);
        ctx.restore();
      }
    }

    // Create Bo character
    const boSpheres = [];
    const sphereCount = 8;
    for (let i = 0; i < sphereCount; i++) {
      boSpheres.push(new BoSphere(i, sphereCount));
    }

    // Create homework fragments
    const fragments = [];
    for (let i = 0; i < 30; i++) {
      fragments.push(new HomeworkFragment());
    }

    // Animation loop
    let animationId;
    let time = 0;

    function animate() {
      ctx.fillStyle = 'rgba(10, 22, 40, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.01;

      // Update and draw homework fragments
      fragments.forEach(fragment => {
        fragment.update();
        fragment.draw(ctx);
      });

      // Update and draw Bo spheres
      boSpheres.forEach((sphere, index) => {
        const offset = index * (Math.PI * 2 / sphereCount);
        const targetX = canvas.width / 2 + 
          Math.cos(time + offset) * 100 + 
          (mouseRef.current.x - canvas.width / 2) * 0.3;
        const targetY = canvas.height / 2 + 
          Math.sin(time + offset) * 100 + 
          (mouseRef.current.y - canvas.height / 2) * 0.3;

        sphere.update(targetX, targetY, time);
        sphere.draw(ctx);
      });

      // Draw connections between spheres
      ctx.strokeStyle = 'rgba(86, 204, 242, 0.2)';
      ctx.lineWidth = 2;
      for (let i = 0; i < boSpheres.length; i++) {
        const next = (i + 1) % boSpheres.length;
        ctx.beginPath();
        ctx.moveTo(boSpheres[i].x, boSpheres[i].y);
        ctx.lineTo(boSpheres[next].x, boSpheres[next].y);
        ctx.stroke();
      }

      animationId = requestAnimationFrame(animate);
    }

    animate();

    // Mouse tracking
    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      };
    };

    // Resize handler
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}