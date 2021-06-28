import HashSet from "../utils/hashSet";
import Graph from "./graph";
import Vertex from "./vertex";

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