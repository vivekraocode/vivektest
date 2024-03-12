import { fabric } from "fabric";

function Strip({elementId, canvasMain, currentTime, pixpersecond,gridYgap}){
    return(
        <button id={elementId+"-strip"} onClick={() => {
            let strip = new fabric.Rect({ 
                    left: currentTime, 
                    top: 0, 
                    width: 600,//ElementsIdWise[elementId]["trueDuration"]*pixpersecond, 
                    height: gridYgap, 
                    type: 'rectangle',
                    fill: '#fab', 
                    stroke:'',
                    originX: 'left', 
                    originY: 'top',
                    id: elementId, 
                    hasControls: true,
                    selectable: true,
                    centeredRotation: true
            });
            canvasMain.add(strip);
        }}>video</button>
    )
}

export default Strip;