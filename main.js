const canvas=document.getElementById("canvas");
canvas.height=window.innerHeight;
canvas.width=200;

const ctx = canvas.getContext("2d");
const car = new Car(100,50,30,50);
car.draw(ctx);

animate();

function animate(){
  canvas.height = window.innerHeight;
  car.update();
  car.draw(ctx);
  requestAnimationFrame(animate);
}
