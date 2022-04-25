//game states
var PLAY = 1;
var END = 0;
var gameState= 1;


//creating knife, fruits, and germs!
var knife, fruit, germ;

// variables to create the group
var fruitGroup, enemyGroup

//creating the images!
var knifeimg, gameoverimg, germ1img, germ2img, fruit1img, fruit2img, fruit3img, fruit4img;

var knifeSwooshSound,  gameOverSound ;

function preload(){
  knifeimg = loadImage("sword.png")
  gameoverimg = loadImage("gameover.png")
  germ1img=loadAnimation("alien1.png", "alien2.png")
  fruit1img = loadImage("fruit1.png")
  fruit2img = loadImage("fruit2.png")
  fruit3img = loadImage("fruit3.png")
  fruit4img = loadImage("fruit4.png")
knifeSwooshSound    =loadSound("knifeSwooshSound.mp3")
  gameOverSound=loadSound("gameover.mp3");
}

function setup(){
  createCanvas(600,600);
  
  //creating the knife
  knife=createSprite(40,200,20,20);
  knife.addImage(knifeimg);
  knife.scale= 0.7;
  
 // yeet=createSprite(30,100,20,30);
  //score, varibles, and groups
  score=0;
  fruitGroup=createGroup();
  enemyGroup=createGroup();
  
  //set collider for sword/knife
    
}


function draw(){
  background("white");
  if(gameState===PLAY){
    
  //move knife with mouse
  knife.y=World.mouseY;
  knife.x=World.mouseX;
    
    
 //calling fruits and enemy function
  fruits();
  germs();
    
    if (score>0&&score%36===0) {
      text("yeet", 250, 300);
    }
    
    if (score>0&&score%50===0) {
      text("You Win!", 250, 300);
      knife.velocity= 0;
    }
  
    // Increase score if sword touching fruit
    if(fruitGroup.isTouching(knife)){
      fruitGroup.destroyEach();
      
      knifeSwooshSound.play();
      score=score+2;
    }
    else
    {
      // Go to end state if sword touching enemy
      if(enemyGroup.isTouching(knife)){
        gameState=END;
        //gameover sound
        gameOverSound.play()
        
        fruitGroup.destroyEach();
        enemyGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        enemyGroup.setVelocityXEach(0);
        
        // Change the animation of sword to gameover and reset its position
        knife.addImage(gameoverimg);
        knife.x=200;
        knife.y=200;
      }
    }
  }
  
  drawSprites();
text("Score : "+ score,300,30);
}

function fruits(){
    if(World.frameCount%80===0){
    fruit = createSprite(400,200, 20, 20);
      fruit.scale= 0.2;
      r=Math.round(random(1,4));
      if (r == 1){
        fruit.addImage(fruit1img);
      } else if (r == 2){
        fruit.addImage(fruit2img);
      } else if (r == 3){
        fruit.addImage(fruit3img);
      } else {
        fruit.addImage(fruit4img);
      }
      
      fruit.y=Math.round(random(50,340));
      
      fruit.velocityX=-7;
      fruit.setLifetime=100;
      fruitGroup.add(fruit);      
    }
  }
  function germs(){
 if (World.frameCount%200 ===0)
{
  germ=createSprite(600,400, 10, 10);
  germ.addAnimation("germ", germ1img);
  germ.velocityX=-5;
  enemyGroup.add(germ);
  
}

      }

