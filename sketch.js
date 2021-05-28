var ninja,ninjarun,ninjaidle;
var coinSpin,coin,coinGroup;
var ground,ground1,groundGroup,groundImg;
var canvas;
var gameState = "start";
var bg1,bg2,bg3,bg4,bg5,bg6,bg7,bg8,bgImg1,bgImg2;
var gameOver,gameOverImg;
var restart,restartImg;
var visibility = 255;
var score = 0;
function preload(){
  ninjarun = loadAnimation("Images/nrun1.png","Images/nrun2.png","Images/nrun3.png","Images/nrun4.png","Images/nrun5.png","Images/nrun6.png");
  ninjaidle = loadAnimation("Images/nidle1.png","Images/nidle2.png","Images/nidle3.png","Images/nidle4.png","Images/nidle5.png");
  groundImg = loadImage("Images/ground.png");
  bgImg1 = loadImage("Images/bg1.jpg");
  bgImg2 = loadImage("Images/bg2.jpg");
  gameOverImg = loadImage("Images/gameOver.png");
  restartImg = loadImage("Images/restart.png");
  coinSpin = loadAnimation("Images/coin1.png","Images/coin2.png","Images/coin3.png","Images/coin4.png","Images/coin5.png","Images/coin6.png","Images/coin7.png","Images/coin8.png","Images/coin9.png","Images/coin10.png");
}
function setup(){
  canvas = createCanvas(1050,700);
  ninja = createSprite(150,200,30,30);
  ninja.addAnimation("idle",ninjaidle);
  ninja.addAnimation("run",ninjarun);
  ninja.scale = 1.2
  ninja.setCollider("rectangle",0,20,35,30);
  
  bg1 = createSprite(350,350,1400,700);
  bg1.addImage(bgImg1);
  
  bg2 = createSprite(1750,350,1400,700);
  bg2.addImage(bgImg1);
  
  bg3 = createSprite(350,1050,1400,700);
  bg3.addImage(bgImg2);
  
  bg4 = createSprite(1750,1050,1400,700);
  bg4.addImage(bgImg2);
  bg5 = createSprite(350,-350,1400,700);
  bg5.addImage(bgImg2);
  
  bg6 = createSprite(1750,-350,1400,700);
  bg6.addImage(bgImg2);
  bg7 = createSprite(350,1750,1400,700);
  bg7.addImage(bgImg1);
  
  bg8 = createSprite(1750,1750,1400,700);
  bg8.addImage(bgImg1);
  gameOver = createSprite(700,350,20,20);
 
  gameOver.addImage(gameOverImg);
    
  gameOver.visible = false;
  ground1 = createSprite(600,800,400,100);
  ground1.scale = 1.6;
  ground1.addImage(groundImg);
  ground1.debug = false;
  ground1.setCollider("rectangle",0,-30,800,100);
  //coin = createSprite(600,620,20,20);
  //coin.addAnimation("spin",coinSpin);
  //coin.scale = 0.4;
  restart = createSprite(70,gameOver.y+200,20,20);
  restart.addImage(restartImg);
  restart.visible = false;
  restart.scale = 0.3
  ninja.scale = 1.5;
  groundGroup = createGroup();
  coinGroup = createGroup();
  if(gameState === "start"){
    
  }
}


function draw(){
  
  background("black");
  gameOver.x = camera.position.x;
  gameOver.y = camera.position.y-90;
  restart.x = gameOver.x;
  restart.y = camera.position.y+170;
  
  
  
  if(gameState === "start"){
    ninja.depth+=1;
    if(camera.position.x>bg1.x+bg1.width){
      bg1.x = bg2.x+1400;
    }
    if(camera.position.x>bg2.x+bg2.width){
      bg2.x = bg1.x+1400;
    }
    if(camera.position.x>bg3.x+bg3.width){
      bg3.x = bg4.x+1400;
    }
    if(camera.position.x>bg4.x+bg4.width){
      bg4.x = bg3.x+1400;
    }
    if(camera.position.x>bg5.x+bg5.width){
      bg5.x = bg6.x+1400;
    }
    if(camera.position.x>bg6.x+bg6.width){
      bg6.x = bg5.x+1400;
    }
    if(camera.position.x>bg7.x+bg7.width){
      bg7.x = bg8.x+1400;
    }
    if(camera.position.x>bg8.x+bg8.width){
      bg8.x = bg7.x+1400;
    }
    
    spawnGround();
    restart.visible = false;
    gameOver.visible = false;
    bg1.visible = true;
    bg2.visible = true;
    bg3.visible = true;
    bg4.visible = true;
    bg5.visible = true;
    bg6.visible = true;
    bg7.visible = true;
    bg8.visible = true;
    ninja.visible = true;
    ground1.visible = true;
    
    if(keyWentDown(RIGHT_ARROW)){
     ninja.changeAnimation("run",ninjarun);
     ninja.velocityX = 14;
    
    }
    
    if(keyWentUp(RIGHT_ARROW)){
      ninja.changeAnimation("idle",ninjaidle);
      ninja.velocityX = 0;
    }
    if(keyDown(UP_ARROW)&&(groundGroup.isTouching(ninja)||ninja.collide(ground1))){
      ninja.velocityY = -32;
    }

    if(groundGroup.isTouching(ninja)){
      ninja.velocityY = -1.5;
      if(keyDown(UP_ARROW)){
       ninja.velocityY = -28;

      }
    }

    ninja.velocityY+=1.5;
    ninja.debug = false;
    ninja.collide(ground1);
    camera.position.x = ninja.position.x+300;
    camera.position.y= ninja.position.y;
    
    if(coinGroup.isTouching(ninja)){
      frameCount = 0;
      coinGroup.destroyEach();
      score+=10;
    }
    if(ninja.y>1000){
      gameState = "end";
    }
    
  } 
  if(gameState === "end"){
    bg1.visible = false;
    bg2.visible = false;
    bg3.visible = false;
    bg4.visible = false;
    bg5.visible = false;
    bg6.visible = false;
    bg7.visible = false;
    bg8.visible = false;
    ninja.visible = false;
    ground1.visible = false;
    groundGroup.destroyEach();
    coinGroup.destroyEach();
    gameOver.visible = true;
    restart.visible = true;
    restart.debug =false;
    
  }
  if(mousePressedOver(restart)&&gameState === "end"){
    gameState = "start";
    score = 0;
    ninja.x = 150;
    ninja.y = 200;
    camera.position.y = ninja.y;
    camera.position.x = ninja.x+300;
    bg1.x = 350;
    bg1.y = 350;
    bg2.x = 1750;
    bg2.y = 350;
    bg3.x = 350;
    bg3.y = 1050;
    bg4.x = 1750;
    bg4.y = 1050;
    bg5.x = 350;
    bg5.y = -350;
    bg6.x = 1750;
    bg6.y = -350;
    bg7.x = 350;
    bg7.y = 1750;
    bg8.x = 1750;
    bg8.y = 1750;
  
  }
  
  drawSprites();
  
  fill("black");
  stroke("black");
  strokeWeight(2.5);
  textSize(35);
  text("Score: "+score,camera.position.x-360,camera.position.y-170);

}

function spawnGround(){
  if(ninja.x%14.25 === 0){
    ground = createSprite(camera.position.x+950,Math.round(random(330,650)),150,80);
    ground.addImage(groundImg);
    ground.scale =0.6;
    ground.debug = false;
    ground.setCollider("rectangle",0,-40,700,100);
    groundGroup.add(ground);
    coin = createSprite(camera.position.x+950,ground.position.y-100,20,20);
    coin.scale = 0.5;
    coin.addAnimation("spin",coinSpin);
    coin.debug = false;
    coin.setCollider("rectangle",0,50,112,240);
    coinGroup.add(coin);
  }
}
