class Controls {
  constructor(neuralNetwork=undefined) {
    this.foward = false;
    this.left = false;
    this.right = false;
    this.reverse = false;

    if(!neuralNetwork){
      this.#addKeyboardListeners();
    } else {
      this.neuralNetwork = neuralNetwork;
    }
  }

  #addKeyboardListeners() {
    document.onkeydown = (event) => {
      switch (event.key) {
        case "ArrowLeft":
          this.left = true;
          break;
        case "ArrowRight":
          this.right = true;
          break;
        case "ArrowUp":
          this.foward = true;
          break;
        case "ArrowDown":
          this.reverse = true;
          break;
        case "Space":
          noLoop();
          break;
      }
    }
    document.onkeyup = (event) => {
      switch (event.key) {
        case "ArrowLeft":
          this.left = false;
          break;
        case "ArrowRight":
          this.right = false;
          break;
        case "ArrowUp":
          this.foward = false;
          break;
        case "ArrowDown":
          this.reverse = false;
          break;
      }
    }
  }

  aiNavigate(collisionPoints){
    if (!this.neuralNetwork) return;
    var output = NeuralNetwork.feedFoward(collisionPoints, this.neuralNetwork);

    this.left = output[0];
    this.right = output[1];
    this.foward = output[2];
    this.reverse = output[3];
  }
}
