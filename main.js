const canvas=document.getElementById("canvas");
canvas.height=window.innerHeight;
canvas.width=500;

const ctx = canvas.getContext("2d");
//const road = new Road(0, canvas.width, 0.5, canvas.height, undefined, [{x:0,y:0}, {x:0, y:0.2}, {x:0.5, y:0.8}, {x:0.5, y:1}]);
const road = new Road(0, canvas.width, 0.2, canvas.height, undefined, [{x:0,y:0}, {x:0, y:0.2}, {x:0.6, y:0.28}, {x:0.8, y:0.5}, {x:0.6, y:1-0.28}, {x:0, y:0.80}, {x:0, y:1}]);
// const road = new Road(0, canvas.width, 1, canvas.height, undefined);
const collisionManager = new CollisionManager();
collisionManager.addCollider(road);
const car = new Car(road.getLaneCenter(),canvas.height*0.95,20,30, collisionManager);
const carObstacles = [];

const numObstacleCars = 5;
for(let i=0;i<numObstacleCars;i++){
  const carObstacle = new CarObstacle(0,canvas.height*i/(numObstacleCars),20,30, collisionManager, i%4, road);
  carObstacles.push(carObstacle);
  collisionManager.addCollider(carObstacle);
}

//DEBUGING PAUSE
let stop = false;
window.addEventListener('keydown', function (e) {
var key = e.keyCode;
if (key === 80)// p key
{
    stop=!stop;
}
});

animate();

function animate(){
  if (stop) {
    requestAnimationFrame(animate);
    return;
  }
  canvas.height = window.innerHeight;
  road.draw(ctx);
  car.update();
  car.draw(ctx);
  for(const carObstacle of carObstacles){
    carObstacle.draw(ctx);
    carObstacle.update();
  }
  requestAnimationFrame(animate);
}
