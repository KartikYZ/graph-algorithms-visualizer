import Vertex from "./vertex";
import Edge from "./edge";
import HashSet from "../utils/hashSet";
import HashMap from "../utils/hashMap";
import { Equatable } from "../utils/hashable";

/**
 * Adjacency Map (modified) Implementation of Goodrich, Tamassia, Goldwassser's Graph ADT. (Data Structures and Algorithms in Java)
 */ 
export default class Graph<T> {
    
    public readonly isDirected: boolean;
    private vertexSet: HashSet<Vertex<T>>;
    private edgeSet: HashSet<Edge<T>>;
    // private adjacencyMap: HashMap<Vertex<T>, HashSet<Edge<T>>>;
    private adjacencyMap: HashMap<Vertex<T>, IncidenceMap<T>>;      // ?use linked positional list for vertices 

    constructor(isDirected: boolean) {
        this.isDirected = isDirected;
        this.vertexSet = new HashSet();
        this.edgeSet = new HashSet();

        // this.adjacencyMap = new HashMap<Vertex<T>, HashSet<Edge<T>>>();
        this.adjacencyMap = new HashMap();
    }

    numVertices(): number  {
        return this.vertexSet.getSize();
    }

    numEdges(): number {
        return this.edgeSet.getSize();
    }

    vertices(): Vertex<T>[] {
        return this.vertexSet.getSet();
    }

    edges(): Edge<T>[] {
        return this.edgeSet.getSet();
    }

    getEdge(u: Vertex<T>, v: Vertex<T>): Edge<T> | null {
        try {
            return this.adjacencyMap.get(u).outgoing.get(v);
        } catch {
            return null;
        }
    }

    endVertices(e: Edge<T>): Vertex<T>[] {
        return [e.getStart(), e.getEnd()];
    }

    opposite(v: Vertex<T>, e: Edge<T>) {
        if (v.equals(e.getStart())) {
            return e.getEnd();
        } else if (v.equals(e.getEnd())) {
            return e.getStart();
        } else {
            throw new Error(`${e} not incident to ${v}`);
        }
    }

    outDegree(v: Vertex<T>): number {
        return this.adjacencyMap.get(v).outgoing.getSize();
    }

    inDegree(v: Vertex<T>): number {
        return this.adjacencyMap.get(v).incoming.getSize();
    }

    outgoingEdges(v: Vertex<T>): Edge<T>[] {
        return this.adjacencyMap.get(v).outgoing.values();
    }

    incomingEdges(v: Vertex<T>): Edge<T>[] {
        return this.adjacencyMap.get(v).incoming.values();
    }

    insertVertex(v: Vertex<T>): void {

    }

    insertEdge(e: Edge<T>): void {

    }

    removeVertex(v: Vertex<T>): void {  // return removed Vertex?

    }

    removeEdge(e: Edge<T>): void {

    }
}

interface IncidenceMapInterface<T> {
    incoming: HashMap<Vertex<T>, Edge<T>>,
    outgoing: HashMap<Vertex<T>, Edge<T>>, 
    equals: (obj: object) => boolean
}

class IncidenceMap<T> implements IncidenceMapInterface<T>, Equatable {
    public incoming: HashMap<Vertex<T>, Edge<T>>
    public outgoing: HashMap<Vertex<T>, Edge<T>>
    
    constructor() {
        this.incoming = new HashMap();
        this.outgoing = new HashMap();
    }

    equals(obj: Object): boolean {
        if (!(obj instanceof IncidenceMap) || obj == null) {
            return false;
        }
        return this.incoming === obj.incoming && this.outgoing === obj.outgoing;    // reference equality.
    }
} 

