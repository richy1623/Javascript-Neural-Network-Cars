function lerp(start, stop, t) {
  return start + (stop - start) * t;
}

/**
 *
 * @return a line in the form ax+by+c=0
 */
function getLineFromPoints(p1, p2) {

  m = (p2.y - p1.y) / (p2.x - p1.x);
  c = (Math.abs(m) == Infinity) ? p1.x : ((m == 0) ? p1.y : p1.y - m * p1.x );
  return {
    a: m,
    b: -1,
    c: c
  };
}

function getLineFromLineAndDistance(line, distance) {
  if (Math.abs(line.a) == Infinity) {
    return {
      a: line.a,
      b: line.b,
      c: line.c + distance
    };
  } else if (line.a == 0) {
    return {
      a: line.a,
      b: line.b,
      c: line.c - distance
    };
  } else {
    //TODO account for angles
    distance = distance * Math.sqrt(line.a * line.a + line.b * line.b);
    if (line.a > 0) {
      return {
        a: line.a,
        b: line.b,
        c: line.c - Math.abs(distance)
      };
    } else {
      return {
        a: line.a,
        b: line.b,
        c: line.c + Math.abs(distance)
      };
    }
  }
}

function getIntersectionOfLines(l1, l2) {

  if (Math.abs(l1.a) == Infinity) {
    return {x: l1.c, y: (l2.a == 0) ? l2.c : l2.a * l1.c+l2.c};
  } else if (Math.abs(l2.a) == Infinity) {
    return {x: l2.c, y: (l1.a == 0) ? l1.c :  l1.a *l2.c + l1.c};
  } else {
    x = (l2.c - l1.c) / (l1.a - l2.a);
  }

  if (l1.a == 0) {
    y = l1.c;
  } else if (l2.a ==0) {
    y = l2.c;
  } else {
    y = l1.a * x + l1.c;
  }
  return {
    x: x,
    y: y
  };
}

function lerpPoints(p1, p2, t) {
  return {
    x: (1 - t) * p1.x + t * p2.x,
    y: (1 - t) * p1.y + t * p2.y
  };
}

function distanceBetweenPoints(p1, p2){
  return Math.sqrt(Math.pow(p1.x-p2.x,2)+Math.pow(p1.y-p2.y,2));
}

/**
* @param point point in the form {x, y}
* @param line line in the form {a, b, c} from a line ax+by+c=0
*/
function pointOnLine(point, line){
  if (Math.abs(line.a)==Infinity){
    return line.c == point.x;
  }else if (line.a==0){
    return line.c == point.y;
  }else{
    return line.a*point.x + line.b*point.y + line.c ==0;
  }
}
