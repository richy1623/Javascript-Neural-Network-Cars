  class CarManager{
    constructor(numCars, numGhosts=20, x, y, width, height, collisionManager, neuralNetworkVisualiser){
      //(x, y, width, height, collisionManager, manual=false, neuralNetwork=null)
      this.cars = [];
      this.ghosts = [];
      this.ghostCounter = 0;
      this.numGhosts = numGhosts;

      this.xStart = x;
      this.yStart = y;
      this.carWidth = width;
      this.carHeight = height;
      this.collisionManager = collisionManager;
      this.neuralNetworkVisualiser = neuralNetworkVisualiser;

      for (let i=0; i<numCars; i++){
        this.cars.push(new Car(this.xStart, this.yStart, this.carWidth, this.carHeight, this.collisionManager, false));
      }
      this.bestCar = this.cars[0];
      this.bestCar.drawSensors = true;

      this.neuralNetworkVisualiser.setNeuralNetwork(this.bestCar.neuralNetwork);

      this.end = false;
    }

    update(deltatime){
      if (this.end) return;
      for(let i=0; i<this.cars.length; i++){
        if(this.cars[i].crashed) {
          this.ghosts[this.ghostCounter++]=this.cars[i];
          if (this.ghostCounter>=this.numGhosts) this.ghostCounter=0;
          //TODO Improve selection
          const neuralParent = NeuralNetwork.mutate(this.cars[Math.floor(Math.random()*3)].neuralNetwork, 0.25);
          // this.cars[i] = new Car(this.bestCar.x, this.bestCar.y+this.carHeight, this.carWidth, this.carHeight, this.collisionManager, false, neuralParent);
          this.cars[i] = new Car(this.xStart, this.yStart, this.carWidth, this.carHeight, this.collisionManager, false, neuralParent);
        }
        this.cars[i].update(1);
        // if (this.cars[i].y>this.bestCar.y+window.innerHeight) cars[i].crashed=true;
      }
      this.cars.sort(function(a, b){return (a.crashed && !b.crashed) ? 1 : (!a.crashed && b.crashed ? -1 : a.y-b.y)});

      if (this.cars[0].y<this.bestCar.y-5 || this.bestCar.crashed){
        this.updateBestCar(this.cars[0]);
      }

      if (this.cars[0].y<=0) {
        console.log(this.cars[0].neuralNetwork);
        // this.end = true;
        this.reset(this.cars[0].neuralNetwork);
      }
    }

    updateBestCar(car){
      this.bestCar.drawSensors = false;
      this.bestCar = car;
      this.neuralNetworkVisualiser.setNeuralNetwork(this.bestCar.neuralNetwork);
      // this.carObstacleSpawner.filter(bestCar);
      this.bestCar.drawSensors = true;
    }

    reset(neuralNetwork){
      this.ghosts = [];
      this.ghostCounter = 0;


      this.cars = [new Car(this.xStart, this.yStart, this.carWidth, this.carHeight, this.collisionManager, false, neuralNetwork)];
      this.updateBestCar(this.cars[0]);
      // for (let i=0; i<numCars; i++){
      //   this.cars[i] = new Car(this.xStart, this.yStart, this.carWidth, this.carHeight, this.collisionManager, false);
      // }
    }

    draw(ctx){
      ctx.globalAlpha = 0.2;
      for(let i=0; i<this.cars.length; i++){
        this.cars[i].draw(ctx);
      }
      for (let i=0; i<this.ghosts.length; i++){
        this.ghosts[i].draw(ctx);
      }
      ctx.globalAlpha = 1;

      this.bestCar.draw(ctx);
    }
  }
