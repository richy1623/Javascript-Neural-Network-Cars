class AbstractCar {
  constructor(x, y, width, height, collisionManager) {
    this.ACCELERATIONCONST = height/1200;
    this.ROTATIONSPEED=0.008;
    this.MAXSPEED = height/35;
    this.FRICTION = this.ACCELERATIONCONST/2;

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.halfDiagonalLength = Math.sqrt(width*width + height*height)/2;
    this.alpha = Math.atan2(this.width,this.height);

    this.acceleration=0;
    this.velocity=0;

    this.rotation = 0;

    this.boundries = [];
    this.#generateBoundries();

    this.collisionManager = collisionManager;

    this.crashed = false;
    this.color = "grey";

    this.controls = undefined;
  }

  draw(ctx) {
    if (this.crashed){
      ctx.fillStyle="red";
    }else{
      ctx.fillStyle=this.color;
    }
    ctx.beginPath();
    ctx.moveTo(this.boundries[0].p1.x,this.boundries[0].p1.y);
    for(let i=0;i<this.boundries.length;i++){
      ctx.lineTo(this.boundries[i].p2.x,this.boundries[i].p2.y);
    }
    ctx.fill();
  }

  update(deltatime) {
    //if (this.crashed) return;
    this.move(deltatime);
    this.#generateBoundries();
    this.crashed = this.crashed || this.collisionManager.checkCollision(this.getBoundries());
  }



  move(deltatime){
    if (!this.controls) {
      console.log("ERROR");
      return;
    }
    //Forwards-Backwards movement
    this.acceleration = this.controls.foward ? this.ACCELERATIONCONST : (this.controls.reverse ? -this.ACCELERATIONCONST/2 : 0);
    this.velocity *= (1-this.FRICTION);
    this.velocity += this.acceleration;
    if (this.velocity>0) this.velocity = this.velocity>this.MAXSPEED ? this.MAXSPEED : this.velocity;
    else if (this.velocity<0) this.velocity = this.velocity<-this.MAXSPEED/2 ? -this.MAXSPEED/2 : this.velocity;
    if (Math.abs(this.velocity)<this.FRICTION)this.velocity=0;

    //Left-Right movement
    this.rotation+= this.controls.right ? this.ROTATIONSPEED*deltatime : (this.controls.left ? -this.ROTATIONSPEED*deltatime : 0);
    if(this.rotation<0)this.rotation+=Math.PI*2;
    else if(this.rotation>Math.PI*2)this.rotation-=Math.PI*2;

    this.y += -this.velocity*Math.cos(this.rotation)*deltatime;
    this.x += this.velocity*Math.sin(this.rotation)*deltatime;
    // console.table(this.controls);
  }

  #generateBoundries() {
    const sin1 = Math.round(Math.sin(this.rotation + this.alpha) * this.halfDiagonalLength);
    const sin2 = Math.round(Math.sin(Math.PI - this.rotation + this.alpha) * this.halfDiagonalLength);
    const cos1 = Math.round(Math.cos(this.rotation + this.alpha) * this.halfDiagonalLength);
    const cos2 = Math.round(Math.cos(Math.PI - this.rotation + this.alpha) * this.halfDiagonalLength);
    const verticies = [
      {
        x: this.x + sin1,
        y: this.y - cos1
      },
      {
        x: this.x + Math.round(Math.sin(this.rotation) * this.halfDiagonalLength)*1.2,
        y: this.y - Math.round(Math.cos(this.rotation) * this.halfDiagonalLength)*1.2
      },
      {
        x: this.x + sin2,
        y: this.y + cos2
      },
      {
        x: this.x - sin1,
        y: this.y + cos1
      },
      {
        x: this.x - sin2,
        y: this.y - cos2
      }
    ];
    this.boundries = [];
    for (let i = 0; i < verticies.length; i++)
      this.boundries.push({p1:verticies[i], p2: verticies[(i + 1) % verticies.length]});
  }

  getBoundries(){
    return this.boundries;
  }

  modifySpeed(modifier){
    this.MAXSPEED*=modifier;
  }
}
