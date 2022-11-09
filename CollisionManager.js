class CollisionManager{
  constructor(car){
    this.colliders = [];
    this.car = car;
  }

  addCollider(x){
    this.colliders.push(x);
  }

  checkCollisions(){
    for(const ray of this.car.getRays()){
      for(const collider of this.colliders){
        for(const boundry of collider.getBoundries()){
          ray.checkCollision(boundry.p1, boundry.p2);
        }
      }
    }
  }
}
