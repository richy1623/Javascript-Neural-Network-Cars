class CarObstacle extends AbstractCar{
  constructor(x, y, width, height, collisionManager, lane, road){
    super(0, y, width, height, collisionManager);
    const pos = road.getLaneCenterPoint(y, lane);
    this.x = pos.x;
    this.y = pos.y;

    this.color = "cyan";
    this.lane = lane;

    this.road = road;

    this.controls = new AIControls({x:this.x, y:this.y}, lane, this.MAXSPEED, road);
    this.end = false;
  }

  update(deltatime){
    if(this.end) return;
    super.update(deltatime);
    // console.log(this.x, this.y);
    this.controls.update(this.x, this.y, this.rotation);
    if(this.controls.setPoint){
      const deltax = clamp(this.controls.setPoint.x - this.x, -this.MAXSPEED, this.MAXSPEED);
      const deltay = clamp(this.controls.setPoint.y-this.y, -this.MAXSPEED, this.MAXSPEED);
      if(deltax==0 && deltay==0){
        this.controls.setPoint= undefined;
      }else{
        this.x += deltax;
        this.y += deltay;
        this.controls.turning = true;
      }
    }
    if (this.y<=1){
        this.endLife();
    }
  }

  endLife(){
    if(!this.end) this.end = this.collisionManager.removeCollider(this);
  }

  move(deltatime){
    super.move(deltatime);
    if (this.controls.reverse) this.velocity = 0;
  }

  draw(ctx){
    if(this.controls.endRoute || this.end) return;
    super.draw(ctx);
    this.controls.draw(ctx);
  }
}
