class Sensor{
  constructor(collisionManager, rayLength, numRays= 12){
    this.rayLength = rayLength;
    this.collisionManager = collisionManager;

    this.raysRotationList = [];
    this.rays = [];
    for(let i=0; i<numRays;i++)this.raysRotationList.push(i * Math.PI/numRays*2);
    for(let i=0; i<numRays;i++)this.rays.push(new Ray({x:0, y:0}, {x:0, y:0}, this.rayLength));
  }

  draw(ctx){
    for(const ray of this.rays){
      ray.draw(ctx);
    }
  }

  generateRays(x, y, rotation){
    let i=0;
    for(const ray of this.rays){
      ray.set(
        {x:x, y:y},
        {x:x+this.rayLength*Math.sin((rotation+this.raysRotationList[i])), y:y-this.rayLength*Math.cos((rotation+this.raysRotationList[i]))}
      );
      i++;
    }
    this.collisionManager.checkRaycastCollisions(this.rays);
  }

  getCollisionPoints(){
    let collisionRatios = [];
    for(const ray of this.rays){
      collisionRatios.push(ray.collisionRatio);
    }
    return collisionRatios;
  }
}
