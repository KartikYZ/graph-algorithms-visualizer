import Vertex from "./vertex";
import Edge from "./edge";
import HashSet from "../utils/hashSet";

export default class Graph<T> {
    private isDirected: boolean;

    private vertexSet: HashSet<Vertex<T>>;
    private edgeSet: HashSet<Edge<T>>;
    private adjacencyMap: Map<string, HashSet<Edge<T>>>;

    constructor(isDirected: boolean) {
        this.isDirected = isDirected;
        this.vertexSet = new HashSet();
        this.edgeSet = new HashSet();

        this.adjacencyMap = new Map<string, HashSet<Edge<T>>>();
    }

    public numVertices(): number  {
        return this.vertexSet.getSize();
    }

    public numEdges(): number {
        return this.edgeSet.getSize();
    }

    public vertices(): Vertex<T>[] {
        return this.vertexSet.getSet();
    }

    public edges(): Edge<T>[] {
        return this.edgeSet.getSet();
    }
}