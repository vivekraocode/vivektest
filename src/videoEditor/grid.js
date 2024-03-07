export const Grid = (canvasMain, layers) => {
    var count = Math.max(intialLayers,layers);
    for (var i = 0; i < count; i++) {
        canvasMain.add(new fabric.Line([0, i * gridYgap, canvasFabricEffect.width, i * gridYgap], {
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