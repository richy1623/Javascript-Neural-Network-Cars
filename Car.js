class Car extends AbstractCar{
  constructor(x, y, width, height, collisionManager){
    super(x, y, width, height, collisionManager);

    //this.color = "grey";

    this.controls = new Controls();

    this.sensor = new Sensor(collisionManager, this.height*2.5, 12);
  }

  update(){
    super.update();

    this.sensor.generateRays(this.x, this.y, this.rotation);
  }

  draw(ctx){
    this.sensor.draw(ctx);
    super.draw(ctx);
  }
}
