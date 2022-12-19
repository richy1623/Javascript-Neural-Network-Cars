class Car extends AbstractCar{
  constructor(x, y, width, height, collisionManager, manual=false){
    super(x, y, width, height, collisionManager);

    //this.color = "grey";
    this.manual = manual;

    const numberRays = 10;

    if (manual){
      this.controls = new Controls();
    }else{
      this.neuralNetwork = new NeuralNetwork([numberRays+1, 8, 8, 4]);
        // this.neuralNetwork = new NeuralNetwork([2, 3, 4, 5]);
      this.controls = new Controls(this.neuralNetwork);
    }

    this.sensor = new Sensor(collisionManager, this.height*3, numberRays);
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
