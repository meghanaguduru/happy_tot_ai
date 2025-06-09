import React, { useRef } from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';

function App() {
  const canvasRef = useRef();

  const handleExport = async () => {
    const imageData = await canvasRef.current.exportImage("png");
    console.log("Exported Image:", imageData); // base64 image
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Drawing Buddy</h1>
      <ReactSketchCanvas
        ref={canvasRef}
        strokeColor="#000"
        canvasColor="#fff"
        width="400px"
        height="400px"
        strokeWidth={4}
      />
      <br />
      <button onClick={handleExport}>✨ Enhance with AI</button>
    </div>
  );
}

export default App;
