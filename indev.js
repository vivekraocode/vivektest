const STATE_IDLE = 'idle';
const STATE_PANNING = 'panning';
const originXLimit = 0;

fabric.Canvas.prototype.toggleDragMode = function(dragMode){
  let lastClientX;
  let lastClientY;
  let state = STATE_IDLE;

  if (dragMode) {
    this.discardActiveObject();
    this.defaultCursor = 'move';

    this.forEachObject(function(object) {
      object.prevEvented = object.evented;
      object.prevSelectable = object.selectable;
      object.evented = false;
      object.selectable = false;
    });

    this.selection = false;

    this.on('mouse:up', function(e) {
      state = STATE_IDLE;
    });

    this.on('mouse:down', (e) => {
      state = STATE_PANNING;
      lastClientX = e.e.clientX;
      lastClientY = e.e.clientY;
    });

    this.on('mouse:move', (e) => {
      if (state === STATE_PANNING && e && e.e) {
        let deltaX = 0;
        let deltaY = 0;

        if (lastClientX) {
          deltaX = e.e.clientX - lastClientX;
          if (this.viewportTransform[4] + deltaX > originXLimit) {
            deltaX = originXLimit - this.viewportTransform[4];
          }
        }
        // Prevent vertical panning by keeping deltaY as 0
        lastClientX = e.e.clientX;

        let delta = new fabric.Point(deltaX, deltaY);
        this.relativePan(delta);
        this.trigger('moved');
      }
    });
  } else {
    this.forEachObject(function(object) {
      object.evented = (object.prevEvented !== undefined) ? object.prevEvented : object.evented;
      object.selectable = (object.prevSelectable !== undefined) ? object.prevSelectable : object.selectable;
    });

    this.defaultCursor = 'default';
    this.off('mouse:up');
    this.off('mouse:down');
    this.off('mouse:move');
    this.selection = true;
  }
};

let canvas = new fabric.Canvas('fabric');
canvas.backgroundColor = '#f1f1f1';

let rect = new fabric.Rect({
  width: 100,
  height: 100,
  fill: '#f00'
});
canvas.add(rect);

rect = new fabric.Rect({
  width: 200,
  height: 200,
  top: 200,
  left: 200,
  fill: '#f00'
});
canvas.add(rect);

let dragMode = false;
$('#dragmode').change(_ => {
  dragMode = !dragMode;
  canvas.toggleDragMode(dragMode);
});