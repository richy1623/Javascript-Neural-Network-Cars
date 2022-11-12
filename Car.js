class Car {
  constructor(x, y, width, height, collisionManager) {
    this.ACCELERATIONCONST = height/1000;
    this.ROTATIONSPEED=0.01;
    this.MAXSPEED = height/30;
    this.FRICTION = this.ACCELERATIONCONST/2;
    this.RAYDISTANCE = height*2.5;

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.halfDiagonalLength = Math.sqrt(width*width + height*height)/2;
    this.alpha = Math.atan2(this.width,this.height);

    this.acceleration=0;
    this.velocity=0;

    this.rotation = 0;

    const numRays = 12;
    this.raysRotationList = [];
    this.rays = [];
    for(let i=0; i<numRays;i++)this.raysRotationList.push(i * Math.PI/numRays*2);
    for(let i=0; i<numRays;i++)this.rays.push(new Ray({x:x, y:y}, {x:x, y:y+1}, this.RAYDISTANCE));

    this.boundries = [];
    this.#generateBoundries();

    this.collisionManager = collisionManager;

    this.crashed = false;
    this.color = "grey";

    this.controls = new Controls();
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

    for(const ray of this.rays){
      ray.draw(ctx);
    }
  }

  update() {
    //if (this.crashed) return;
    this.#move();
    this.#generateRays();
    this.#generateBoundries();
    this.collisionManager.checkRaycastCollisions(this.rays);
    this.crashed = this.crashed || this.collisionManager.checkCollision(this.getBoundries());
  }

  #generateRays(){
    let i=0;
    for(const ray of this.rays){
      ray.set(
        {x:this.x, y:this.y},
        {x:this.x+this.RAYDISTANCE*Math.sin((this.rotation+this.raysRotationList[i])), y:this.y-this.RAYDISTANCE*Math.cos((this.rotation+this.raysRotationList[i]))}
      );
      i++;
    }
  }

  #move(){
    //Forwards-Backwards movement
    this.acceleration = this.controls.foward ? this.ACCELERATIONCONST : (this.controls.reverse ? -this.ACCELERATIONCONST/2 : 0);
    this.velocity *= (1-this.FRICTION);
    this.velocity += this.acceleration;
    if (this.velocity>0) this.velocity = this.velocity>this.MAXSPEED ? this.MAXSPEED : this.velocity;
    else if (this.velocity<0) this.velocity = this.velocity<-this.MAXSPEED/2 ? -this.MAXSPEED/2 : this.velocity;
    if (Math.abs(this.velocity)<this.FRICTION)this.velocity=0;

    //Left-Right movement
    this.rotation+= this.controls.right ? this.ROTATIONSPEED : (this.controls.left ? -this.ROTATIONSPEED : 0);

    this.y += -this.velocity*Math.cos(this.rotation);
    this.x += this.velocity*Math.sin(this.rotation);
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

  getRays(){
    return this.rays;
  }

  getBoundries(){
    return this.boundries;
  }
}
