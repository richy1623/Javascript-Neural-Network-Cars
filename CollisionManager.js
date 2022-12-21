class CollisionManager{
  constructor(){
    this.colliders = [];
  }

  addCollider(x){
    this.colliders.push(x);
  }

  removeCollider(x){
    const index = this.colliders.indexOf(x);
    if (index > -1) {
      // this.colliders.splice(index, 1);
      this.colliders[index] = null;
      console.log(this.colliders.length);
      return true;
    }
    return false;
  }

  checkRaycastCollisions(rays){
    for(const ray of rays){
      for(const collider of this.colliders){
        if (collider==null) continue;
        for(const boundry of collider.getBoundries()){
          ray.checkCollision(boundry.p1, boundry.p2);
        }
      }
    }
  }

  checkCollision(objectBoundries){
    for(const objectBoundry of objectBoundries){
      for(const collider of this.colliders){
        if (collider==null) continue;
        for(const colliderBoundry of collider.getBoundries()){
          if (checkCollision(objectBoundry, colliderBoundry)) return true;
        }
      }
    }
    return false;
  }
}
