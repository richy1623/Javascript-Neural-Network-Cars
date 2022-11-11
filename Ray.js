class Ray{
  static count = 0;
  constructor(origin, end, length){
    this.origin=origin;
    this.end=end;
    this.length = length;
    this.collisionRatio = -1;
    this.collisionPoint = undefined;
    this.id = (Ray.count++);
  }

  collides(){
    return this.collisionPoint!=undefined;
  }

  set(origin, end){
    this.origin=origin;
    this.end=end;
    this.collisionRatio = -1;
    this.collisionPoint = undefined;
  }

  draw(ctx){
    ctx.lineWidth=1;
    ctx.strokeStyle="black";
    ctx.setLineDash([]);

    if (this.collisionPoint == undefined){
      ctx.beginPath();
      ctx.moveTo(this.origin.x, this.origin.y);
      ctx.lineTo(this.end.x, this.end.y);
      ctx.stroke();
    }else{
      ctx.beginPath();
      ctx.moveTo(this.origin.x, this.origin.y);
      ctx.lineTo(this.collisionPoint.x, this.collisionPoint.y);
      ctx.stroke();
      ctx.beginPath();
      ctx.strokeStyle="red";
      ctx.moveTo(this.collisionPoint.x, this.collisionPoint.y);
      ctx.lineTo(this.end.x, this.end.y);
      ctx.stroke();
    }
  }

  checkCollision(p1, p2){

    // if (((this.origin.x>p1.x&&this.origin.x>p2.x) && (this.end.x>p1.x&&this.end.x>p2.x) ||
    //   (this.origin.x<p1.x&&this.origin.x<p2.x) && (this.end.x<p1.x&&this.end.x<p2.x) ||
    //   (this.origin.y>p1.y&&this.origin.y>p2.y) || (this.end.y>p1.y&&this.end.y>p2.y) ||
    //   (this.origin.y<p1.y&&this.origin.y<p2.y) || (this.end.y<p1.y&&this.end.y<p2.y))) {
    //   return false;
    // }
    const line1 = getLineFromPoints(this.origin, this.end);
    const line2 = getLineFromPoints(p1, p2);
    if (line1.a==line2.a && line1.c==line2.c){
      this.collisionPoint = this.origin;
      this.collisionRatio = 1;
      return true;
    }
    let point = getIntersectionOfLines(line1, line2);
    if (!pointWithinBounds(point, p1, p2)){
      return false;
    }
    const distToCollision = distanceBetweenPoints(this.origin, point);
    const distAfterCollision = distanceBetweenPoints(this.end, point);
    if (this.length>=distToCollision && this.length>distAfterCollision){
      this.collisionPoint = point;
      this.collisionRatio = distToCollision/distanceBetweenPoints(this.origin, this.end);
      return true;
    }
    return false;
  }
}
