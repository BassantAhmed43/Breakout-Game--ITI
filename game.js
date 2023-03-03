// SELECT CANVAS ELEMENT
const cvs = document.getElementById("breakout");
const ctx = cvs.getContext("2d");

// ADD BORDER TO CANVAS
cvs.style.border = "3px solid #cae0e8";

ctx.lineWidth = 3; //make line thick

//for paddle shadow effect:
//ctx.shadowColor = "black";
ctx.shadowBlur = 6;
ctx.shadowOffsetX = 6;
ctx.shadowOffsetY = 6;
ctx.shadowColor = "red";

ballsound=document.getElementById("ball");

//////////////////////////////////////////////////////////////////

//VARIABLES & CONSTANTS..


const PADDLE_WIDTH = 100;   
const PADDLE_MARGIN_BOTTOM = 50;
const PADDLE_HEIGHT = 20;
const BALL_RADIUS = 8;
let E = 3;
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


// CREATE THE BALL
const ball = {
    x : cvs.width/2,
    y : paddle.y - BALL_RADIUS,
    radius : BALL_RADIUS,
    speed : 4,
    dx : 3 * (Math.random() * 2 - 1),
    dy : -3
}

// DRAW THE BALL
function drawBall(){
    ctx.beginPath();
    
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
    ctx.fillStyle =  "#2e3548";
    ctx.fill();
    
    ctx.strokeStyle = "#05bcff";
    ctx.stroke();
    
    ctx.closePath();
}

// MOVE THE BALL
function moveBall(){
  document.getElementById("audio").volume=0.6;
  document.getElementById("audio").play();
    ball.x += ball.dx;
    ball.y += ball.dy;
}

// BALL AND WALL COLLISION DETECTION
function ballWallCollision(){
    
    if(ball.x + ball.radius > cvs.width || ball.x - ball.radius < 0){
        ball.dx = - ball.dx;
        ballsound.volume=1;
        ballsound.play();
    }
    
    if(ball.y - ball.radius < 0){
        ball.dy = -ball.dy;
        ballsound.volume=1;
        ballsound.play();
    }
    if(ball.y + ball.radius > cvs.height){
        E--; // LOSE LIFE'
        resetBall();
        resetpaddle()
    if(E == 0){
            resetBall();
            resetpaddle()
            gameover();
        }

    }
}



function gameover(){
    window.location = 'game_over.html';

}

// RESET THE BALL
function resetBall(){
    ball.x = cvs.width/2;
    ball.y = paddle.y - BALL_RADIUS;
    ball.dx = 3 * (Math.random() * 2 - 1);
    ball.dy = -3;
}

// RESET THE paddle
function resetpaddle(){
    paddle.x = cvs.width/2 - PADDLE_WIDTH/2,  //the x position
    paddle.y = cvs.height - PADDLE_MARGIN_BOTTOM - PADDLE_HEIGHT,  //the y position
    paddle.dx =5
}


// BALL AND PADDLE COLLISION
function ballPaddleCollision(){
    if(ball.x < paddle.x + paddle.width && ball.x > paddle.x && paddle.y < paddle.y + paddle.height && ball.y > paddle.y){
        
        ballsound.volume=1;
        ballsound.play();
        // CHECK WHERE THE BALL HIT THE PADDLE
        let collidePoint = ball.x - (paddle.x + paddle.width/2);
        
        // NORMALIZE THE VALUES
        collidePoint = collidePoint / (paddle.width/2);
        
        // CALCULATE THE ANGLE OF THE BALL
        let angle = collidePoint * Math.PI/3;
            
            
        ball.dx = ball.speed * Math.sin(angle);
        ball.dy = - ball.speed * Math.cos(angle);
    }
}

// DRAW FUNCTION
function draw(){
    drawPaddle();
    
    drawBall();
}

// UPDATE GAME FUNCTION
function update(){
    paddleMovevment();
    
    moveBall();
    
    ballWallCollision();
    
    ballPaddleCollision();
}

// GAME LOOP
function loop(){
    // CLEAR THE CANVAS
    ctx.drawImage(BKIMG, 0, 0);
    
    draw();
    
    update();
    
    requestAnimationFrame(loop);
}
loop();
