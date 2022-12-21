class CarObstacleSpawner{
  constructor(carWidth, carHeight, lanes, screenHeight, canvasHeight, road, collisionManager, car){
    this.carWidth = carWidth;
    this.carHeight = carHeight;
    this.lanes = lanes;
    this.screenHeight = screenHeight;
    this.canvasHeight = canvasHeight;

    this.road = road;
    this.collisionManager = collisionManager;
    this.car = car;
    this.carObstacles = [];
    // for(let i=0;i<5;i++){
    //   this.addCarObstacle()
    // }

    this.frame = 10000000;

    this.spawnDelay = 2;

    this.spawnBelowPoint = Math.max(road.borders[0][0].y+road.borders[1][0].y, road.borders[0][1].y+road.borders[1][1].y)/2;
    this.spawnBelow = false;
    this.maxSpawns = 3;
    this.skipSpawn=false;
  }

  addCarObstacle(y=Math.floor(this.canvasHeight*Math.random()), lane=Math.floor(this.lanes*Math.random())){
    // console.log(y, this.canvasHeight);
    if(collisionManager.colliders.length>15) return;
    const carObstacle = new CarObstacle(0,y,this.carWidth,this.carHeight, collisionManager, lane%4, road);
    this.carObstacles.push(carObstacle);
    carObstacle.modifySpeed(lerp(0.5,1.8,lane/this.lanes));
    this.collisionManager.addCollider(carObstacle);
  }

  spawnCarObstacle(){
    return;
    if(Math.random()<0.2) return;
    if(this.maxSpawns>0){
      if(!this.skipSpawn){
        const spawnStartPoint = !this.spawnBelow ? 2 : this.road.getCurrentBorderSegmentZone(this.car.y)+3;
        for(let i = spawnStartPoint;i<this.road.borders.length-1;i++){
          for(let j=0;j<this.lanes;j++){
            this.addCarObstacle(this.road.borders[i][0].y, j);
          }
        }
        this.maxSpawns--;
      }
      this.skipSpawn = !this.skipSpawn;
    }else{
      if(!this.spawnBelow){
        for(let j=0;j<this.lanes;j++){
          this.addCarObstacle(this.road.borders[2][0].y, j);
        }
      }
    }
    this.spawnBelow = this.spawnBelow || (this.car.y<this.spawnBelowPoint);
    if(this.spawnBelow){
      for(let j=0;j<this.lanes;j++){
        if(Math.random()>(j+1)/this.lanes) continue;
        this.addCarObstacle(this.road.borders[0][0].y, j);
      }
    }
  }

  update(deltatime){
    if(this.frame>165*this.spawnDelay){
      this.frame = 0;
      this.spawnCarObstacle();
    }
    this.frame++;

    for(const carObstacle of this.carObstacles){
      carObstacle.update(deltatime);
    }
    this.carObstacles = this.carObstacles.filter(carObstacle => !carObstacle.end);
  }

  draw(ctx){
    for(const carObstacle of this.carObstacles){
      carObstacle.draw(ctx);
    }
  }

  filter(car){
    for(const carObstacle of this.carObstacles){
      if(carObstacle.y<car.y-this.screenHeight/2 && carObstacle.MAXSPEED>=car.MAXSPEED){
        carObstacle.endLife();
      }else{
        if(carObstacle.y>car.y+this.screenHeight/5 && carObstacle.MAXSPEED<=car.MAXSPEED){
          carObstacle.endLife();
        }
      }
    }
  }
}
