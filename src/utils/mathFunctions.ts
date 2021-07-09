
export function euclideanDist(p1: number[], p2: number[]) {
    return Math.sqrt((p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2);
}

/**
 * MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/
 * Global_Objects/Math/random#getting_a_random_integer_between_two_values_inclusive
 * @param min 
 * @param max 
 * @returns 
 */
export function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomBoolean(): boolean {
    return getRandomInt(0, 1) === 1;
}


/**
 * RNG with skew.
 * https://stackoverflow.com/a/49434653
 * @param min
 * @param max 
 * @param skew 
 * @returns 
 */
export function randn_bm(min: number, max: number, skew: number): number {
    let u = 0, v = 0;
    while(u === 0) u = Math.random() //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random()
    let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v )
    
    num = num / 10.0 + 0.5 // Translate to 0 -> 1
    if (num > 1 || num < 0) 
      num = randn_bm(min, max, skew) // resample between 0 and 1 if out of range
    
    else{
      num = Math.pow(num, skew) // Skew
      num *= max - min // Stretch to fill range
      num += min // offset to min
    }
    return num
  }

export function getSkewedRandomBoolean() {
    let skews = [0.10, 0.20, 0.80, 1.4, 3, 5, 7, 10, 11];
    return Math.floor(randn_bm(-1, 2, skews[getRandomInt(0, skews.length - 1)]));
}

export function getRandomBool() {
    return Math.floor(Math.pow(1 - getRandomInt(0, 1), 10)) === 1;
}
