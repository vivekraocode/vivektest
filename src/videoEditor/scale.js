import { fabric } from 'fabric';

export const Scale = (canvasMain,duration,pixpersecond,gridYgap) => {
    const timeInterval = 5*pixpersecond;
    const smallIndexHeight = 10;
    const largeIndexHeight = 20;

    for (var i = 0; i < canvasMain.width; i += pixpersecond) {
      if(i%timeInterval==0){
        //adding largeIndexes
        console.log("true");
        canvasMain.add(new fabric.Line([i, 0, i, largeIndexHeight], {
            type: 'line',
            stroke: '#ffffff',
            selectable: false
        }));
        
        //adding labels
        canvasMain.add(new fabric.Text(String(Math.floor((i/pixpersecond) / (60))) + ":" + ((i/pixpersecond)%60 < 10 ? "0" : "") + String((i/pixpersecond)%60), {
            left: i,
            top: largeIndexHeight+2,
            fill: '#ffffff',
            fontSize: 12,
            fontFamily: 'Arial',
        }));
      }
      else{
        //adding smallindexes
        canvasMain.add(new fabric.Line([i, 0, i, smallIndexHeight], {
            type: 'line',
            stroke: '#ffffff',
            selectable: false
        }));
      }
    } 
}