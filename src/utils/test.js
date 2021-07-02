// object map?

console.log('hello');

let o = {
    a: 1,
    b: 2,
    c: 3
}

console.log(o);
let newObj = {};

Object.keys(o).forEach((key) => {
    newObj[key] = change(key);
})

function change(toChange) {
    return toChange * 2;
}

console.log(o);
console.log(newObj);