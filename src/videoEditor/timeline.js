import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import Strip from './addStrip';


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
  let canvasFabricEffect;
  let canvasScaleFabric;

  //scale function
  const Scale = (duration) => {
    const context = canvasScaleFabric.getContext('2d');
    let width = Math.max(initialDuration*pixpersecond,duration*pixpersecond)
    canvasScaleFabric.width = width;
    console.log(canvasScaleFabric.width, canvasScaleFabric.getWidth());
    canvasFabricEffect.width = width;

    context.fillStyle = 'black';
    context.fillRect(0, 0, canvasScaleFabric.width, 30);

    context.fillStyle = 'white';
    context.font = '12px Arial';
    context.textAlign = 'center';

    const timeInterval = 5*pixpersecond;
    for (let i = 0; i <= canvasScaleFabric.width; i += timeInterval) {
      context.fillText((Math.floor(i / 600))+ ":" + ("0" + Math.floor((i / 10) % 60)).slice(-2), i+3, 30);
      context.strokeStyle = 'white';
      context.beginPath();
      context.moveTo(i, 0);
      context.lineTo(i, 20);
      context.stroke();
    }
    for (let i = 0; i <= canvasScaleFabric.width; i += timeInterval/5) {
      context.strokeStyle = 'white';
      context.beginPath();
      context.moveTo(i, 0);
      context.lineTo(i, 10);
      context.stroke();
    }
  }

  //create grid 
  const Grid = (layers) => {
    var count = Math.max(intialLayers,layers);
    for (var i = 0; i < count; i++) {
      canvasFabricEffect.add(new fabric.Line([0, i * gridYgap, canvasFabricEffect.width, i * gridYgap], {
            type: 'line',
            stroke: '#ffffff',
            selectable: false
      }));
    }
    
  }

  canvasFabricEffect.on('object:moving', function(options) { 
    options.target.set({
      top: Math.round(options.target.top / gridYgap) * gridYgap
    });
  });

  useEffect(() => {
  if(!canvasFabricEffect){
      canvasFabricEffect = new fabric.Canvas(canvasMainRef.current);
  }
  if(!canvasScaleFabric){
      canvasScaleFabric = new fabric.Canvas(canvasScaleRef.current);
  }

    Scale(currentDuration);
    Grid(currentLayers);
  }, []);


  return (
    <>
      {/* <Strip
        elementId="testing" // replace with the actual elementId
        currentTime={0}
        pixpersecond={pixpersecond}
        gridYgap={gridYgap}
      /> */}
      <div style={{ position: "absolute", backgroundColor: "black", left: "9px", bottom: "10px", width: '98%', height: '340px', overflowY: "scroll" }}>
        <canvas ref={canvasScaleRef} id="canvasScale" width={`${initialDuration*pixpersecond}px`} height="40px"></canvas>
        <canvas ref={canvasMainRef} id="canvas" width={`${initialDuration*pixpersecond}px`} height="300px" ></canvas>
      </div>
    </>
  );
}

export default Timechart;
