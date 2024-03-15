import React, { useEffect, useState } from 'react';
import { fabric } from 'fabric';
import Strip from './addStrip';
import { Scale } from './scale';
import { Grid } from './grid';


function Timechart() {
  const pixpersecond = 10;
  const initialDuration = 143.9;// duration in seconds
  const intialLayers = 6;
  const currentDuration = 600;
  const currentLayers = 12;
  const gridYgap = 50;
  let [canvasMain, setCanvasMain] = useState(null);
  let dragMode = false;
  const STATE_IDLE = 'idle';
  const STATE_PANNING = 'panning';
  const panLeftLimit = 0;
  const panRightLimit = 10000;
  let x = 0;

  fabric.Canvas.prototype.toggleDragMode = function(dragMode){
    let lastClientX;
    let lastClientY;
    let state = STATE_IDLE;
    
    if (dragMode) {
      console.log("drag mode activated");
      this.discardActiveObject();
      this.defaultCursor = 'move';
    
      this.forEachObject(function(object) {
        object.prevEvented = object.evented;
        object.prevSelectable = object.selectable;
        object.evented = false;
        object.selectable = false;
      });
    
      this.selection = false;
    
      const handleMouseUp = (e) => {
        state = STATE_IDLE;
        // this.off('mouse:up', handleMouseUp);
      };
  
      const handleMouseDown = (e) => {
        state = STATE_PANNING;
        lastClientX = e.e.clientX;
        lastClientY = e.e.clientY;
      };
  
      const handleMouseMove = (e) => {
        if (state === STATE_PANNING && e && e.e) {
          let deltaX = 0;
          let deltaY = 0;
    
          if (lastClientX) {
            deltaX = e.e.clientX - lastClientX;
            if (this.viewportTransform[4] + deltaX > panLeftLimit) {
              deltaX = panLeftLimit - this.viewportTransform[4];
            }
          }
          x = -this.viewportTransform[4];
          console.log(x);
          //update scale Scale(mainCanvas, initialDuration, pixpersecond, gridYgap);
          lastClientX = e.e.clientX;
    
          let delta = new fabric.Point(deltaX, deltaY);
          this.relativePan(delta);
        }
      };
  
      this.on('mouse:up', handleMouseUp);
      this.on('mouse:down', handleMouseDown);
      this.on('mouse:move', handleMouseMove);
    } else {
      this.forEachObject(function(object) {
        object.evented = (object.prevEvented !== undefined) ? object.prevEvented : object.evented;
        object.selectable = (object.prevSelectable !== undefined) ? object.prevSelectable : object.selectable;
      });
    
      this.defaultCursor = 'default';
      // this.selection = true;
      this.off('mouse:up');
      this.off('mouse:down');
      this.off('mouse:move');
    }
  };

  // useEffect(()=>{
  //   if(x%(5*pixpersecond)==0){
  //     //Redraw scale
  //     Scale(canvasMain, pixpersecond);
  //   }
  // },[x]);

  useEffect(() => {
    const mainCanvas = new fabric.Canvas("canvasMainRef", {
      width: initialDuration * pixpersecond,
    });
    mainCanvas.selection = false;

    setCanvasMain(mainCanvas);
    //drawing timescale of duration initialduration
    Scale(mainCanvas, pixpersecond);
    //drawing grid for element snapping with initialLayers number of rows with height gridYgap
    Grid(mainCanvas, intialLayers, gridYgap);

    //handle delete event
    const handleKeyDown = (event) => {
      if (event.keyCode === 46 && mainCanvas) {
        console.log("element deleted");
        const activeObject = mainCanvas.getActiveObject();
        if (activeObject) {
          mainCanvas.remove(activeObject);
          mainCanvas.renderAll();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  

  return (
    <>
      <p>{x}</p>
      <label htmlFor="dragmode" style={{ position: "absolute", right: "25px", bottom: "355px"}} >
        pan
        <input type="checkbox" id="dragmode" name="dragmode" onClick={() => {
          dragMode = !dragMode;
          canvasMain.toggleDragMode(dragMode);
        }}/>
      </label>
      <div style={{ position: "absolute", backgroundColor: "black", left: "9px", bottom: "10px", width: '98%', height: '340px', overflowY: "scroll" }}>
        <canvas id="canvasMainRef" width="100%" height="340px" ></canvas>
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