class NeuralNetwork {
  constructor(neuronCounts){
    this.layers = [];
    for (let i=0; i<neuronCounts.length-1; i++){
      this.layers.push(new Layer(neuronCounts[i], neuronCounts[i+1]));
    }
  }

  static feedFoward(inputs, neuralNetwork){
    let outputs = Layer.feedFoward(inputs, neuralNetwork.layers[0]);
    for (let i=1; i<neuralNetwork.layers; i++){
      outputs = Layer.feedFoward(outputs, neuralNetwork.layers[i]);
    }
    outputs = Layer.formatOutput(outputs);
    return outputs;
  }
}

class Layer {
  constructor(numInputs, numOutputs) {
    this.outputs = new Array(numOutputs);

    this.weights = [];
    for (let i = 0; i < numOutputs; i++) {
      this.weights.push(new Array(numInputs));
    }

    this.biases = new Array(numOutputs);

    Layer.#randomise(this);
  }

  static #randomise(layer) {
    for (let i = 0; i < layer.weights.length; i++) {
      for (let j = 0; j < layer.weights[i].length; j++) {
        layer.weights[i][j] = Math.random() * 2 - 1;
      }
    }
    for (let i = 0; i < layer.biases.length; i++) {
      layer.biases[i] = Math.random() * 0.5;
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

}
