'use client';

import { useEffect, useRef } from 'react';

export default function Hero3D() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let time = 0;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.scale(dpr, dpr);
    }
    resize();

    const W = () => canvas.width / (Math.min(window.devicePixelRatio || 1, 2));
    const H = () => canvas.height / (Math.min(window.devicePixelRatio || 1, 2));

    // Bo orbs - the main character
    const orbs = Array.from({ length: 7 }, (_, i) => ({
      angle: (i / 7) * Math.PI * 2,
      radius: 18 + Math.random() * 12,
      orbitRadius: 80 + i * 15,
      color: [
        [45, 156, 219],
        [86, 204, 242],
        [242, 201, 76],
        [255, 107, 157],
        [86, 204, 242],
        [45, 156, 219],
        [255, 107, 157],
      ][i],
      speed: 0.3 + i * 0.08,
      phase: Math.random() * Math.PI * 2,
      x: 0,
      y: 0,
    }));

    // Floating math fragments
    const fragments = Array.from({ length: 18 }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: 10 + Math.random() * 14,
      speed: 0.15 + Math.random() * 0.35,
      opacity: 0.08 + Math.random() * 0.12,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.015,
      text: ['÷', '×', '+', '=', '?', '∑', 'π', '√', '∞'][Math.floor(Math.random() * 9)],
    }));

    // Sparkles
    const sparkles = Array.from({ length: 40 }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: 1 + Math.random() * 2,
      speed: 0.5 + Math.random(),
      phase: Math.random() * Math.PI * 2,
    }));

    function drawGlow(x, y, radius, r, g, b, alpha) {
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha})`);
      gradient.addColorStop(0.4, `rgba(${r}, ${g}, ${b}, ${alpha * 0.4})`);
      gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    function animate() {
      const w = W();
      const h = H();
      time += 0.008;

      // Clear with slight trail
      ctx.fillStyle = 'rgba(10, 22, 40, 0.15)';
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2 + (mouseRef.current.x - 0.5) * 80;
      const cy = h / 2 + (mouseRef.current.y - 0.5) * 60;

      // Draw fragments
      fragments.forEach((f) => {
        f.y += f.speed / h;
        f.rotation += f.rotSpeed;
        if (f.y > 1.05) { f.y = -0.05; f.x = Math.random(); }

        ctx.save();
        ctx.translate(f.x * w, f.y * h);
        ctx.rotate(f.rotation);
        ctx.globalAlpha = f.opacity;
        ctx.fillStyle = '#56CCF2';
        ctx.font = `${f.size}px "Space Mono", monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(f.text, 0, 0);
        ctx.restore();
      });

      // Draw sparkles
      sparkles.forEach((s) => {
        const flicker = Math.sin(time * s.speed * 4 + s.phase) * 0.5 + 0.5;
        ctx.globalAlpha = flicker * 0.5;
        ctx.fillStyle = '#56CCF2';
        ctx.beginPath();
        ctx.arc(s.x * w, s.y * h, s.size * flicker, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      // Central glow
      drawGlow(cx, cy, 200, 45, 156, 219, 0.08);
      drawGlow(cx, cy, 120, 86, 204, 242, 0.12);

      // Draw Bo orbs
      orbs.forEach((orb, i) => {
        const a = time * orb.speed + orb.angle;
        const pulse = Math.sin(time * 2 + orb.phase) * 4;
        const mouseOffsetX = (mouseRef.current.x - 0.5) * 40;
        const mouseOffsetY = (mouseRef.current.y - 0.5) * 30;

        orb.x = cx + Math.cos(a) * orb.orbitRadius + mouseOffsetX * (1 + i * 0.1);
        orb.y = cy + Math.sin(a) * orb.orbitRadius * 0.6 + mouseOffsetY * (1 + i * 0.1);

        const r = orb.radius + pulse;
        const [cr, cg, cb] = orb.color;

        // Glow
        drawGlow(orb.x, orb.y, r * 3, cr, cg, cb, 0.25);

        // Core
        const grad = ctx.createRadialGradient(orb.x - r * 0.3, orb.y - r * 0.3, 0, orb.x, orb.y, r);
        grad.addColorStop(0, `rgba(${Math.min(cr + 60, 255)}, ${Math.min(cg + 60, 255)}, ${Math.min(cb + 60, 255)}, 0.95)`);
        grad.addColorStop(1, `rgba(${cr}, ${cg}, ${cb}, 0.8)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Connection lines between orbs
      ctx.strokeStyle = 'rgba(86, 204, 242, 0.1)';
      ctx.lineWidth = 1.5;
      for (let i = 0; i < orbs.length; i++) {
        const next = (i + 1) % orbs.length;
        ctx.beginPath();
        ctx.moveTo(orbs[i].x, orbs[i].y);
        ctx.lineTo(orbs[next].x, orbs[next].y);
        ctx.stroke();
      }

      // Center orb (Bo core)
      const coreRadius = 35 + Math.sin(time * 1.5) * 5;
      drawGlow(cx, cy, coreRadius * 3, 45, 156, 219, 0.15);
      drawGlow(cx, cy, coreRadius * 2, 86, 204, 242, 0.2);

      const coreGrad = ctx.createRadialGradient(cx - coreRadius * 0.3, cy - coreRadius * 0.3, 0, cx, cy, coreRadius);
      coreGrad.addColorStop(0, 'rgba(130, 220, 255, 0.95)');
      coreGrad.addColorStop(0.5, 'rgba(45, 156, 219, 0.9)');
      coreGrad.addColorStop(1, 'rgba(26, 95, 122, 0.8)');
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, coreRadius, 0, Math.PI * 2);
      ctx.fill();

      // Inner highlight
      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.beginPath();
      ctx.arc(cx - coreRadius * 0.2, cy - coreRadius * 0.2, coreRadius * 0.4, 0, Math.PI * 2);
      ctx.fill();

      animationId = requestAnimationFrame(animate);
    }

    animate();

    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };

    const handleTouch = (e) => {
      if (e.touches.length > 0) {
        mouseRef.current = {
          x: e.touches[0].clientX / window.innerWidth,
          y: e.touches[0].clientY / window.innerHeight,
        };
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouch, { passive: true });
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouch);
      window.removeEventListener('resize', resize);
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
