import { fabric } from 'fabric';

export const Grid = (canvasMain, Layers, gridYgap) => {
    canvasMain.setHeight((Layers+1)*gridYgap);
    for (var i = 0; i < Layers+1; i++) {
        canvasMain.add(new fabric.Line([0, i * gridYgap, canvasMain.width, i * gridYgap], {
            type: 'line',
            stroke: '#ffffff',
            selectable: false
      }));
    } 

    canvasMain.on('object:moving', function(options) { 
        options.target.set({
          top: Math.round(options.target.top / gridYgap) * gridYgap
        });
    });
}