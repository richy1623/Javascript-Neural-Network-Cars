class Car extends AbstractCar{
  constructor(x, y, width, height, collisionManager, manual=false, neuralNetwork=null){
    super(x, y, width, height, collisionManager);

    //this.color = "grey";
    this.manual = manual;
    this.drawSensors = false;

    const numberRays = 10;

    if (manual){
      this.controls = new Controls();
    }else{
      if (neuralNetwork==null){
        this.neuralNetwork = new NeuralNetwork([numberRays+1, 8, 8, 8, 4]);
      }else{
        this.neuralNetwork = neuralNetwork;
      }

        // this.neuralNetwork = new NeuralNetwork([2, 3, 4, 5]);
      this.controls = new Controls(this.neuralNetwork);
    }

    this.sensor = new Sensor(collisionManager, this.height*3, numberRays);

    this.oldY = y;
    this.stuckCounter = 0;
  }

  update(deltatime){
    if (this.crashed) return;
    if (!this.manual){
      let inputs = this.sensor.getCollisionPoints();

      inputs.push(this.rotation);
      // inputs.push(2*Math.PI-this.rotation);
      // inputs.push(1);
      this.controls.aiNavigate(inputs);
    }
    super.update(deltatime);

    if (this.stuckCounter++>=1000){
      if (this.oldY<=this.y) this.crashed = true;
      this.stuckCounter=0;
      this.oldY=this.y;
    }


    this.sensor.generateRays(this.x, this.y, this.rotation);
  }

  draw(ctx){
    if(this.drawSensors) this.sensor.draw(ctx);
    super.draw(ctx);
  }
}
