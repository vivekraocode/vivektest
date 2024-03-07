import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import Strip from './addStrip';
import { Scale } from './scale';
import { Grid } from './grid';

function Timechart() {
  const pixpersecond = 10;
  const initialDuration = 600;// duration in seconds
  const intialLayers = 12;
  const currentDuration = 600;
  const currentLayers = 12;
  const gridYgap = 50;
  const gridXgap = pixpersecond;
  const canvasMainRef = useRef(null);
  const canvasScaleRef = useRef(null);
  let canvasMain;
  let canvasScale;

  useEffect(() => {
  if(!canvasFabricEffect){
      canvasMain = new fabric.Canvas(canvasMainRef.current);
      Grid(canvasMain, intialLayers);
  }
  if(!canvasScaleFabric){
      canvasScale = new fabric.Canvas(canvasScaleRef.current);
      Scale(canvasScale, initialDuration);
  }
  }, []);


  return (
    <>
      <Strip
        elementId="testing" // replace with the actual elementId
        currentTime={0}
        pixpersecond={pixpersecond}
        gridYgap={gridYgap}
      />
      <div style={{ position: "absolute", backgroundColor: "black", left: "9px", bottom: "10px", width: '98%', height: '340px', overflowY: "scroll" }}>
        <canvas ref={canvasScaleRef} id="canvasScale" width={`${initialDuration*pixpersecond}px`} height="40px"></canvas>
        <canvas ref={canvasMainRef} id="canvas" width={`${initialDuration*pixpersecond}px`} height="300px" ></canvas>
      </div>
    </>
  );
}

export default Timechart;
