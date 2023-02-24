//select the canvas element
const cvs = document.getElementById("breakout");
//get the context of the canvas
const ctx = cvs.getContext("2d");

//BORDER..
cvs.style.border = "3px solid #cae0e8";

ctx.lineWidth = 3; //make line thick

//for paddle shadow effect:
//ctx.shadowColor = "black";
ctx.shadowBlur = 6;
ctx.shadowOffsetX = 6;
ctx.shadowOffsetY = 6;
ctx.shadowColor = "red";


//////////////////////////////////////////////////////////////////

//VARIABLES & CONSTANTS..

//centering my paddle in the canvas:
const PADDLE_WIDTH = 100;   
const PADDLE_MARGIN_BOTTOM = 50;
const PADDLE_HEIGHT = 20;

//movevment vars:
let leftArrow = false;
let rightArrow = false;
//////////////////////////////////////////////////////////////////


//THE PADDLE..
const paddle = {
   x : cvs.width/2 - PADDLE_WIDTH/2,  //the x position
   y : cvs.height - PADDLE_MARGIN_BOTTOM - PADDLE_HEIGHT,  //the y position
   width : PADDLE_WIDTH ,  //width of my paddle
   height : PADDLE_HEIGHT, //height of my paddle
   dx :5                   //delta x
}

//paddle drawing function:
function drawPaddle()
{
    ctx.fillStyle = "#2e3548";
    ctx.fillRect(paddle.x ,paddle.y, paddle.width, paddle.height);
    ctx.strokeStyle = "#05bcff";
    ctx.strokeRect(paddle.x ,paddle.y, paddle.width, paddle.height);

}

//Draw functtion:
function draw()
{
  drawPaddle();
}

//PADDLE MOVEMENT..
document.addEventListener("keyup",function(event)
{
  if(event.keyCode == 37)
  {
    leftArrow = false;
  }else if (event.keyCode == 39)
  {
    rightArrow = false;
  }
});

document.addEventListener("keydown",function(event)
{
  if(event.keyCode == 37)
  {
    leftArrow = true;
  }else if (event.keyCode == 39)
  {
    rightArrow = true;
  }
});

function paddleMovevment()
{
  if(rightArrow && paddle.x + paddle.width < cvs.width){
    paddle.x += paddle.dx;
  }
  else if (leftArrow && paddle.x >0){
    paddle.x -= paddle.dx;
  }
}

//UPDATE GAME FUNCTION..
function updateMyScreen()
{
  
  paddleMovevment() ;
}

//GAME LOOP
function loop()
{
   
    ctx.drawImage(BKIMG, 0, 0);
    draw();

    updateMyScreen();

    requestAnimationFrame(loop);
}
loop();

///////////////////////////////////////////////////////////////////