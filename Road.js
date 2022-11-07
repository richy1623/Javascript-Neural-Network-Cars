class Road{
  constructor(x, canvasWidth, width=1, height, lanes=3, roadPattern=[{x:0,y:0}, {x:0,y:1}]){
    this.x=x;
    this.height = height;
    this.width = canvasWidth*width-10;
    this.lanes = lanes>0 ? lanes : 1;
    //  this.canvasWidth = canvasWidth;

    this.left = x+5;
    this.right = this.left + canvasWidth;
    this.top = 0;
    this.bottom = height;

    //Borders
    const topLeft = {x:this.left, y:this.top};
    const topRight = {x:this.right, y:this.top};
    //const topLeftmidLeft = {x:this.right/2, y:this.bottom/2};
    //const midRight = {x:this.right/2+this.width, y:this.bottom/2};
    const bottomLeft = {x:this.left, y:this.bottom};
    const bottomRight = {x:this.right, y:this.bottom};

    this.borders = this.#generateBorders(roadPattern);
  }

  draw(ctx){
    ctx.lineWidth=3;
    ctx.strokeStyle="white";

    for(let i=0;i<this.borders.length-1;i++){
      ctx.beginPath();
      ctx.moveTo(this.borders[i].x, this.borders[i].y);
      ctx.lineTo(this.borders[i+1].x, this.borders[i+1].y);
      ctx.moveTo(this.borders[i].x+this.width, this.borders[i].y);
      ctx.lineTo(this.borders[i+1].x+this.width, this.borders[i+1].y);
      ctx.stroke();
    }

    ctx.setLineDash([20,20]);
    for(let border=0; border<this.borders.length-1;border++){
      for(let i=1;i<this.lanes;i++){
        //let lanestart = this.borders[i][0].x+i*this.width/(this.lanes)
        ctx.beginPath();
        ctx.moveTo(lerp(this.borders[border].x, this.borders[border].x+this.width, i/this.lanes), this.borders[border].y);
        ctx.lineTo(lerp(this.borders[border+1].x, this.borders[border+1].x+this.width, i/this.lanes), this.borders[border+1].y);
        // ctx.moveTo(this.borders[border][0].x+i*this.width/(this.lanes), this.borders[border][0].y);
        // ctx.lineTo(this.borders[border][1].x+i*this.width/(this.lanes), this.borders[border][1].y);
        ctx.stroke();
      }
    }
  }

  getLaneCenter(n=Math.floor((this.lanes-1)/2)){
    n = Math.min(n, this.lanes-1);
    return this.left+(n+0.5)*this.width/(this.lanes);
  }

  #generateBorders(roadPattern){
    let borders = [];
    let roadPatternRight=[]
    for(let i=0;i<roadPattern.length;i++){
      roadPatternRight.push(lerp(this.left+this.width, this.right+this.width, roadPattern[i].x));
      roadPattern[i].x = lerp(this.left, this.right, roadPattern[i].x);
      roadPattern[i].y = lerp(this.bottom, this.top, roadPattern[i].y);
    }
    // for(let i=0;i<roadPattern.length-1;i++){
    //   borders.push([roadPattern[i], roadPattern[i+1]]);
    //   borders.push([{x:roadPatternRight[i], y:roadPattern[i].y}, {x:roadPatternRight[i+1], y:roadPattern[i+1].y}]);
    // }
    return roadPattern;
  }
}
