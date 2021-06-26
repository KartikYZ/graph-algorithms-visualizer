import Graph from "./graph";
import Vertex from "./vertex";

function depthFirstSearch(graph: Graph<any>, startVertex: Vertex<any>) {
    
    // mark start as visited;
    // for each of starts outgoing edges:
        // if (other endpoint is not visited):
            // depthFirstSearch(other endpoint of edge);

}

module.exports = {
    depthFirstSearch
}