var ed1,ed2,ed3,ed4,snake,food,ed,died,gamestate,tails,move,eaten
World.frameRate = 45;
var count;


function preload(){
snakeImg = loadAnimation("snake0.png");
snake_deadImg = loadAnimation("snakedead0.png");
deadbgm = loadAnimation("dead00.png","dead00.png","dead01.png","dead01.png","dead02.png","dead02.png","dead03.png","dead03.png","dead04.png","dead04.png","dead05.png","dead05.png","dead06.png","dead06.png","dead07.png","dead07.png","dead08.png","dead08.png","dead09.png","dead09.png","dead10.png","dead10.png","dead11.png","dead11.png","dead12.png","dead12.png","dead13.png","dead13.png","dead14.png","dead14.png","dead15.png","dead15.png")
menubgm = loadAnimation("menu0.png")
movesound = loadSound('whoosh-6316.mp3');
deadsound = loadSound('level-failed-80951.mp3');
menubgmsound = loadSound("stranger-things-124008.mp3");
eatsound = loadSound("eating-sound-effect-36186.mp3");
winsound = loadSound("medieval-fanfare-6826.mp3");
mouseImg = loadImage("mouse0.png");
}

function setup(){
 ed1 = createSprite(200,0,400,59);
 ed2 = createSprite(200,400,400,59);
 ed3 = createSprite(0,200,59,400);
 ed4 = createSprite(400,200,59,400);


 count = 0;
 snake = createSprite(40,40,19,19);
snake.shapeColor = "green";
snake.addAnimation("normal",snakeImg);
snake.addAnimation("dead",snake_deadImg);
snake.scale = 0.19;
snake.rotateToDirection = true;

 food = createSprite(100,40,19.5,19.5);
food.addImage(mouseImg);
food.scale = 0.8;
//food.debug = true;
 tails = createGroup();

 ed = createGroup();
ed.add(ed1);
ed.add(ed2);
ed.add(ed3);
ed.add(ed4);
ed.setColorEach("#6f3614");

 died = createSprite(200,200);
died.visible = false;

died.scale = 1.5;
died.addAnimation("menu",menubgm);
died.addAnimation("dead",deadbgm);
 gamestate = "menu";
//World.frameRate = 5;
 move = "d";
 eaten = 0;

}

function draw() {
  background("#b66005");
  drawSprites();
  
  count++;
  if(count == 2){
    menubgmsound.play();
  }
  if(gamestate == "menu"){
    snake.changeAnimation("normal",snakeImg);
      died.visible = true;
      World.frameRate = 45;
      died.changeAnimation("menu",menubgm);
    died.scale = 1;
    snake.x = 100;
    snake.y = 100;
    
    food.x = 140;
    food.y=100;
    eaten = 0;
    move = "d";
   // 
    if(keyWentDown("space")){
      gamestate = "play";
    }
  }
  if(gamestate == "play"){
    menubgmsound.stop();
  //  stopSound("sound://category_background/wavering_wind.mp3");
      died.visible = false;
    textFont(BOLD);
    textAlign(CENTER);
    textSize(20);
    fill("white");
    text("🐀: "+eaten,40,20);
    
    
    
    
  if(keyWentDown("a")&& move != "d" && move != "a"){
    movesound.play();
     
  move = "a";
  }else if(keyWentDown("d") && move != "a" && move != "d"){
    movesound.play();   
    move = "d";
  }else if(keyWentDown("w") && move != "s" && move != "w"){
    movesound.play();   move = "w";
  }else if(keyWentDown("s") && move != "w" && move != "s"){
    movesound.play();   move = "s";
  }
  
  if(move ==  "a"){
   movement(-20,0);
   snake.rotation = -90;
  }else if(move == "d"){
   movement(20,0);
   snake.rotation = 90;
  }else if(move == "w"){
   movement(0,-20);
   snake.rotation = 0;
  }else if(move == "s"){
   movement(0,20);
   snake.rotation = 180;
  }
  
  if(snake.isTouching(food)){
    eaten+=1;
    eatsound.play();
    //World.frameRate += 2;
    // playSound("sound://category_collect/clicky_crunch.mp3", false);
    //snake.setAnimation("snake_eating");
    food.x = 20*randomNumber(2,18);
     food.y = 20*randomNumber(2,18);
  }else{
  
   //  snake.setAnimation("snake");
  }
    if(tails.isTouching(food)){
   
    food.x = 20*randomNumber(2,18);
     food.y = 20*randomNumber(2,18);
  }
  
  if(snake.isTouching(tails) || snake.isTouching(ed)){
    deadsound.play();
    gamestate = "over";
    //World.frameRate = 45;
    // playSound("sound://category_music/gameover.mp3", false);
    
    
  }
  
  if(eaten == 360){
    gamestate = "win";
    winsound.play();
    
  }
  }
  
  
  if(gamestate == "over"){
    died.changeAnimation("dead",deadbgm);
    died.scale = 1.7;
    snake.changeAnimation("dead",snake_deadImg);
    died.visible = true;
    if(keyWentDown("r")){
      gamestate = "menu";
      menubgmsound.play();
      // playSound("sound://category_background/wavering_wind.mp3", true);
    }
  }
  if(gamestate == "win"){
    textSize(40);
    fill("yellow");
    textAlign(CENTER);
    strokeWeight(2);
    text("You Won!",200,200);

    fill("red")
    text("Press R to restart",200,320);
    if(keyWentDown("r")){
      gamestate = "menu";
      menubgmsound.play();
      died.visible = true;
      // playSound("sound://category_background/wavering_wind.mp3", true);
    }
  }
}


function movement(X,Y){
  
  if(World.frameCount% 6 == 0){
    var n = createSprite(snake.x,snake.y,19,19);
  n.lifetime = 6*eaten;
  n.shapeColor = "#38be00";
  n.depth = died.depth-1;
  tails.add(n);
  snake.y+=Y;
  snake.x+=X;
 
  }
}

function randomNumber(min,max){
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max-min+1))+min;
}