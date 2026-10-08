import { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let lines: { x: number; y: number; speed: number; opacity: number; }[] = [];
    const numLines = 60;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      lines = [];
      for (let i = 0; i < numLines; i++) {
        lines.push({
          x: Math.random() * canvas.width * 2 - canvas.width,
          y: Math.random() * canvas.height * 2 - canvas.height,
          speed: Math.random() * 0.8 + 0.2,
          opacity: Math.random() * 0.4 + 0.1,
        });
      }
    };
    window.addEventListener('resize', resize);
    resize();

    const animate = () => {
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.shadowBlur = 10;
      ctx.shadowColor = '#b91c1c';
      ctx.lineWidth = 1.5;
      
      lines.forEach(line => {
        line.x += line.speed;
        line.y += line.speed;
        
        // Wrap around
        if (line.x > canvas.width + canvas.height) line.x = -canvas.height;
        if (line.y > canvas.height + canvas.width) line.y = -canvas.width;

        ctx.strokeStyle = `rgba(220, 38, 38, ${line.opacity})`;
        ctx.beginPath();
        ctx.moveTo(line.x, line.y);
        ctx.lineTo(line.x + canvas.height, line.y - canvas.height);
        ctx.stroke();
      });
      ctx.shadowBlur = 0;
      requestAnimationFrame(animate);
    };
    animate();

    return () => window.removeEventListener('resize', resize);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0" />;
};

export default AnimatedBackground;
