import React, { useEffect, useRef } from "react";

export default function LevelChart() {
  const canvasRef = useRef(null);

  const WIDTH = 1273;
  const HEIGHT = 450;

  const PADDING = {
    left: 80,
    right: 40,
    top: 30,
    bottom: 60,
  };

  const Y_MIN = 1200;
  const Y_MAX = 4200;

  // Background rating bands
  const bands = [
    { from: 3500, to: 4200, color: "#8B0000" },
    { from: 3000, to: 3500, color: "#FF2B2B" },
    { from: 2600, to: 3000, color: "#FFA500" },
    { from: 2100, to: 2600, color: "#FF77FF" },
    { from: 1600, to: 2100, color: "#A6A6FF" },
    { from: 1400, to: 1600, color: "#66E0A3" },
    { from: 1200, to: 1400, color: "#7CFF7C" },
  ];

  // Sample data (replace with real data)
  const data = [
    { year: 2010, value: 1600 },
    { year: 2011, value: 2400 },
    { year: 2012, value: 2900 },
    { year: 2013, value: 3100 },
    { year: 2014, value: 3200 },
    { year: 2015, value: 3300 },
    { year: 2016, value: 3500 },
    { year: 2017, value: 3600 },
    { year: 2018, value: 3200 },
    { year: 2019, value: 3600 },
    { year: 2020, value: 3700 },
    { year: 2021, value: 3800 },
    { year: 2022, value: 3900 },
    { year: 2023, value: 3800 },
    { year: 2024, value: 3600 },
    { year: 2025, value: 4000 },
    { year: 2026, value: 3700 },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    const chartWidth = WIDTH - PADDING.left - PADDING.right;
    const chartHeight = HEIGHT - PADDING.top - PADDING.bottom;

    const xScale = (year) =>
      PADDING.left +
      ((year - data[0].year) /
        (data[data.length - 1].year - data[0].year)) *
        chartWidth;

    const yScale = (value) =>
      PADDING.top +
      ((Y_MAX - value) / (Y_MAX - Y_MIN)) * chartHeight;

    // Clear canvas
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    // Draw background bands
    bands.forEach((band) => {
      ctx.fillStyle = band.color;
      const yTop = yScale(band.to);
      const yBottom = yScale(band.from);
      ctx.fillRect(
        PADDING.left,
        yTop,
        chartWidth,
        yBottom - yTop
      );
    });

    // Y grid + labels
    ctx.strokeStyle = "rgba(255,255,255,0.25)";
    ctx.fillStyle = "#000";
    ctx.font = "12px Arial";

    for (let y = Y_MIN; y <= Y_MAX; y += 400) {
      const py = yScale(y);
      ctx.beginPath();
      ctx.moveTo(PADDING.left, py);
      ctx.lineTo(WIDTH - PADDING.right, py);
      ctx.stroke();
      ctx.fillText(y.toString(), 20, py + 4);
    }

    // X labels
    data.forEach((d) => {
      const x = xScale(d.year);
      ctx.fillText(d.year.toString(), x - 14, HEIGHT - 20);
    });

    // Draw line
    ctx.strokeStyle = "#FFD700";
    ctx.lineWidth = 2;
    ctx.beginPath();

    data.forEach((d, i) => {
      const x = xScale(d.year);
      const y = yScale(d.value);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });

    ctx.stroke();

    // Draw points
    data.forEach((d) => {
      const x = xScale(d.year);
      const y = yScale(d.value);

      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fillStyle = "#FFFFFF";
      ctx.fill();
      ctx.strokeStyle = "#FFD700";
      ctx.stroke();
    });

    // Legend
    ctx.fillStyle = "#FFD700";
    ctx.fillRect(WIDTH - 150, 20, 14, 14);
    ctx.fillStyle = "#000";
    ctx.fillText("tourist", WIDTH - 125, 32);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="flot-overlay"
      style={{
        direction: "ltr",
        position: "absolute",
        left: 0,
        top: 0,
        width: "849px",
        height: "300px",
      }}
    />
  );
}
