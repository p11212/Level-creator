const Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies,
  Collision = Matter.Collision,
  Detector = Matter.Detector,
  Query = Matter.Query;

  var plat1, plat2, plat3

function setup(){
  createCanvas(screen.width*1.5,screen.height*1.5)
  engine = Engine.create()
  world = engine.world
  world.gravity.y = 1;
  
  ground = new Platform(width/2,height,width,20)
  player()
  
  Matter.Runner.run(engine)
  

  // platforms to jump on
  plat1 = new Platform(width/4,650,100,10)
  plat2 = new Platform(width/2,450,100,10)
  plat3 = new Platform(width/4*3,250,100,10)
  
}

function draw(){
  rectMode(CENTER)
  background("grey")
  Engine.update(engine)
  ground.display()

  //displaying the platforms
  plat1.display()
  plat2.display()
  plat3.display()
  
  //console.log(player1.position.y)
  
  rect(player1.position.x,player1.position.y,40,40)
}

// Creating the body of the main player
function player(){
  var options = {
    density:0.4,
    restitution:0,
    friction:3
  }
  player1 = Bodies.rectangle(400,700,40,40,options)
  World.add(world,player1)
  }
  jump = 1.5
  movement = 0
  jumpp = -35
  trueT = null

  //Movement of the player
  //Jumping
  document.addEventListener("keydown",e =>{
    if (e.key === "w" || e.key === "spacebar") {
        let colliding = isPlayerOnGroundOrPlatform();
        if (colliding) {
            Matter.Body.setVelocity(player1, { x: player1.velocity.x, y: -10 })}
          }
    })
  
  //Moving left and right
  document.addEventListener("keydown",down =>{
   if (down.key === "d") {
      Matter.Body.setVelocity(player1, {x:jump,y:0})
      movement = jump+2

    }
    else if (down.key === "a") {
      Matter.Body.setVelocity(player1, {x:-jump,y:0})
      movement = -jump-2
    }
  }) 

  document.addEventListener("keyup",stop => {
    if(stop.key === "d"){
      Matter.Body.setVelocity(player1,{x:0,y:0})
    }
    else if(stop.key === "a"){
      Matter.Body.setVelocity(player1,{x:0,y:0})
    }
  })



  function isPlayerOnGroundOrPlatform() {
    return (
        Matter.SAT.collides(player1, ground.body).collided ||
        Matter.SAT.collides(player1, plat1.body).collided ||
        Matter.SAT.collides(player1, plat2.body).collided ||
        Matter.SAT.collides(player1, plat3.body).collided
    );
}
