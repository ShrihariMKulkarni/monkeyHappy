 var PLAY = 1;
var END = 0;
var gameState = 1;


var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score

var ground , gameover , gameOverImage;

var survivalTime;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  gameOverImage = loadImage("gameover.png");

  FoodGroup = new Group();
  obstacleGroup = new Group();

}



function setup() {

  monkey = createSprite(windowWidth/9, windowHeight, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.2;

  ground = createSprite(windowWidth/2,windowHeight, windowWidth, 30)

  bananaImage = loadImage("banana.png");

  FoodGroup = createGroup();
  obstacleGroup = createGroup();

  survivalTime = 0;
  score = 0;
  
  gameover = createSprite(windowWidth/2, windowHeight/2,10,10)
  gameover.addImage(gameOverImage);
  gameover.scale = 0.1
}


function draw() {
  createCanvas(windowWidth, windowHeight);
  background("white");

  gameover.visible = false;

  monkey.collide(ground);
  if (keyDown("space") || touches>0) {

    monkey.velocityY = -10;

  }
  monkey.velocityY = monkey.velocityY + 1

  stroke("black");
  textSize(20);
  fill("black");
  text("score : " + score, 200, 70)

  survivalTime = Math.ceil(frameCount / frameRate());
  text("Survival Time : " + survivalTime, 200, 50)

  Banana();
  stone();

  if (monkey.isTouching(FoodGroup)) {

    score = score + 5
    FoodGroup.destroyEach();
  }
  
  if(gameState === END){
     
    FoodGroup.destroyEach();
    obstacleGroup.destroyEach();
    survivalTime = 0;
    monkey.destroy();
    gameover.visible = true;
    survivalTime = 0;
  
     }
  

  
  if(obstacleGroup.isTouching(monkey)){   
      gameState = END;
   
       }
  
  
  
  
  drawSprites();
}

function Banana() {

  if (frameCount % 80 === 0) {

    banana = createSprite(windowWidth,windowHeight/3, 10, 10);
    banana.scale = 0.15;

    r = Math.round(random(1, 1));

    if (r === 1) {

      banana.addImage(bananaImage);
    }

    banana.y = Math.round(random(windowWidth-50, windowHeight-230));
    banana.velocityX = -12;
    banana.setLifetime = 100;

    FoodGroup.add(banana);

  }
}

function stone() {

  if (frameCount % 200 === 0) {

    obstacle = createSprite(windowWidth , windowHeight-50, 20, 30);
    obstacle.scale = 0.2;

    r1 = Math.round(random(1, 1))

    if (r1 === 1) {

      obstacle.addImage(obstacleImage);

    }

    obstacle.velocityX = -12;
    obstacle.setLifetime = 200;

    obstacleGroup.add(obstacle);
    
      obstacle.setCollider("circle" , 0,0,170);
    //obstacleGroup.debug = true;
  }
}