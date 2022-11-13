class AIControls{
  constructor(waypoint, lane, maxspeed, road){
    this.waypointIndex=0;
    this.waypoint = waypoint;
    this.maxspeed = maxspeed;
    this.lane = lane;
    this.road = road;

    this.turning = false;
    this.targetRotation = 0;

    this.foward = false;
    this.left = false;
    this.right = false;
    this.reverse = false;

    this.setPoint = undefined;
    this.endRoute = false;
  }

  update(x, y, rotation){
    if (this.turning){
      //if (rotation<0)rotation+=Math.PI*2;
      if (Math.abs(this.targetRotation-rotation)<0.01){
        this.right = false;
        this.left = false;
        this.reverse = false;
        this.turning=false;
        return;
      }
      // console.log(this.targetRotation/Math.PI*180, rotation/Math.PI*180);
      this.foward = false;
      this.reverse = true;
      if (this.targetRotation<Math.PI){
        if (rotation>Math.PI || rotation<this.targetRotation){
          this.right = true;
          this.left = false;
          return;
        }
      }
      this.right = false;
      this.left = true;
      return;
    }
    //console.log(this.MAXSPEED);
    if (Math.abs(this.waypoint.y-y)-1<=this.maxspeed){
      this.setPoint = {x:this.waypoint.x, y:this.waypoint.y};
      this.waypointIndex = this.road.getCurrentBorderSegment(this.waypoint.x, this.waypoint.y, this.maxspeed)+1;
      this.waypoint = this.road.getWaypoint(this.waypointIndex, this.lane);
      if(!this.waypoint){
        this.endRoute=true;
        return;
      }
      this.targetRotation = Math.atan((this.waypoint.x-this.setPoint.x)/(this.setPoint.y-this.waypoint.y));
      if ((y-this.waypoint.y)<0) this.targetRotation-=Math.PI;
      if(this.targetRotation<0)this.targetRotation+=Math.PI*2;
      else if(this.targetRotation>Math.PI*2)this.targetRotation-=Math.PI*2;
      //this.targetRotation = Math.PI/2;
      this.turning = true;
      this.foward = false;
    }else{
      this.foward = true;
    }
  }

  draw(ctx){
    ctx.fillStyle="red";
    ctx.beginPath();
    ctx.arc(this.waypoint.x, this.waypoint.y, 5, 0, 2 * Math.PI);
    ctx.fill();
  }
}
