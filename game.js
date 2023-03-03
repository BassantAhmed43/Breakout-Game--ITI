// SELECT CANVAS ELEMENT
const cvs = document.getElementById("breakout");
const ctx = cvs.getContext("2d");




// ADD BORDER TO CANVAS
cvs.style.border = "2px solid #000000";

ctx.lineWidth = 3; //make line thick

//for paddle shadow effect:
//ctx.shadowColor = "black";
ctx.shadowBlur = 6;
ctx.shadowOffsetX = 6;
ctx.shadowOffsetY = 6;
ctx.shadowColor = "red";

ballsound=document.getElementById("ball");

//VARIABLES & CONSTANTS..

const PADDLE_WIDTH = 100;   
const PADDLE_MARGIN_BOTTOM = 50;
const PADDLE_HEIGHT = 20;
const BALL_RADIUS = 8;
let LIFE = 3;
let SCORE = 0; 
let HighScore = 0;
const SCORE_UNIT = 2;
//movevment vars:
let leftArrow = false;
let rightArrow = false;
/////
//LocalStorage 

///////////////////////


//THE PADDLE..
const paddle = {
    x : cvs.width/2 - PADDLE_WIDTH/2,  //the x position
    y : cvs.height - PADDLE_MARGIN_BOTTOM - PADDLE_HEIGHT,  //the y position
    width : PADDLE_WIDTH ,  //width of my paddle
    height : PADDLE_HEIGHT, //height of my paddle
    dx :5                   //delta x
 }
 // THE BRICK..
 const Brick ={
  row : 3,
  coluwn : 8,
  width : 55,
  height : 20,
  offsetleft : 20,
  offsetTop : 20,
  marginTop :40,
  //fillcolor : "#FFFFFF",
  //strokeColor : "#2e3548",
 }
 // THE ARRAY OF THE BRICKS
 let bricks = [];
 function CreateBricks() {
for(let i = 0; i < Brick.row; i++){
  bricks[i]=[];
  for(let j = 0; j < Brick.coluwn; j++){
    bricks[i][j] = {
      x : j*(Brick.width +Brick.offsetleft) + Brick.offsetleft,
      y : i*(Brick.height +Brick.offsetTop) + Brick.offsetTop+Brick.marginTop,
      status: 2
    };
  }
}
 }
 CreateBricks();
 // DRAW OF THE BRICKS
 function DrawBricks(){
 for(let i = 0; i < Brick.row; i++){
  for(let j = 0; j < Brick.coluwn; j++){
       if(bricks[i][j].status > 0){
       //ctx.fillStyle = Brick.fillcolor;
       ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(bricks[i][j].x, bricks[i][j].y, Brick.width, Brick.height);
        //ctx.strokeStyle = Brick.strokeColor;
        ctx.strokeStyle =  "#2e3548";
        ctx.strokeRect(bricks[i][j].x, bricks[i][j].y, Brick.width, Brick.height);
       
        if(bricks[i][j].status == 2)
        {
         // ctx.fillstyle = "0095DD";
         ctx.fillStyle = "#FFFFFF";

          ctx.fillRect(bricks[i][j].x, bricks[i][j].y, Brick.width, Brick.height);

                }
      
        else if(bricks[i][j].status == 1)
        {
         //ctx.fillStyle = "#17dd23";
         ctx.fillStyle = "#000000";


          ctx.fillRect(bricks[i][j].x, bricks[i][j].y, Brick.width, Brick.height);

        }
        else 
        {
         ctx.fillStyle = "#017dd23";

          ctx.fillRect(bricks[i][j].x, bricks[i][j].y, Brick.width, Brick.height);

        }
      }            
  }
}
 }
//////

//////
function ballBrickCollision(){  
  for(let i=0; i<Brick.row; i++){
     for(let j=0; j<Brick.coluwn; j++){
      let b = bricks[i][j];
      if(b.status > 0){
        if(ball.x + ball.radius > b.x 
          && ball.x - ball.radius < b.x + Brick.width 
          && ball.y + ball.radius > b.y 
          && ball.y - ball.radius < b.y+Brick.height)
        {
          ball.dy = - ball.dy;
          b.status = b.status - 1 ;
          SCORE += SCORE_UNIT;
          HighScore += SCORE_UNIT;
          let Win = true ;
          for(let i1=0; i1<Brick.row; i1++){
            for(let j1=0; j1<Brick.coluwn; j1++){
              if (bricks[i1][j1].status != 0){
                Win = false;
              }
            }
          }
          if (Win == true )
          {
            window.location = 'youwon.html';
  
          }
  
     }
      }
    }
  }
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
    speed : 5,
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
        LIFE--; // LOSE LIFE'
        resetBall();
        resetpaddle()
    if(LIFE == 0){
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

function showStats(text, textX, textY, img, imgX, imgY){
  // draw text
  ctx.fillStyle = "#FFF";
  ctx.font = "25px Germania One";
  ctx.fillText(text, textX, textY);
  
  // draw image
  ctx.drawImage(img, imgX, imgY, width = 25, height = 25);
}


// DRAW FUNCTION
function draw(){
    drawPaddle();
    
    drawBall();

    DrawBricks();
 
 showStats(SCORE, 35, 25, SCORE_IMG, 5, 5);
 
 showStats(LIFE, cvs.width - 25, 25, LIFE_IMG, cvs.width-55, 5); 
 
 showStats(HighScore, cvs.width/2, 25, High_IMG, cvs.width/2 - 30, 5);
    

}

// UPDATE GAME FUNCTION
function update(){
    paddleMovevment();
    
    moveBall();
    
    ballWallCollision();
    
    ballPaddleCollision();

    ballBrickCollision();

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