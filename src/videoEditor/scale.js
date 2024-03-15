import { fabric } from 'fabric';

export const Scale = (canvasMain,pixpersecond) => {
    const timeInterval = 5*pixpersecond;
    const smallIndexHeight = 10;
    const largeIndexHeight = 20;

    for (var i = 0; i < canvasMain.width; i += pixpersecond) {
      if(i%timeInterval==0){
        //adding largeIndexes
        canvasMain.add(new fabric.Line([i, 0, i, largeIndexHeight], {
            type: 'line',
            stroke: '#ffffff',
            selectable: false,
            id: "scaleElement"
        }));
        
        //adding labels
        canvasMain.add(new fabric.Text(String(Math.floor((i/pixpersecond) / (60))) + ":" + ((i/pixpersecond)%60 < 10 ? "0" : "") + String((i/pixpersecond)%60), {
            left: i,
            top: largeIndexHeight+2,
            fill: '#ffffff',
            fontSize: 12,
            fontFamily: 'Arial',
            selectable: false,
            id: "scaleElement"
        }));
      }
      else{
        //adding smallindexes
        canvasMain.add(new fabric.Line([i, 0, i, smallIndexHeight], {
            type: 'line',
            stroke: '#ffffff',
            selectable: false,
            id: "scaleElement"
        }));
      }
    } 
}


// import { fabric } from 'fabric';

// export const Scale = (canvasMain, duration, pixpersecond, gridYgap) => {
//     const timeInterval = 5 * pixpersecond;
//     const smallIndexHeight = 10;
//     const largeIndexHeight = 20;
//     const scalePath = [];

//     for (var i = 0; i < canvasMain.width; i += pixpersecond) {
//         const indexHeight = i % timeInterval === 0 ? largeIndexHeight : smallIndexHeight;
//         scalePath.push(`M ${i},0 L ${i},${indexHeight}`);
//     }

//     const scaleElement = new fabric.Path(scalePath.join(' '), {
//         type: 'path',
//         stroke: '#ffffff',
//         selectable: false,
//         id: "scaleElement"
//     });

//     canvasMain.add(scaleElement);
// }
