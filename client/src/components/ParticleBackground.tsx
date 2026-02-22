import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  color: string;
  pulseSpeed: number;
  pulsePhase: number;
}

interface GlowOrb {
  x: number;
  y: number;
  radius: number;
  color: string;
  vx: number;
  vy: number;
  opacity: number;
}

const COLORS = [
  { r: 0, g: 210, b: 255 },
  { r: 168, g: 85, b: 247 },
  { r: 0, g: 200, b: 150 },
  { r: 59, g: 130, b: 246 },
  { r: 236, g: 72, b: 153 },
];

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const orbsRef = useRef<GlowOrb[]>([]);
  const animationRef = useRef<number>(0);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const timeRef = useRef(0);

  const initParticles = useCallback((width: number, height: number) => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const count = prefersReducedMotion ? 30 : Math.min(140, Math.floor((width * height) / 8000));
    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const colorIdx = Math.floor(Math.random() * COLORS.length);
      const c = COLORS[colorIdx];
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.15,
        color: `${c.r}, ${c.g}, ${c.b}`,
        pulseSpeed: Math.random() * 0.02 + 0.005,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }
    particlesRef.current = particles;

    const orbCount = prefersReducedMotion ? 2 : 5;
    const orbs: GlowOrb[] = [];
    const orbColors = [
      "0, 210, 255",
      "168, 85, 247",
      "0, 200, 150",
      "59, 130, 246",
      "236, 72, 153",
    ];
    for (let i = 0; i < orbCount; i++) {
      orbs.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 200 + 100,
        color: orbColors[i % orbColors.length],
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        opacity: 0.03 + Math.random() * 0.03,
      });
    }
    orbsRef.current = orbs;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (particlesRef.current.length === 0) {
        initParticles(canvas.width, canvas.height);
      }
    };

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouse);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      timeRef.current += 1;
      const t = timeRef.current;
      const particles = particlesRef.current;
      const orbs = orbsRef.current;
      const mouse = mouseRef.current;

      for (const orb of orbs) {
        orb.x += orb.vx;
        orb.y += orb.vy;
        if (orb.x < -orb.radius) orb.x = canvas.width + orb.radius;
        if (orb.x > canvas.width + orb.radius) orb.x = -orb.radius;
        if (orb.y < -orb.radius) orb.y = canvas.height + orb.radius;
        if (orb.y > canvas.height + orb.radius) orb.y = -orb.radius;

        const pulsingOpacity = orb.opacity * (0.7 + 0.3 * Math.sin(t * 0.01 + orbs.indexOf(orb)));
        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
        gradient.addColorStop(0, `rgba(${orb.color}, ${pulsingOpacity})`);
        gradient.addColorStop(0.5, `rgba(${orb.color}, ${pulsingOpacity * 0.4})`);
        gradient.addColorStop(1, `rgba(${orb.color}, 0)`);
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist > 1 && mDist < 250) {
          const force = (250 - mDist) / 250;
          p.vx += (mdx / mDist) * force * 0.08;
          p.vy += (mdy / mDist) * force * 0.08;
        }

        p.vx *= 0.99;
        p.vy *= 0.99;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const pulse = 0.6 + 0.4 * Math.sin(t * p.pulseSpeed + p.pulsePhase);
        const finalOpacity = p.opacity * pulse;
        const glowRadius = p.radius * 3;

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowRadius);
        gradient.addColorStop(0, `rgba(${p.color}, ${finalOpacity})`);
        gradient.addColorStop(0.4, `rgba(${p.color}, ${finalOpacity * 0.3})`);
        gradient.addColorStop(1, `rgba(${p.color}, 0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${finalOpacity})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            const lineOpacity = 0.08 * (1 - dist / 150) * pulse;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${p.color}, ${lineOpacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        if (mDist < 300) {
          const lineOpacity = 0.15 * (1 - mDist / 300);
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(${p.color}, ${lineOpacity})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      data-testid="particle-background"
    />
  );
}
