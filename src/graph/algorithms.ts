import HashSet from "../utils/hashSet";
import HashMap from "../utils/hashMap";
import Queue from "../utils/queue";
import Graph from "./graph";
import Vertex from "./vertex";
import Edge from "./edge";

export function depthFirstSearch(graph: Graph<any>, startVertex: Vertex<any>): AnimationBuilder {
    let visited = new HashSet<Vertex<any>>();
    let discoveryEdges = new HashMap<Vertex<any>, Edge<any>>();
    let animation = new AnimationBuilder();

    dfsHelper(graph, startVertex, visited, discoveryEdges, animation);
    // return visited.getSet();
    return animation;
}

function dfsHelper(graph: Graph<any>, startVertex: Vertex<any>, 
    visited: HashSet<Vertex<any>>, discoveryEdges: HashMap<Vertex<any>, Edge<any>>, animation: AnimationBuilder): void {

    // TODO: record discovery edges.

    // mark start as visited;
    visited.add(startVertex);
    // for each of start's outgoing edges:
    for (let edge of graph.outgoingEdges(startVertex)) {
        // if (other endpoint is not visited):
        let opposite = graph.opposite(startVertex, edge);
        if (!visited.contains(opposite)) {
            // depthFirstSearch(other endpoint of edge);
            // discoveryEdges.add(edge);
            // animation.addFrame(visited.getSet(), discoveryEdges.getSet(), graph.outgoingEdges(startVertex));
            dfsHelper(graph, opposite, visited, discoveryEdges, animation);
        }
    }  
}

export function breadthFirstSearch(graph: Graph<any>, startVertex: Vertex<any>): AnimationBuilder {

    let animation = new AnimationBuilder();

    let visited = new HashSet<Vertex<any>>();
    let queue = new Queue<Vertex<any>>();
    
    queue.enqueue(startVertex);
    
    while (!queue.isEmpty()) {
        let currentVertex = queue.dequeue();
        // animation.addFrame(visited.getSet(), currentVertex)

        if (!visited.contains(currentVertex)) {
            animation.addFrame(visited.getSet(), currentVertex);
            visited.add(currentVertex);
            animation.addFrame(visited.getSet(), currentVertex);

            for (let edge of graph.outgoingEdges(currentVertex)) {
                let opposite = graph.opposite(currentVertex, edge);
                queue.enqueue(opposite);
            }
        }
    }

    // return visited.getSet();
    return animation;
}

export class AnimationBuilder {
    private frames: GraphAnimationFrame[];

    constructor() {
        this.frames = [];
    }

    // addFrame(visitedVertices: Vertex<any>[], visitedEdges: Edge<any>[], outgoingEdges: Edge<any>[]): void {
    //     let frame: GraphAnimationFrame = {
    //         visitedVertices: visitedVertices.splice(0, visitedVertices.length),
    //         visitedEdges: visitedEdges.splice(0, visitedEdges.length),
    //         outgoingEdges: outgoingEdges
    //     }
    //     this.frames.push(frame);
    // }

    addFrame(visitedVertices: Vertex<any>[], currentVertex: Vertex<any>): void {
        let frame: GraphAnimationFrame = {
            visitedVertices: visitedVertices.slice(0, visitedVertices.length),
            currentVertex: currentVertex
        }
        this.frames.push(frame);
    }

    getFrames() {
        return this.frames;
    }

}

export interface GraphAnimationFrame {
    visitedVertices: Vertex<any>[]    // replace with visited subgraph.
    currentVertex: Vertex<any>
    // visitedEdges: Edge<any>[],
    // outgoingEdges: Edge<any>[]
}


// interface GraphAnimationFrame<T> {
//     visitedVertices: Vertex<T>[],    // replace with visited subgraph.
//     currentVertex: Vertex<T> | null,
//     visitedEdges: Edge<T>[],
//     currentOutgoingEdges: Edge<T>[],
//     currentIncomingEdges: Edge<T>[]
// }

// interface Animation<T> {
//     animationFrames: GraphAnimationFrame<T>[]
// }

// interface DFSAnimation<T> extends Animation<T> {
//     startVertex: Vertex<T>
// }

// interface placeHolderFrame<T> {
//     outgoingEdges: Edge<T>[]
// }

// class GraphAnimationFrame<T> {
//     visitedVertices: Vertex<T>[];
//     currentVertex: Vertex<T> | null;
//     visitedEdges: Edge<T>[];
//     currentOutgoingEdges: Edge<T>[];
//     currentIncomingEdges: Edge<T>[];

//     constructor() {
//         this.visitedVertices = [];
//         this.currentVertex = null;
//         this.visitedEdges = [];
//         this.currentOutgoingEdges = [];
//         this.currentIncomingEdges = [];
//     }

// }

// class GraphAnimationBuilder {

// }

/*

There is no need to clone anything! The graph is immutable throughout the animation!

One frame of DFS:
    actual graph: taken care of by Canvas ComponentDidUpdate

    start vertex: default is first inserted vertex, (todo:) can be changed through toolbar
    current vertex: the one dfs is called recursively on
    outgoing edges from current vertex: adjMap
    visited vertices: maintain a collection
    discovery edges: maintain a collection

*/
