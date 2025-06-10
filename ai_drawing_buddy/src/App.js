import React, { useRef, useEffect, useState } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";

function App() {
  const canvasRef = useRef();
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [strokeColor, setStrokeColor] = useState("#000");

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleExport = async () => {
    const imageData = await canvasRef.current.exportImage("png");
    console.log("Exported Image:", imageData);
  };

  const handleClear = () => {
    canvasRef.current.clearCanvas();
  };

  const colors = ["#000000", "#ff0000", "#00cc00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"];

  return (
    <div style={{ textAlign: "center", position: "relative" }}>
      <ReactSketchCanvas
        ref={canvasRef}
        strokeColor={strokeColor}
        canvasColor="#fff"
        width={`${dimensions.width}px`}
        height={`${dimensions.height}px`}
        strokeWidth={4}
      />

      {/* Color Picker */}
      <div
        style={{
          position: "absolute",
          top: 20,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "10px",
          zIndex: 1000,
        }}
      >
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => setStrokeColor(color)}
            style={{
              backgroundColor: color,
              border: strokeColor === color ? "3px solid #444" : "2px solid #ccc",
              borderRadius: "50%",
              width: "32px",
              height: "32px",
              cursor: "pointer",
            }}
          />
        ))}
      </div>

      {/* Action Buttons */}
      <div
        style={{
          position: "absolute",
          bottom: 30,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000,
          display: "flex",
          gap: "20px",
        }}
      >
        <button
          onClick={handleClear}
          style={{
            padding: "16px 28px",
            fontSize: "16px",
            backgroundColor: "#f44336",
            color: "#fff",
            border: "none",
            borderRadius: "12px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            cursor: "pointer",
          }}
        >
          🧹 Clear
        </button>

        <button
          onClick={handleExport}
          style={{
            padding: "16px 28px",
            fontSize: "16px",
            backgroundColor: "#4CAF50",
            color: "#fff",
            border: "none",
            borderRadius: "12px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            cursor: "pointer",
          }}
        >
          ✨ Enhance with AI
        </button>
      </div>
    </div>
  );
}

export default App;
