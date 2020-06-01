const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, log1;
var backgroundImg,platform;
var BALL1, BALL2, slingshot1, slingshot2;
var boy1, boy2, boy3, boy4, boy5;
var ground, invisground1, invisground2, invisground3;
var bench1, chair1;
var score = 0;

var gameState = "onSling";

function preload() {
    backgroundImg = loadImage("sprites/bg1.jpg");
}

function setup(){
    var canvas = createCanvas(1200,550);
    engine = Engine.create();
    world = engine.world;
  
    ground1 = new Ground(600,height,1200,20);
    ground2 = new Ground(1155,475,95,120);
    invisground1 = new Ground(300,250,150,20);
    invisground2 = new Ground(1125,180,150,20);
    invisground3 = new Ground(250,525,125,20);

    platform = new Ground(150, 305, 300, 170);

    BALL1 = new Ball1(200,50);
    BALL2 = new Ball2(1150,250);

    boy1 = new Boy1(410, 350);
    boy2 = new Boy2(1110, 220);
    boy3 = new Boy3(300, 240);
    boy4 = new Boy4(1125,145);
    boy5 = new Boy5(120,400);
    
    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    box5 = new Box(810,160,70,70);

    log1 = new Log(810,260,300, PI/2);
    log3 =  new Log(810,180,300, PI/2);    
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    bench1 = new Bench(300,240,100,80);
    bench2 = new Bench(1125,150,100,80);
    chair1 = new Chair1(300,425,125,125);
    
    slingshot1 = new SlingShot1(BALL1.body,{x:200, y:50});
    slingshot2 = new SlingShot2(BALL2.body,{x:1150, y:250});
}

function draw(){
    if(backgroundImg)
    background(backgroundImg);

    text("Score  " + score, 600, 50)
    Engine.update(engine);

    textSize(25);
    textFont("Verdana");
    stroke("red");
    fill("red");

    BALL1.display();
    BALL2.display();
    ground1.display();
    ground2.display();
    platform.display();
    
    boy1.display();
    boy2.display();
    boy3.display();
    boy4.display();
    boy5.display();

    boy1.score();
    boy2.score();
    boy3.score();
    boy4.score();
    boy5.score();

    box1.display();
    box2.display();
    box3.display();
    box4.display();
    box5.display();
    
    log1.display();
    log3.display();
    log4.display();
    log5.display();

    bench1.display();
    bench2.display();
    chair1.display();

    slingshot1.display(); 
    slingshot2.display();
}

function mouseDragged(){
    if (gameState!=="launched"){
        Matter.Body.setPosition(BALL1.body, {x: mouseX , y: mouseY});
        Matter.Body.setPosition(BALL2.body, {x: mouseX , y: mouseY});
    }
}
function mouseReleased(){
    slingshot1.fly();
    slingshot2.fly();
    gameState = "launched";
}
function keyPressed(){
    if(keyCode === 32){
       slingshot1.attach(BALL1.body);
       slingshot2.attach(BALL2.body);
    }
}
async function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    
    if(hour>=0600 && hour<=1900){
        bg = "sprites/bg1.png";
    }
    else{
        bg = "sprites/bg2.jpg";
    }

    backgroundImg = loadImage(bg);
    console.log(backgroundImg);
}
