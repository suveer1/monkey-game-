//Global Variables
var backImage,backgr;
var foodGroup,bananaimg;
var obstacleGroup,stoneimg;
var player,playerRunning;
var ground,groungImg;
var gameOver;
var score= 0;


function preload(){
  backImage = loadImage("jungle.jpg");
  bananaimg = loadImage("Banana.png");
  stoneimg = loadImage("stone.png");
  playerRunning = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
}


function setup() {
  createCanvas(800,400);
  backgr = createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2; 
  backgr.velocityX=-4;
  player = createSprite(100,320,20,50);
  player.addAnimation("running",playerRunning);
  player.scale=0.1;
   ground = createSprite(400,350,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
  foodGroup = new Group();
  obstacleGroup=new Group();
  score=0;
}


function draw(){
 background(255); 
  edges=createEdgeSprites();
  player.collide(ground);
    player.collide(edges[2]);
   if(ground.x<0) 
   { ground.x=ground.width/2;
   }
  if(backgr.x<100){
    backgr.x=backgr.width/2; 
  }
  if(keyDown("space")){
   player.velocityY=-12;
  }
  player.velocityY=player.velocityY+0.8
  if(foodGroup.isTouching(player)){ 
    foodGroup.destroyEach(); 
    score = score + 2; } 
  switch(score){
    case 10,50,90: player.scale=0.12; 
      break; case 20,60,100: player.scale=0.14;
      break; case 30,70,110: player.scale=0.16;
      break; case 40,80,120: player.scale=0.18;
      break;
      default: break;}
  if(obstacleGroup.isTouching(player)){
    player.scale=0.08; 
    score=score-2; 
    obstacleGroup.destroyEach();
  }
  
  spawnFood();
spawnObstacles();
   drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
}
function spawnFood() {
  //write code here to spawn the food 
  if (frameCount % 80 === 0) {
  var banana = createSprite(820,random(100,260),10,10);
  banana.addImage(bananaimg);
  banana.velocityX=-5;
    banana.scale=0.05;
    foodGroup.add(banana);
    player.depth = banana.depth + 1;
  }
}
  function spawnObstacles() { 
    if(frameCount % 300 === 0)
    { var obstacle = createSprite(800,350,10,40); obstacle.velocityX = -6;
     obstacle.addImage(stoneimg);
     //assign scale and lifetime to the obstacle 
     obstacle.scale = 0.2; 
     obstacle.lifetime = 450; //add each obstacle to the group 
     obstacleGroup.add(obstacle); } }