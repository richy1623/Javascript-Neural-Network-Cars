class Car extends AbstractCar{
  constructor(x, y, width, height, collisionManager, manual=false){
    super(x, y, width, height, collisionManager);

    //this.color = "grey";
    this.manual = manual;

    var numRays = 12;

    if (manual){
      this.controls = new Controls();
    }else{
      this.neuralNetwork = new NeuralNetwork([numRays+1, 8, 8, 4]);
      this.controls = new Controls(this.neuralNetwork);
    }

    this.sensor = new Sensor(collisionManager, this.height*2.5, 12, numRays=numRays);
  }

  update(){
    if (!this.manual){
      let inputs = this.sensor.getCollisionPoints();

      inputs.push(this.rotation);
      this.controls.aiNavigate(inputs);
    }
    super.update();

    this.sensor.generateRays(this.x, this.y, this.rotation);
  }

  draw(ctx){
    this.sensor.draw(ctx);
    super.draw(ctx);
  }
}
