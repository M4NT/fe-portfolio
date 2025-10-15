import React, { useEffect, useRef } from 'react';

type PrismProps = {
  animationType?: 'rotate' | 'float';
  timeScale?: number; // velocidade geral
  height?: number; // altura relativa do prisma
  baseWidth?: number; // largura da base
  scale?: number; // escala geral
  hueShift?: number; // deslocamento de matiz
  colorFrequency?: number; // frequência de variação de cor
  noise?: number; // jitter suave
  glow?: number; // intensidade do brilho
  className?: string;
};

// Background 2D super leve inspirado no "Prism" do React Bits
// Implementação em Canvas sem WebGL para zero travamentos
const Prism: React.FC<PrismProps> = ({
  animationType = 'rotate',
  timeScale = 0.6,
  height = 3.5,
  baseWidth = 5.5,
  scale = 3.0,
  hueShift = 0,
  colorFrequency = 1,
  noise = 0.4,
  glow = 0.9,
  className,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d', { alpha: true })!;
    let mounted = true;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const { clientWidth, clientHeight } = canvas.parentElement as HTMLElement;
      canvas.width = Math.floor(clientWidth * dpr);
      canvas.height = Math.floor(clientHeight * dpr);
      canvas.style.width = clientWidth + 'px';
      canvas.style.height = clientHeight + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement as Element);

    let t = 0;
    const draw = () => {
      if (!mounted) return;
      const { width, height: H } = canvas;
      // limpar com fade leve para trilha suave
      ctx.clearRect(0, 0, width, H);

      const w = width / dpr;
      const h = H / dpr;

      // centro
      const cx = w / 2;
      const cy = h / 2;

      // fundo radial sutil para profundidade
      const bg = ctx.createRadialGradient(cx, cy, Math.min(w, h) * 0.05, cx, cy, Math.max(w, h) * 0.8);
      bg.addColorStop(0, `hsla(${(200 + hueShift) % 360}, 100%, 8%, ${0.25 * glow})`);
      bg.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      const base = Math.min(w, h) / baseWidth;
      const prismH = Math.min(w, h) / height;
      const slices = 8;

      ctx.save();
      ctx.translate(cx, cy);
      const angle = animationType === 'rotate' ? t * 0.4 * timeScale : Math.sin(t * 0.6 * timeScale) * 0.15;
      ctx.rotate(angle);
      ctx.scale(scale, scale);

      for (let i = 0; i < slices; i++) {
        const p = i / (slices - 1);
        const jitter = (Math.sin(t * 1.5 + i * 1.7) * 0.5 + 0.5) * noise * base;
        const x = (p - 0.5) * base * 2;

        // cores em matiz animada
        const hue = (hueShift + 200 + Math.sin(t * 0.8 + i * colorFrequency) * 40 + p * 60) % 360;
        const colA = `hsla(${hue}, 90%, 65%, ${0.35 + glow * 0.15})`;
        const colB = `hsla(${(hue + 30) % 360}, 90%, 60%, ${0.25 + glow * 0.1})`;

        // trilho vertical
        ctx.beginPath();
        ctx.moveTo(x - base * 0.05 - jitter, -prismH * 0.5);
        ctx.lineTo(x + base * 0.05 + jitter, -prismH * 0.5);
        ctx.lineTo(x + base * 0.15 + jitter, prismH * 0.5);
        ctx.lineTo(x - base * 0.15 - jitter, prismH * 0.5);
        ctx.closePath();

        const g = ctx.createLinearGradient(x, -prismH * 0.5, x, prismH * 0.5);
        g.addColorStop(0, colA);
        g.addColorStop(1, colB);
        ctx.fillStyle = g;
        ctx.shadowColor = `hsla(${hue},100%,70%,${0.25 * glow})`;
        ctx.shadowBlur = 18 * glow;
        ctx.fill();
      }

      ctx.restore();
      t += 0.016 * (timeScale || 1);
      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      mounted = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [animationType, timeScale, height, baseWidth, scale, hueShift, colorFrequency, noise, glow]);

  return (
    <div className={className} style={{ width: '100%', height: '100%', position: 'relative' }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
    </div>
  );
};

export default Prism;


