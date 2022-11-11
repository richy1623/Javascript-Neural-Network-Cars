class Car {
  constructor(x, y, width, height) {
    this.ACCELERATIONCONST = 0.1;
    this.ROTATIONSPEED=0.01;
    this.MAXSPEED = 3;
    this.FRICTION = 0.05;
    this.RAYDISTANCE = height;

    this.x = x;
    this.y = y;
    this.width = width/2;
    this.height = height/2;

    this.acceleration=0;
    this.velocity=0;

    this.rotation = Math.PI;

    this.raysRotationList = [];
    this.rays = [];
    for(let i=0; i<8;i++)this.raysRotationList.push(i * Math.PI/4);
    for(let i=0; i<8;i++)this.rays.push(new Ray({x:x, y:y}, {x:x, y:y+1}, this.RAYDISTANCE));

    this.controls = new Controls();
  }

  draw(ctx) {
    ctx.save()
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.fillRect(-this.width / 2,-this.height / 2, this.width, this.height);
    ctx.restore();

    for(const ray of this.rays){
      ray.draw(ctx);
    }
  }

  update() {
    this.#move();
    this.#generateRays();
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

  getRays(){
    return this.rays;
  }
}
