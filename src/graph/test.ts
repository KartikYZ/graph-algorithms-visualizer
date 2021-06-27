import Vertex from "./vertex";
import Edge from "./edge"
import Graph from "./graph";

export const main = () => {
    let graph = new Graph(true);

    let a = new Vertex([0, 0]);
    let b = new Vertex([1, 0]);
    let c = new Vertex([0, 1]);

    let ab = new Edge(a, b);
    let bc = new Edge(b, c);
    let ca = new Edge(c, a);

    graph.insertVertex(a);
    graph.insertVertex(b);
    graph.insertVertex(c);

    graph.insertEdge(ab);
    graph.insertEdge(bc);
    graph.insertEdge(ca);
    
    console.log(graph.getAdjacencyMap());
};



