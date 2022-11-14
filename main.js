const canvas=document.getElementById("canvas");
canvas.height=window.innerHeight*5;
canvas.width=500;

const ctx = canvas.getContext("2d");

const numLanes = 4;
//const road = new Road(0, canvas.width, 0.5, canvas.height, undefined, [{x:0,y:0}, {x:0, y:0.2}, {x:0.5, y:0.8}, {x:0.5, y:1}]);
const road = new Road(0, canvas.width, 0.2, canvas.height, numLanes, [{x:0,y:0}, {x:0, y:0.2}, {x:0.6, y:0.28}, {x:0.8, y:0.5}, {x:0.6, y:1-0.28}, {x:0, y:0.80}, {x:0, y:1}]);
// const road = new Road(0, canvas.width, 1, canvas.height, undefined);
const collisionManager = new CollisionManager();
collisionManager.addCollider(road);

const carWidth = road.getLaneWidth()*0.8;
const carHeight = carWidth*1.3;
const car = new Car(road.getLaneCenter(), canvas.height*0.95, carWidth, carHeight, collisionManager);
const carObstacleSpawner = new CarObstacleSpawner(carWidth, carHeight, 4, window.innerHeight, canvas.height, road, collisionManager, car);

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
  ctx.transform(1,0,0,1,0,-car.y+canvas.height*0.8);
  road.draw(ctx);
  carObstacleSpawner.update();
  carObstacleSpawner.draw(ctx);
  car.update();
  car.draw(ctx);
  requestAnimationFrame(animate);
}
