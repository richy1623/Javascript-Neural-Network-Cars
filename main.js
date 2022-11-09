const canvas=document.getElementById("canvas");
canvas.height=window.innerHeight;
canvas.width=500;

const ctx = canvas.getContext("2d");
//const road = new Road(0, canvas.width, 0.5, canvas.height, undefined, [{x:0,y:0}, {x:0, y:0.2}, {x:0.5, y:0.8}, {x:0.5, y:1}]);
const road = new Road(0, canvas.width, 0.2, canvas.height, undefined, [{x:0,y:0}, {x:0, y:0.167}, {x:0.6, y:0.28}, {x:0.8, y:0.5}, {x:0.6, y:1-0.28}, {x:0, y:0.833}, {x:0, y:1}]);
// const road = new Road(0, canvas.width, 1, canvas.height, undefined);
const car = new Car(road.getLaneCenter(),50,30,50);
const collisionManager = new CollisionManager(car);
collisionManager.addCollider(road);
car.draw(ctx);

animate();

function animate(){
  canvas.height = window.innerHeight;
  road.draw(ctx);
  car.update();
  collisionManager.checkCollisions();
  car.draw(ctx);
  requestAnimationFrame(animate);
}
