import React, { useRef, useEffect, useState } from 'react';

const PointToLine = () => {
  const canvasRef = useRef(null);
  const [points, setPoints] = useState({ point1: { x: 0, y: 0 }, point2: { x: 0, y: 0 } });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.moveTo(points.point1.x, points.point1.y);
    ctx.lineTo(points.point2.x, points.point2.y);
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 2;
    ctx.stroke();
  }, [points]);

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPoints((prevPoints) => ({
      ...prevPoints,
      point2: { x, y },
    }));
  };

  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPoints({
      point1: { x, y },
      point2: { x, y },
    });
  };

  return (
    <div>
      <h1>Point to Line</h1>
      <canvas
        ref={canvasRef}
        width={500}
        height={300}
        style={{ border: '1px solid black' }}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
      />
    </div>
  );
};

export default PointToLine;
