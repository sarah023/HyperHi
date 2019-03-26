const cursor = document.querySelector('div.cursor');
const canvasIn = document.querySelector('canvas.in');
const canvasOut = document.querySelector('canvas.out');
//ensures that the mouse does not draw by default
let isMouseDown = false;

//when mouse is held down - make the cursor larger
const growCursor = () => {
  cursor.classList.add('is-down');
};

//when mouse is let go - make the cursor smaller
const shrinkCursor = () => {
  cursor.classList.remove('is-down');
};

//move the cursor based on co-ordinates
const moveCursor = (x, y) => {
  cursor.style.left = x + 'px';
  cursor.style.top = y + 'px';
};

//set up canvas
const setUpCanvas = canvas => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  //retina devices
  const dpi = window.devicePixelRatio;

  canvas.width = width * dpi;
  canvas.height = height * dpi;
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';

  //what context are we using? 2d? 3d? other?
  const context = canvas.getContext('2d');
  //sets scale if using a retina screen
  context.scale(dpi, dpi);
  //canvas styles:
  if (canvas.classList.contains('out')) {
    context.fillStyle = '#fff';
    context.strokeStyle = '#000';
  } else {
    context.fillStyle = '#000';
    context.strokeStyle = '#fff';
  }

  context.lineWidth = 80;
  context.lineCap = 'round';
  context.lineJoin = 'round';

  context.shadowBlur = '10';
  //shadow color depends of the if/else statement
  context.shadowColor = context.strokeStyle;

  context.rect(0, 0, width, height);
  context.fill();
};

//on draw: change the canvas, based on cavas, x and y
const startDraw = (canvas, x, y) => {
  const context = canvas.getContext('2d');
  //   const colors = ['red', 'yellow', 'blue', 'green']
  //   const randomNum = Math.floor(Math.random() * colors.length)

  //   context.strokeStyle = colors[randomNum]
  //   context.moveTo(x, y)
  //starts a brand new path or line everytime - doesn't update the previous lines
  context.beginPath();
};

//draw based on: canvas, x and y
const moveDraw = (canvas, x, y) => {
  const context = canvas.getContext('2d');

  if (isMouseDown) {
    //draws a line to where the mouse is
    context.lineTo(x, y);
    context.stroke();
  }
};

setUpCanvas(canvasIn);
setUpCanvas(canvasOut);
//event listeners
document.addEventListener('mousedown', event => {
  isMouseDown = true;
  growCursor();
  startDraw(canvasIn, event.pageX, event.pageY);
  startDraw(canvasOut, event.pageX, event.pageY);
});

document.addEventListener('mouseup', () => {
  isMouseDown = false;
  shrinkCursor();
});

document.addEventListener('mousemove', event => {
  //event.pageX = where we 'are' on the page left and right
  //event.pageY = where we 'are' on the page up and down
  moveCursor(event.pageX, event.pageY);
  moveDraw(canvasIn, event.pageX, event.pageY);
  moveDraw(canvasOut, event.pageX, event.pageY);
});

//on page resize - reload page
window.addEventListener('resize', () => {
  setUpCanvas(canvasIn);
  setUpCanvas(canvasOut);
});
