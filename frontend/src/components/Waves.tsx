import React, { useEffect, useRef } from 'react';

interface WavesProps {
  lineColor?: string;
  gradientColors?: string[];
  backgroundColor?: string;
  waveSpeedX?: number;
  waveSpeedY?: number;
  waveAmpX?: number;
  waveAmpY?: number;
  xGap?: number;
  yGap?: number;
  friction?: number;
  tension?: number;
  maxCursorMove?: number;
  glow?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

class Grad {
  x: number;
  y: number;
  z: number;
  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  dot2(x: number, y: number) {
    return this.x * x + this.y * y;
  }
}

class Noise {
  grad3: Grad[];
  p: number[];
  perm: number[];
  gradP: Grad[];

  constructor(seed = 0) {
    this.grad3 = [
      new Grad(1, 1, 0), new Grad(-1, 1, 0), new Grad(1, -1, 0), new Grad(-1, -1, 0),
      new Grad(1, 0, 1), new Grad(-1, 0, 1), new Grad(1, 0, -1), new Grad(-1, 0, -1),
      new Grad(0, 1, 1), new Grad(0, -1, 1), new Grad(0, 1, -1), new Grad(0, -1, -1)
    ];
    this.p = [
      151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142,
      8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203,
      117, 35, 11, 32, 57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74,
      165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220,
      105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132,
      187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3,
      64, 52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227,
      47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221,
      153, 101, 155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185,
      112, 104, 218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145,
      235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45,
      127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215,
      61, 156, 180
    ];
    this.perm = new Array(512);
    this.gradP = new Array(512);
    this.seed(seed);
  }

  seed(seed: number) {
    if (seed > 0 && seed < 1) seed *= 65536;
    seed = Math.floor(seed);
    if (seed < 256) seed |= seed << 8;
    for (let i = 0; i < 256; i++) {
      let v = i & 1 ? this.p[i] ^ (seed & 255) : this.p[i] ^ ((seed >> 8) & 255);
      this.perm[i] = this.perm[i + 256] = v;
      this.gradP[i] = this.gradP[i + 256] = this.grad3[v % 12];
    }
  }

  simplex2(xin: number, yin: number) {
    const F2 = 0.5 * (Math.sqrt(3) - 1);
    const G2 = (3 - Math.sqrt(3)) / 6;
    let n0 = 0, n1 = 0, n2 = 0;
    const s = (xin + yin) * F2;
    const i = Math.floor(xin + s);
    const j = Math.floor(yin + s);
    const t = (i + j) * G2;
    const x0 = xin - i + t;
    const y0 = yin - j + t;
    let i1 = 0, j1 = 0;
    if (x0 > y0) {
      i1 = 1;
      j1 = 0;
    } else {
      i1 = 0;
      j1 = 1;
    }
    const x1 = x0 - i1 + G2;
    const y1 = y0 - j1 + G2;
    const x2 = x0 - 1 + 2 * G2;
    const y2 = y0 - 1 + 2 * G2;
    const ii = i & 255;
    const jj = j & 255;
    const gi0 = this.gradP[ii + this.perm[jj]];
    const gi1 = this.gradP[ii + i1 + this.perm[jj + j1]];
    const gi2 = this.gradP[ii + 1 + this.perm[jj + 1]];
    let t0 = 0.5 - x0 * x0 - y0 * y0;
    if (t0 >= 0) {
      t0 *= t0;
      n0 = t0 * t0 * gi0.dot2(x0, y0);
    }
    let t1 = 0.5 - x1 * x1 - y1 * y1;
    if (t1 >= 0) {
      t1 *= t1;
      n1 = t1 * t1 * gi1.dot2(x1, y1);
    }
    let t2 = 0.5 - x2 * x2 - y2 * y2;
    if (t2 >= 0) {
      t2 *= t2;
      n2 = t2 * t2 * gi2.dot2(x2, y2);
    }
    return 70 * (n0 + n1 + n2);
  }
}

export const Waves: React.FC<WavesProps> = ({
  lineColor,
  gradientColors = [
    'rgba(16, 185, 129, 0.45)', // Emerald
    'rgba(6, 182, 212, 0.40)',  // Cyan
    'rgba(59, 130, 246, 0.35)',  // Blue
    'rgba(139, 92, 246, 0.35)', // Purple
    'rgba(16, 185, 129, 0.45)'  // Loop back to Emerald
  ],
  backgroundColor = 'transparent',
  waveSpeedX = 0.012,
  waveSpeedY = 0.005,
  waveAmpX = 38,
  waveAmpY = 22,
  xGap = 12,
  yGap = 32,
  friction = 0.92,
  tension = 0.005,
  maxCursorMove = 140,
  glow = true,
  style = {},
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({
    x: -1000,
    y: -1000,
    lx: -1000,
    ly: -1000,
    sx: 0,
    sy: 0,
    v: 0,
    vs: 0,
    a: 0,
    set: false
  });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const noise = new Noise(Math.random());
    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let time = 0;

    const setSize = () => {
      width = container.offsetWidth;
      height = container.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    };

    setSize();
    window.addEventListener('resize', setSize);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouse = mouseRef.current;
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      if (!mouse.set) {
        mouse.lx = mouse.x;
        mouse.ly = mouse.y;
        mouse.sx = mouse.x;
        mouse.sy = mouse.y;
        mouse.set = true;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        const mouse = mouseRef.current;
        mouse.x = e.touches[0].clientX - rect.left;
        mouse.y = e.touches[0].clientY - rect.top;
        if (!mouse.set) {
          mouse.lx = mouse.x;
          mouse.ly = mouse.y;
          mouse.sx = mouse.x;
          mouse.sy = mouse.y;
          mouse.set = true;
        }
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove);

    const render = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      if (backgroundColor && backgroundColor !== 'transparent') {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, width, height);
      }

      // Update interactive mouse physics
      const mouse = mouseRef.current;
      const dx = mouse.x - mouse.sx;
      const dy = mouse.y - mouse.sy;
      const dist = Math.hypot(dx, dy);

      mouse.v = dist;
      mouse.vs += (mouse.v - mouse.vs) * tension;
      mouse.vs *= friction;
      mouse.v = mouse.vs;

      mouse.sx += (mouse.x - mouse.sx) * 0.1;
      mouse.sy += (mouse.y - mouse.sy) * 0.1;

      // Create multi-stop vibrant linear gradient along width
      const waveGradient = ctx.createLinearGradient(0, 0, width, height * 0.8);
      if (gradientColors && gradientColors.length > 1) {
        gradientColors.forEach((col, idx) => {
          waveGradient.addColorStop(idx / (gradientColors.length - 1), col);
        });
      }

      const totalLines = Math.ceil(height / yGap) + 4;
      const totalPoints = Math.ceil(width / xGap) + 2;

      for (let i = 0; i < totalLines; i++) {
        const baseY = i * yGap;

        // Dynamic depth opacity modulation based on vertical position
        const yRatio = i / totalLines;
        const lineAlpha = Math.sin(yRatio * Math.PI) * 0.6 + 0.4;

        ctx.beginPath();
        if (lineColor) {
          ctx.strokeStyle = lineColor;
        } else {
          ctx.strokeStyle = waveGradient;
        }
        ctx.globalAlpha = lineAlpha;
        ctx.lineWidth = i % 3 === 0 ? 1.8 : 1.2;

        if (glow && i % 4 === 0) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = 'rgba(16, 185, 129, 0.4)';
        } else {
          ctx.shadowBlur = 0;
        }

        for (let j = 0; j <= totalPoints; j++) {
          const x = j * xGap;

          // Multi-harmonic Simplex noise for fluid organic undulating ripples
          const noise1 = noise.simplex2(
            x * 0.0025 + time * waveSpeedX,
            baseY * 0.0025 + time * waveSpeedY
          );
          const noise2 = noise.simplex2(
            x * 0.005 - time * (waveSpeedX * 0.6),
            baseY * 0.005 + time * (waveSpeedY * 0.4)
          );

          let offsetY = (noise1 * 0.75 + noise2 * 0.25) * waveAmpY;
          let offsetX = noise.simplex2(x * 0.0035, baseY * 0.0035 + time * waveSpeedX) * waveAmpX;

          // Interactive cursor displacement fluid wave
          const mouseDist = Math.hypot(x - mouse.sx, baseY - mouse.sy);
          if (mouseDist < maxCursorMove) {
            const factor = Math.cos((mouseDist / maxCursorMove) * (Math.PI / 2));
            offsetY += Math.sin(mouseDist * 0.06 - time * 0.12) * (mouse.v * 0.35) * factor;
          }

          const targetX = x + offsetX;
          const targetY = baseY + offsetY;

          if (j === 0) {
            ctx.moveTo(targetX, targetY);
          } else {
            ctx.lineTo(targetX, targetY);
          }
        }

        ctx.stroke();
      }

      ctx.globalAlpha = 1.0;
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', setSize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [
    lineColor,
    gradientColors,
    backgroundColor,
    waveSpeedX,
    waveSpeedY,
    waveAmpX,
    waveAmpY,
    xGap,
    yGap,
    friction,
    tension,
    maxCursorMove,
    glow
  ]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        ...style
      }}
      className={className}
    >
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
    </div>
  );
};

export default Waves;
