class NeuralNetworkVisualiser{
  constructor(neuralNetwork, width, height){
    this.neuralNetwork = neuralNetwork;
    this.width = width;
    this.height = height;
    this.margin = Math.min(width, height)*0.1;
  }

  setNeuralNetwork(neuralNetwork){
    this.neuralNetwork = neuralNetwork.layers;
  }

  draw(ctx){
    const layers = this.neuralNetwork.layers;
    this.#drawLayerWeights(ctx, this.neuralNetwork.inputs, layers[0].weights, layers.length-1, layers.length);
    for(let i=1; i<layers.length; i++){
      this.#drawLayerWeights(ctx, layers[i-1].outputs, layers[i].weights, layers.length-i-1, layers.length);
    }
    this.#drawLayerNodes(ctx, this.neuralNetwork.inputs, layers.length, layers.length);
    for(let i=0; i<layers.length; i++){
      this.#drawLayerNodes(ctx, layers[i].outputs,
        layers.length-i-1, layers.length);
    }
  }

  #drawLayerNodes(ctx, layerOutputs, layernumber, numOfLayers){
    for(let i=0; i<layerOutputs.length; i++){
      this.#drawNode(ctx, i, layerOutputs[i], layerOutputs.length, layernumber, numOfLayers);
    }
  }
  #drawLayerWeights(ctx, layerInputs, layerWeights, layernumber, numOfLayers){
    for(let i=0; i<layerWeights.length;i++){
      for(let j=0;j<layerWeights[i].length; j++){
        this.#drawWeight(ctx, (i+0.5)/layerWeights.length, layernumber/numOfLayers,
          (j+0.5)/layerWeights[i].length, (layernumber+1)/numOfLayers,
          layerWeights[i][j], layerInputs[j]);
      }
    }
  }
  #drawNode(ctx, i, value, layerLength, layernumber, numOfLayers){
    ctx.strokeStyle="white";
    ctx.setLineDash([3, 2]);
    ctx.lineWidth=1;
    ctx.beginPath();
    ctx.arc(lerp(this.margin, this.width-this.margin, (i+0.5)/layerLength),
      lerp(this.margin, this.height-this.margin, layernumber/numOfLayers),
      12, 0, 2*Math.PI);
    ctx.stroke();
    ctx.fillStyle=this.#getNodeRGB(value);
    ctx.beginPath();
    ctx.arc(lerp(this.margin, this.width-this.margin, (i+0.5)/layerLength),
      lerp(this.margin, this.height-this.margin, layernumber/numOfLayers),
      10, 0, 2*Math.PI);
    ctx.fill();

  }
  #drawWeight(ctx, x1, y1, x2, y2, weight, input){
    ctx.strokeStyle=this.#getWeightRGB(weight, input);
    ctx.beginPath();
    ctx.moveTo(lerp(this.margin, this.width-this.margin, x1),
      lerp(this.margin, this.height-this.margin, y1));
    ctx.lineTo(lerp(this.margin, this.width-this.margin, x2),
      lerp(this.margin, this.height-this.margin, y2));
    ctx.stroke();
  }
  #getNodeRGB(value){
    const val = Math.max(0, Math.min(value*150, 255));
    return "rgb("+val+", "+val+", 0)";
  }
  #getWeightRGB(weight, input){
    if(weight<0){
      const val = Math.max(0, Math.min(-weight*input*150, 255));
      return "rgb("+val+", 0, 0)";
    }
    const val = Math.max(0, Math.min(weight*input*150, 255));
    return "rgb("+val+", "+val+", 0)";
  }
}
