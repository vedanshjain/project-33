const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var particles = [];
var plinkos = [];
var divisions = [];

var particle;

var chances = 0;

var divisionHeight = 150;

var ground;

var score = 0;

var gameState = "play"; 

function setup() {
  createCanvas(480,800);
  //createSprite(400, 200, 50, 50);

  engine = Engine.create();
	world = engine.world;


  ground = new Ground(240, 780, 480, 10);

  for(var i = 0; i <= width; i = i + 80) {
    divisions.push(new Divisions(i, height - divisionHeight, 10, divisionHeight*2));
  }
  
  for(var r = 40; r<= width; r = r + 50) {
    plinkos.push(new Plinko(r, 75, 15));
  }

  for(var r = 15; r<= width; r = r + 50) {
    plinkos.push(new Plinko(r, 175, 15));
  }

  for(var r = 40; r<= width; r = r + 50) {
    plinkos.push(new Plinko(r, 275, 15));
  }

  for(var r = 15; r<= width; r = r + 50) {
    plinkos.push(new Plinko(r, 375, 15));
  }

  
  Engine.run(engine);
}

function draw() {
  background(0,0,0);  

  strokeWeight(3);
    stroke("white");
    textSize(22);
    text("score :" + score, 20, 30);

    textSize(22);
    text("chances :" + chances, 300, 30);

    textSize(16);
    text("100", 185, 530);

    textSize(16);
    text("100", 265, 530);

    textSize(16);
    text("500", 105, 530);

    textSize(16);
    text("500", 25, 530);

    textSize(16);
    text("500", 345, 530);

    textSize(16);
    text("500", 420, 530);

    noStroke(); 
  ground.display();

  for(var i = 0; i < divisions.length; i++) {
    divisions[i].display();
  }

  for(var r = 0; r < plinkos.length; r++) {
    plinkos[r].display();
  }

  // mousePressed();

  // if(frameCount % 90 === 0) {
  //   //console.log("sjso");
  //   // particles.push(new Particle(random(width/2 + 10, width/2 - 10), 10, 10));
  //   particle = new Particle(240, 10, 10, 10);
  //   chances = chances + 1;
  // }

  // for(var k = 0; k < particles.length; k++) {
  //   particles[k].display();
  // }

  if(particle) {
    particle.display();
    if(particle.body.position.y > 750) {
      if(particle.body.position.x > 175 && particle.body.position.x < 300) {
        score = score + 100;
        particle = null;
        if(chances == 5) gameState = "end";
      }
    }
  }

  if(particle) {
    particle.display();
    if(particle.body.position.y > 750) {
      if(particle.body.position.x < 175 && particle.body.position.x > 0) {
        score = score + 500;
        particle = null;
        if(chances == 5) gameState = "end";
      }
    }
  }

  if(particle) {
    particle.display();
    if(particle.body.position.y > 750) {
      if(particle.body.position.x > 300 && particle.body.position.x < 480) {
        score = score + 500;
        particle = null;
        if(chances == 5) gameState = "end";
      }
    }
  }
  
  if(chances == 5 && gameState == "end") {
    textSize(26);
    text("GAME OVER", 150, 240);
  }

}

function mouseReleased() {
  
  if(gameState !== "end") {
    particle = new Particle(mouseX, 10, 10, 10);
    chances = chances + 1;
  }
}