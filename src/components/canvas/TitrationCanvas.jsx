import React, { useEffect, useRef } from 'react';

export const TitrationCanvas = ({ 
  currentVolume = 0, 
  targetEndpoint = 24.80, 
  isStirring = true,
  isDropping = false 
}) => {
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const dropYRef = useRef(0);

  // Compute pH & color based on added volume vs targetEndpoint
  const calculateChemicalState = (vol, target) => {
    const diff = vol - target;
    let ph = 1.0;
    let r = 240, g = 240, b = 250, a = 0.35; // Default colorless
    let colorName = "ไม่มีสี (Colorless)";

    if (diff < -0.3) {
      // Acidic region
      ph = 1.0 + Math.max(0, (vol / target) * 3.5);
      r = 240; g = 245; b = 255; a = 0.35;
      colorName = "ไม่มีสี (pH < 8.2)";
    } else if (diff >= -0.3 && diff <= 0.2) {
      // Equivalence Point Region (Faint Pink!)
      ph = 8.2 + ((diff + 0.3) / 0.5) * 1.8;
      r = 255; g = 182; b = 193; a = 0.75;
      colorName = "สีชมพูระเรื่อ (Faint Pink - จุดยุติสมบูรณ์!)";
    } else {
      // Over-titrated (Deep Pink / Magenta)
      ph = 10.0 + Math.min(3.5, diff * 0.8);
      r = 236; g = 72; b = 153; a = 0.95;
      colorName = "สีชมพูเข้ม/บานเย็น (Over-titrated หยดเกิน)";
    }

    return { ph, rgba: `rgba(${r}, ${g}, ${b}, ${a})`, colorName, diff };
  };

  const chemState = calculateChemicalState(currentVolume, targetEndpoint);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;

      // 1. Draw Stand & Support (Centered & Balanced)
      ctx.fillStyle = '#1E293B';
      ctx.fillRect(width / 2 - 120, height - 20, 240, 15); // Stand Base
      ctx.fillStyle = '#334155';
      ctx.fillRect(width / 2 - 100, 25, 10, height - 45); // Vertical Rod
      
      // Clamp arm
      ctx.fillStyle = '#475569';
      ctx.fillRect(width / 2 - 95, 95, 85, 12);
      ctx.fillRect(width / 2 - 95, 200, 85, 12);

      // 2. Draw Burette (Top Column)
      const buretteX = width / 2 - 15;
      const buretteW = 30;
      const buretteTop = 28;
      const buretteH = 225;

      // Glass Tube Gradient
      const buretteGrad = ctx.createLinearGradient(buretteX, 0, buretteX + buretteW, 0);
      buretteGrad.addColorStop(0, 'rgba(255,255,255,0.4)');
      buretteGrad.addColorStop(0.2, 'rgba(0,180,216,0.1)');
      buretteGrad.addColorStop(0.8, 'rgba(255,255,255,0.2)');
      buretteGrad.addColorStop(1, 'rgba(255,255,255,0.5)');

      // Titrant Liquid inside Burette (NaOH)
      const maxBuretteVol = 50.0;
      const remainingVol = Math.max(0, maxBuretteVol - currentVolume);
      const liquidFillHeight = (remainingVol / maxBuretteVol) * (buretteH - 20);
      const liquidTopY = (buretteTop + buretteH - 10) - liquidFillHeight;

      ctx.fillStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.fillRect(buretteX + 2, liquidTopY, buretteW - 4, liquidFillHeight);

      // Meniscus Line
      ctx.strokeStyle = '#38BDF8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(buretteX + buretteW / 2, liquidTopY, (buretteW - 4) / 2, 0, Math.PI);
      ctx.stroke();

      // Burette Glass Tube Outline
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.8)';
      ctx.lineWidth = 2;
      ctx.strokeRect(buretteX, buretteTop, buretteW, buretteH);

      // Ticks & Labels on Burette
      ctx.fillStyle = '#94A3B8';
      ctx.font = '10px monospace';
      for (let i = 0; i <= 50; i += 10) {
        const tickY = buretteTop + (i / 50) * (buretteH - 20) + 10;
        ctx.beginPath();
        ctx.moveTo(buretteX + buretteW, tickY);
        ctx.lineTo(buretteX + buretteW - 8, tickY);
        ctx.stroke();
        ctx.fillText(`${i}`, buretteX + buretteW + 4, tickY + 3);
      }

      // Stopcock (Valve)
      const stopcockY = buretteTop + buretteH + 5;
      ctx.fillStyle = '#64748B';
      ctx.fillRect(buretteX + 8, stopcockY, 14, 15);
      
      // Stopcock handle
      ctx.save();
      ctx.translate(buretteX + 15, stopcockY + 7);
      ctx.rotate(isDropping ? Math.PI / 4 : 0);
      ctx.fillStyle = '#00B4D8';
      ctx.fillRect(-12, -3, 24, 6);
      ctx.restore();

      // Tip Nozzle
      ctx.fillStyle = 'rgba(148, 163, 184, 0.8)';
      ctx.beginPath();
      ctx.moveTo(buretteX + 10, stopcockY + 15);
      ctx.lineTo(buretteX + 20, stopcockY + 15);
      ctx.lineTo(buretteX + 16, stopcockY + 30);
      ctx.lineTo(buretteX + 14, stopcockY + 30);
      ctx.closePath();
      ctx.fill();

      // 3. Falling Liquid Drop Animation
      const dropStartX = buretteX + 15;
      const dropStartY = stopcockY + 30;
      const flaskLiquidSurfaceY = height - 85;

      if (isDropping) {
        dropYRef.current += 6;
        if (dropYRef.current > (flaskLiquidSurfaceY - dropStartY)) {
          dropYRef.current = 0;
        }

        ctx.fillStyle = '#38BDF8';
        ctx.beginPath();
        ctx.arc(dropStartX, dropStartY + dropYRef.current, 3.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // 4. Erlenmeyer Flask (Flask Contour & Liquid)
      const flaskCenterX = width / 2;
      const flaskBaseY = height - 25;
      const flaskBaseW = 145;
      const flaskNeckW = 35;
      const flaskNeckY = height - 155;
      const flaskHeight = 130;

      ctx.save();
      // Flask Liquid Shape
      const flaskLiquidHeight = 58 + (currentVolume / 50) * 15;
      const liquidTopYFlask = flaskBaseY - flaskLiquidHeight;
      const liquidWidthRatio = flaskLiquidHeight / flaskHeight;
      const liquidCurrentW = flaskNeckW + (flaskBaseW - flaskNeckW) * liquidWidthRatio;

      ctx.beginPath();
      ctx.moveTo(flaskCenterX - liquidCurrentW / 2, liquidTopYFlask);
      ctx.lineTo(flaskCenterX + liquidCurrentW / 2, liquidTopYFlask);
      ctx.lineTo(flaskCenterX + flaskBaseW / 2 - 5, flaskBaseY - 5);
      ctx.lineTo(flaskCenterX - flaskBaseW / 2 + 5, flaskBaseY - 5);
      ctx.closePath();

      // Fill Liquid with Chem Color!
      ctx.fillStyle = chemState.rgba;
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.4)';
      ctx.stroke();

      // Stirrer Magnet effect
      if (isStirring) {
        angle += 0.15;
        const barW = 20;
        ctx.save();
        ctx.translate(flaskCenterX, flaskBaseY - 12);
        ctx.rotate(angle);
        ctx.fillStyle = '#F8FAFC';
        ctx.fillRect(-barW / 2, -3, barW, 6);
        ctx.restore();
      }

      // Flask Glass Contour Outline
      ctx.beginPath();
      ctx.moveTo(flaskCenterX - flaskNeckW / 2, flaskNeckY);
      ctx.lineTo(flaskCenterX + flaskNeckW / 2, flaskNeckY);
      ctx.lineTo(flaskCenterX + flaskNeckW / 2, flaskNeckY + 30);
      ctx.lineTo(flaskCenterX + flaskBaseW / 2, flaskBaseY);
      ctx.lineTo(flaskCenterX - flaskBaseW / 2, flaskBaseY);
      ctx.lineTo(flaskCenterX - flaskNeckW / 2, flaskNeckY + 30);
      ctx.closePath();

      const flaskGlassGrad = ctx.createLinearGradient(flaskCenterX - flaskBaseW / 2, 0, flaskCenterX + flaskBaseW / 2, 0);
      flaskGlassGrad.addColorStop(0, 'rgba(255,255,255,0.5)');
      flaskGlassGrad.addColorStop(0.3, 'rgba(255,255,255,0.1)');
      flaskGlassGrad.addColorStop(0.8, 'rgba(255,255,255,0.1)');
      flaskGlassGrad.addColorStop(1, 'rgba(255,255,255,0.4)');

      ctx.lineWidth = 3;
      ctx.strokeStyle = flaskGlassGrad;
      ctx.stroke();

      ctx.restore();

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [currentVolume, targetEndpoint, isStirring, isDropping, chemState.rgba]);

  return (
    <div className="w-full flex flex-col items-center justify-center bg-slate-950/80 rounded-2xl p-3 md:p-4 border border-sky-500/20 shadow-inner">
      
      {/* HTML5 Canvas */}
      <canvas
        ref={canvasRef}
        width={360}
        height={480}
        className="w-full max-w-[360px] h-[440px] md:h-[480px] object-contain drop-shadow-2xl"
      />

      {/* Real-time Indicator Gauge Overlay */}
      <div className="w-full flex items-center justify-between bg-slate-900/90 p-3 rounded-xl border border-slate-800 text-xs mt-2 font-mono">
        <div className="flex items-center gap-2">
          <div 
            className="w-4 h-4 rounded-full border border-white/40 shadow-sm transition-colors duration-300"
            style={{ backgroundColor: chemState.rgba }}
          />
          <span className="text-slate-300 font-sans font-medium">{chemState.colorName}</span>
        </div>
        <div className="text-sky-400 font-bold">
          pH ≈ {chemState.ph.toFixed(1)}
        </div>
      </div>

    </div>
  );
};
