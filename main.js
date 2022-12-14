//Road Canvas
const roadCanvas=document.getElementById("roadCanvas");

let zoom = 1;
const scale = 5;
zoom *= scale;
roadCanvas.height=window.innerHeight*zoom;
roadCanvas.width=500;

//NeuralNetwork Visualiser canvas
const networkCanvas=document.getElementById("networkCanvas");
networkCanvas.height=window.innerHeight;
networkCanvas.width=500;

const ctx = roadCanvas.getContext("2d");
const ctxNetwork = networkCanvas.getContext("2d");

const numLanes = 4;
// const road = new Road(0, roadCanvas.width, 0.5, roadCanvas.height, numLanes, [{x:0,y:0}, {x:0, y:0.2}, {x:0.5, y:0.8}, {x:0.5, y:1}]);
const road = new Road(0, roadCanvas.width*zoom, 0.2, roadCanvas.height, scale, zoom, numLanes, [{x:0,y:0}, {x:0, y:0.2}, {x:0.6, y:0.28}, {x:0.8, y:0.5}, {x:0.6, y:1-0.28}, {x:0, y:0.80}, {x:0, y:1}]);
// const road = new Road(0, canvas.width, 1, canvas.height, undefined);
const collisionManager = new CollisionManager();
collisionManager.addCollider(road);


//NeuralNetworkVisualiser object
const neuralNetworkVisualiser = new NeuralNetworkVisualiser(null, networkCanvas.width, networkCanvas.height);

const carWidth = road.getLaneWidth()*0.75;
const carHeight = carWidth*1.3;

const numCars = 100;
const numGhosts = 20;

let carManager = new CarManager(numCars, numGhosts, road.getLaneCenter(), road.bottom*0.95, carWidth, carHeight, collisionManager, neuralNetworkVisualiser);

const carObstacleSpawner = new CarObstacleSpawner(carWidth, carHeight, 4, window.innerHeight, roadCanvas.height, road, collisionManager, carManager.bestCar);


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
  roadCanvas.height = window.innerHeight;
  networkCanvas.height = window.innerHeight;
  // if(zoom>1) ctx.transform(1,0,0,1,-carManager.bestCar.x+roadCanvas.width/2,0);
  if(zoom>1) ctx.transform(1,0,0,1,-carManager.bestCar.x+roadCanvas.width/2,-carManager.bestCar.y+roadCanvas.height*0.8);
  road.draw(ctx);
  carObstacleSpawner.update(1);
  carObstacleSpawner.draw(ctx);

  carManager.update(1);
  carManager.draw(ctx);

  neuralNetworkVisualiser.draw(ctxNetwork);
  requestAnimationFrame(animate);
}
