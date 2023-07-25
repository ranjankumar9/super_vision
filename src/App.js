import React, { useRef, useEffect, useState } from 'react';

const PointToLine = () => {
  const canvasRef = useRef(null);
  const [points, setPoints] = useState({ point1: null, point2: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (points.point1 && points.point2) {
      ctx.beginPath();
      ctx.moveTo(points.point1.x, points.point1.y);
      ctx.lineTo(points.point2.x, points.point2.y);
      ctx.strokeStyle = 'blue';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }, [points]);

  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (!points.point1) {
      setPoints((prevPoints) => ({
        ...prevPoints,
        point1: { x, y },
      }));
    } else if (!points.point2) {
      setPoints((prevPoints) => ({
        ...prevPoints,
        point2: { x, y },
      }));
    }
  };

  return (
    <div>
      <h1>Point to Line</h1>
      <canvas
        ref={canvasRef}
        width={500}
        height={300}
        style={{ border: '1px solid black' }}
        onClick={handleCanvasClick}
      />
      {points.point1 && <div>Point 1: ({points.point1.x}, {points.point1.y})</div>}
      {points.point2 && <div>Point 2: ({points.point2.x}, {points.point2.y})</div>}
    </div>
  );
};

export default PointToLine;

