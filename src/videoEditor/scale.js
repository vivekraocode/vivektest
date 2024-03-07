export const Scale = (canvasScale,duration) => {
    const context = canvasScale.getContext('2d');
    let width = Math.max(initialDuration*pixpersecond,duration*pixpersecond)
    canvasScale.width = width;
    console.log(canvasScale.width, canvasScaleFabric.getWidth());
    canvasScale.width = width;

    context.fillStyle = 'black';
    context.fillRect(0, 0, canvasScale.width, 30);

    context.fillStyle = 'white';
    context.font = '12px Arial';
    context.textAlign = 'center';

    const timeInterval = 5*pixpersecond;
    for (let i = 0; i <= canvasScale.width; i += timeInterval) {
      context.fillText((Math.floor(i / 600))+ ":" + ("0" + Math.floor((i / 10) % 60)).slice(-2), i+3, 30);
      context.strokeStyle = 'white';
      context.beginPath();
      context.moveTo(i, 0);
      context.lineTo(i, 20);
      context.stroke();
    }
    for (let i = 0; i <= canvasScale.width; i += timeInterval/5) {
      context.strokeStyle = 'white';
      context.beginPath();
      context.moveTo(i, 0);
      context.lineTo(i, 10);
      context.stroke();
    }
}