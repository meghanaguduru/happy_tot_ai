import React, { useRef, useState, useEffect } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import { FaUndo, FaSave, FaMagic, FaEraser, FaTrash } from "react-icons/fa";

function App() {
  const canvasRef = useRef();
  const [strokeColor, setStrokeColor] = useState("#000");
  const [strokeWidth, setStrokeWidth] = useState(6);
  const [dimensions, setDimensions] = useState({ width: 400, height: 400 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const handleExport = async () => {
    const imageData = await canvasRef.current.exportImage("png");
    console.log("Exported Image:", imageData); // Send to AI or save
  };

  const handleUndo = () => {
    canvasRef.current.undo();
  };

  const handleClear = () => {
    canvasRef.current.clearCanvas();
  };

  const handleSave = async () => {
    const imageData = await canvasRef.current.exportImage("png");
    const link = document.createElement("a");
    link.href = imageData;
    link.download = "drawing.png";
    link.click();
  };

  const setEraser = () => {
    setStrokeColor("#fff");
    setStrokeWidth(20);
  };

  return (
    <div style={{ backgroundColor: "#fff8f0", height: "100vh", overflow: "hidden" }}>
      <ReactSketchCanvas
        ref={canvasRef}
        strokeColor={strokeColor}
        canvasColor="#fff"
        width={`${dimensions.width}px`}
        height={`${dimensions.height}px`}
        strokeWidth={strokeWidth}
      />

      {/* Bottom controls */}
      <div style={{
        position: "absolute",
        bottom: "0",
        width: "100%",
        padding: "12px 0",
        backgroundColor: "#fdfdfd",
        boxShadow: "0 -4px 12px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "24px",
      }}>
        {/* Row 1: Colors & thickness */}
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
          {["#000", "#f00", "#0a0", "#00f", "#ffa500", "#ff69b4", "#00ced1"].map(color => (
            <div
              key={color}
              onClick={() => setStrokeColor(color)}
              style={{
                backgroundColor: color,
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                border: strokeColor === color ? "3px solid #333" : "2px solid #aaa",
                cursor: "pointer"
              }}
            />
          ))}
          {[6, 12, 20].map(size => (
            <div
              key={size}
              onClick={() => setStrokeWidth(size)}
              style={{
                width: `${size}px`,
                height: `${size}px`,
                borderRadius: "50%",
                backgroundColor: "#888",
                border: strokeWidth === size ? "3px solid #444" : "2px solid #ccc",
                cursor: "pointer"
              }}
              title={`Size ${size}`}
            />
          ))}
        </div>

        {/* Row 2: Tools */}
        <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
          <ToolButton icon={<FaUndo />} color="#00bcd4" onClick={handleUndo} label="Undo" />
          <ToolButton icon={<FaEraser />} color="#ff9800" onClick={setEraser} label="Eraser" />
          <ToolButton icon={<FaTrash />} color="#e53935" onClick={handleClear} label="Clear" />
          <ToolButton icon={<FaSave />} color="#4caf50" onClick={handleSave} label="Save" />
          <ToolButton icon={<FaMagic />} color="#9c27b0" onClick={handleExport} label="Enhance" />
        </div>
      </div>
    </div>
  );
}

const ToolButton = ({ icon, color, onClick, label }) => (
  <button
    onClick={onClick}
    style={{
      backgroundColor: color,
      color: "#fff",
      border: "none",
      borderRadius: "50%",
      width: "48px",
      height: "48px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "22px",
      cursor: "pointer",
      boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
    }}
    title={label}
  >
    {icon}
  </button>
);

export default App;
