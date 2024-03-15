import { fabric } from "fabric";
import { ElementsIdWise } from "./elements";

function Strip({elementId, canvasMain, currentTime, pixpersecond,gridYgap}){
    return(
        <button id={elementId+"-strip"} 
        onClick={() => {
            let strip = new fabric.Rect({ 
                    left: currentTime, 
                    top: gridYgap, 
                    width: ElementsIdWise[elementId]["trueDuration"]*pixpersecond, 
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
            strip.on("modified", function () {
                const boundingBox = strip.getBoundingRect();
                const canvasWidth = canvasMain.width;
                const canvasHeight = canvasMain.height;

                if (boundingBox.left < 0) {
                    strip.set({ left: 0 });
                }
                if (boundingBox.top < gridYgap) {
                    strip.set({ top: gridYgap });
                }
                if (boundingBox.left + boundingBox.width > canvasWidth) {
                    strip.set({ left: canvasWidth - boundingBox.width });
                }
                if (boundingBox.top + boundingBox.height > canvasHeight) {
                    strip.set({ top: canvasHeight - boundingBox.height });
                }

                canvasMain.renderAll();
            });
            canvasMain.add(strip);
        }}>
            video
        </button>
    )
}

export default Strip;