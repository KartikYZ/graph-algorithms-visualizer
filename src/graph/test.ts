import Vertex from "./vertex";
import Edge from "./edge"
import HashMap from "../utils/hashMap";
import HashSet from "../utils/hashSet";
import Graph from "./graph";

export let main = () => {
    let map = new Map<Vertex<number>, Vertex<number>[]>();

    let a = new Vertex([0, 0], 10);
    let b = new Vertex([1, 0], 11);
    let c = new Vertex([2, 0], 12);
    let d = new Vertex([2, 0], 12);
    let e = new Vertex([0, 0], 10);     // equivalent to a.

    map.set(a, []);
    map.set(b, []);
    map.set(c, []);
    map.set(d, []);

    // console.log(map.has(a));
    // console.log(map.has(d));
    console.log(map.has(e));
    console.log(a.toString() === e.toString());
};



