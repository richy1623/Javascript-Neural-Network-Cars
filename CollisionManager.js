class CollisionManager{
  constructor(){
    this.colliders = [];
  }

  addCollider(x){
    this.colliders.push(x);
  }

  checkRaycastCollisions(rays){
    for(const ray of rays){
      for(const collider of this.colliders){
        for(const boundry of collider.getBoundries()){
          ray.checkCollision(boundry.p1, boundry.p2);
        }
      }
    }
  }

  checkCollision(objectBoundries){
    for(const objectBoundry of objectBoundries){
      for(const collider of this.colliders){
        for(const colliderBoundry of collider.getBoundries()){
          if (checkCollision(objectBoundry, colliderBoundry)) return true;
        }
      }
    }
    return false;
  }
}
