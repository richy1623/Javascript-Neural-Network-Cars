class NeuralNetwork {
  constructor(neuronCounts, randomise=true){
    this.neuronCounts = neuronCounts;
    this.layers = [];
    this.inputs = new Array(neuronCounts[0]);
    for (let i=0; i<neuronCounts.length-1; i++){
      this.layers.push(new Layer(neuronCounts[i], neuronCounts[i+1], randomise));
    }
  }

  static feedFoward(inputs, neuralNetwork){
    neuralNetwork.inputs = inputs;
    let outputs = Layer.feedFoward(inputs, neuralNetwork.layers[0]);
    for (let i=1; i<neuralNetwork.layers.length; i++){
      outputs = Layer.feedFoward(outputs, neuralNetwork.layers[i]);
    }
    outputs = Layer.formatOutput(outputs);
    return outputs;
  }

  static mutate(neuralNetworkBase, variation=0.1){
    let neuralNetwork = new NeuralNetwork(neuralNetworkBase.neuronCounts, false);
    for(let i=0; i<neuralNetwork.layers.length; i++){
      Layer.mutate(neuralNetworkBase.layers[i], neuralNetwork.layers[i], variation);
    }
    return neuralNetwork;
  }
}

class Layer {
  constructor(numInputs, numOutputs, randomise=true) {
    this.outputs = new Array(numOutputs);

    this.weights = [];
    for (let i = 0; i < numOutputs; i++) {
      this.weights.push(new Array(numInputs));
    }

    this.biases = new Array(numOutputs);

    if(randomise) Layer.#randomise(this);
  }

  static #randomise(layer) {
    for (let i = 0; i < layer.weights.length; i++) {
      for (let j = 0; j < layer.weights[i].length; j++) {
        layer.weights[i][j] = Math.random() * 2 - 1;
      }
    }
    for (let i = 0; i < layer.biases.length; i++) {
      layer.biases[i] = Math.random();
    }
  }

  static feedFoward(inputs, layer) {
    for (let i = 0; i < layer.weights.length; i++) {
      let output = 0;
      for (let j = 0; j < layer.weights[i].length; j++) {
        output += layer.weights[i][j] * inputs[j];
      }
      output += layer.biases[i];
      output = Math.max(0, output);
      layer.outputs[i] = output;
    }
    return layer.outputs;
  }

  static formatOutput(outputs) {
    for (let i = 0; i < outputs.length; i++) {
      if (outputs[i] > 0) {
        outputs[i] = 1;
      }
    }
    return outputs;
  }

  static mutate(baseLayer, layer, variation){
    for (let i = 0; i < layer.weights.length; i++) {
      for (let j = 0; j < layer.weights[i].length; j++) {
        layer.weights[i][j] = baseLayer.weights[i][j] + Math.random()*variation-variation/2;
      }
    }
    for (let i = 0; i < layer.biases.length; i++) {
      layer.biases[i] = baseLayer.biases[i] + Math.random()*2*variation-variation;
    }
  }

}
