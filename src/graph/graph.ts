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
    public vertexSet: HashSet<Vertex<T>>;
    public edgeSet: HashSet<Edge<T>>;
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
        if (this.vertexSet.contains(v)) {
            return;
        }

        this.vertexSet.add(v);
        this.adjacencyMap.put(v, new IncidenceMap<T>());
    }

    insertEdge(e: Edge<T>): void {
        this.insertEdgeHelper(e);

        if (!this.isDirected) {
            this.insertEdgeHelper(new Edge(e.getEnd(), e.getStart()));
        }
    }

    private insertEdgeHelper(e: Edge<T>): void {
        if (this.edgeSet.contains(e)) {
            return;
        }

        this.edgeSet.add(e);

        let u = e.getStart();
        let v = e.getEnd();

        this.insertVertex(u);
        this.insertVertex(v);

        this.adjacencyMap.get(u).outgoing.put(v, e);
        this.adjacencyMap.get(v).incoming.put(u, e);

    }

    /**
     * Removes Vertex v and all its incident edges in (deg(v)) time.
     * @param v 
     */
    removeVertex(v: Vertex<T>): void {  // return removed Vertex?
        this.vertexSet.remove(v);

        let incidenceMap = this.adjacencyMap.get(v);
        
        for (let edge of incidenceMap.incoming.values()) {
            this.removeEdge(edge);
        }
        
        for (let edge of incidenceMap.outgoing.values()) {
            this.removeEdge(edge);
        }

        this.adjacencyMap.remove(v);

    }

    /**
     * Removes edge e from the graph in O(1) time.
     * @param e 
     */
    removeEdge(e: Edge<T>): void {
        this.edgeSet.remove(e);

        let u = e.getStart();
        let v = e.getEnd();

        // remove from u.outgoing
        this.adjacencyMap.get(u).outgoing.remove(v);
        // remove from v.incoming
        this.adjacencyMap.get(v).incoming.remove(u);

        if (!this.isDirected) {     // commenting block out fixed the issue of removing reverse edges. Inspect this.
            // remove from u.incoming
            this.adjacencyMap.get(u).incoming.remove(v);
            // remove from v.outgoing
            this.adjacencyMap.get(v).outgoing.remove(u);
            // remove from edgeSet
            let reverseEdge = new Edge(e.getEnd(), e.getStart());
            this.edgeSet.remove(reverseEdge);
        }
    }

    getAdjacencyMap(): HashMap<Vertex<T>, IncidenceMap<T>> {     // for debugging.
        return this.adjacencyMap;
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

