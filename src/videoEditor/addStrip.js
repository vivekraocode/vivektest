import { ElementsIdWise } from "./elements";
import { fabric } from "fabric";

function Strip({elementId, canvasMain, currentTime, pixpersecond,gridYgap}){
    console.log(elementId, canvasMain, currentTime, pixpersecond,gridYgap)
    return(
        <button id={elementId+"-strip"} onClick={() => {
            let strip = new fabric.Rect({ 
                    left: currentTime, 
                    top: 0, 
                    width: 6000,//ElementsIdWise[elementId]["trueDuration"]*pixpersecond, 
                    height: gridYgap, 
                    type: 'rectangle',
                    fill: '#fab', 
                    stroke:'',
                    originX: 'left', 
                    originY: 'top',
                    id: elementId, 
                    hasControls: true,		
                    centeredRotation: true
            });
            strip.setControlsVisibility({
                mt: false,
                mb: false,
                ml: true,
                mr: true,
                tl: false,
                tr: false,
                mtr: false,
                bl: false,
                br: false
            });
            canvasMain.add(strip);
        }}>video</button>
    )
}

export default Strip;