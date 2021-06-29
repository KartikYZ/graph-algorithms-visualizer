import HashSet from "../utils/hashSet";
import Graph from "./graph";
import Vertex from "./vertex";
import Edge from "./edge";

export function depthFirstSearch(graph: Graph<any>, startVertex: Vertex<any>): Vertex<any>[] {
    let visited = new HashSet<Vertex<any>>();
    dfsHelper(graph, startVertex, visited);
    return visited.getSet();
}

function dfsHelper(graph: Graph<any>, startVertex: Vertex<any>, visited: HashSet<Vertex<any>>): void {

    // TODO: record discovery edges.

    // mark start as visited;
    visited.add(startVertex);
    // for each of start's outgoing edges:
    for (let edge of graph.outgoingEdges(startVertex)) {
        // if (other endpoint is not visited):
        let opposite = graph.opposite(startVertex, edge);
        if (!visited.contains(opposite)) {
            // depthFirstSearch(other endpoint of edge);
            dfsHelper(graph, opposite, visited);
        }
    }  
}

// interface GraphAnimationFrame<T> {
//     visitedVertices: Vertex<T>[],
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

interface placeHolderFrame<T> {
    outgoingEdges: Edge<T>[]
}

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

    start vertex: default is first inserted vertex, can be changed through toolbar
    current vertex: the one dfs is called recursively on
    outgoing edges from current vertex: adjMap
    visited vertices: maintain a collection
    visited edges: maintain a collection

*/
