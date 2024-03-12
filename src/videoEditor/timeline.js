import React, { useEffect, useState } from 'react';
import { fabric } from 'fabric';
import Strip from './addStrip';
import { Scale } from './scale';
import { Grid } from './grid';

function Timechart() {
  const pixpersecond = 10;
  const initialDuration = 800;// duration in seconds
  const intialLayers = 12;
  const currentDuration = 600;
  const currentLayers = 12;
  const gridYgap = 50;
  const gridXgap = pixpersecond;
  let [canvasMain, setCanvasMain] = useState(null);

  useEffect(() => {
    const mainCanvas = new fabric.Canvas("canvasMainRef", {
      width: initialDuration * pixpersecond,
    });
    setCanvasMain(mainCanvas);
    //drawing timescale of duration initialduration
    Scale(mainCanvas, initialDuration, gridXgap, gridYgap);
    //drawing grid for element snapping with initialLayers number of rows with height gridYgap
    Grid(mainCanvas, intialLayers, gridYgap);
  }, []);
  

  return (
    <>
      <div style={{ position: "absolute", backgroundColor: "black", left: "9px", bottom: "10px", width: '98%', height: '340px', overflowY: "scroll" }}>
        <canvas id="canvasMainRef" width={`${initialDuration*pixpersecond}px`} height="340px" ></canvas>
      </div>
      <Strip
        elementId="testing" // replace with the actual elementId
        canvasMain={canvasMain}
        currentTime={0}
        pixpersecond={pixpersecond}
        gridYgap={gridYgap}
      />
    </>
  );
}

export default Timechart;
