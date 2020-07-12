var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey,ground,invisibleground

var bananaGroup,roxgroup

var score=0;

var gameOver, restart;

function preload(){
  monkeyImg=loadAnimation("m01.png","m02.png","m03.png","m04.png","m05.png","m06.png","m07.png","m08.png","m09.png","m10.png");
  
  groundImage = loadImage("jungle.jpg");
  
  rock = loadImage("stone.png");
  
  gameOverImg = loadImage("gameOver.png");
  
  restartImg = loadImage("restart.png");
  
  Banana = loadImage("Banana.png");
}

function setup() {
  createCanvas(400, 400);
  
  monkey = createSprite(50,10,20,50);
  
  monkey.addAnimation("Img",monkeyImg);
  monkey.scale = 0.2;
  
  monkey.debug=true
  monkey.setCollider("rectangle",0,0,290,500)
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  
  gameOver = createSprite(200,160);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(200,200);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,360,400,10);
  invisibleGround.visible = false;
  
  bananaGroup = new Group();
  roxGroup = new Group();
}
function draw() {
  background(255);
  
  if (gameState===PLAY){
  
    if(keyDown("space") && monkey.y >= 290) {
      monkey.velocityY = -19;
    }
    monkey.velocityY = monkey.velocityY + 0.8
  
    monkey.collide(invisibleGround);
    spawnrox();
    spawnbanana();
    
   if(roxGroup.isTouching(monkey)){
        gameState = END;
    }
    if(bananaGroup.isTouching(monkey)){
      score=score+1
      bananaGroup.destroyEach();
  }
    if(bananaGroup.visible===false){
      score = score+0
    }
  }

  
  
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    monkey.velocityY = 0;
    roxGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    roxGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    ground.visible=false
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  drawSprites();
  textSize(20);
  fill("black")
  text("Score: "+ score, 300,390);
  
}

function spawnrox() {
  if (frameCount % 60 === 0) {
    var rox = createSprite(420,320,40,10);
    rox.y = Math.round((80,320));
    rox.addImage(rock);
    rox.scale = 0.2;
    rox.velocityX = -(6 + 3*score/100);
    rox.lifetime = 200;
    rox.debug=true
    rox.setCollider("circle",0,0,130)
   monkey.depth  = rox.depth + 1;
   
    roxGroup.add(rox);
  }
}

function spawnbanana() {
  if(frameCount % 60 === 0) {
    var banana = createSprite(420,100,10,40);
    banana.velocityX = -(6 + 3*score/100);
    banana.addImage(Banana)         
    banana.scale = 0.08;
    banana.lifetime = 300;
    bananaGroup.add(banana);
    
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  ground.visible=true;
  bananaGroup.destroyEach();
  roxGroup.destroyEach();
  score = 0;
}