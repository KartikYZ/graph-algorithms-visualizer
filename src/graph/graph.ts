import Vertex from "./vertex";
import Edge from "./edge";
import HashSet from "../utils/hashSet";
import HashMap from "../utils/hashMap";
import { Equatable } from "../utils/hashable";
import { colors } from "../utils/colors";

/**
 * Adjacency Map (modified) Implementation of Goodrich, Tamassia, Goldwasser's Graph ADT. (Data Structures and Algorithms in Java)
 */ 
export default class Graph<T> {
    
    private isDirected: boolean;
    private showWeights: boolean;   // canvas rendering 
    private showPositions: boolean; // canvas rendering 
    public vertexSet: HashSet<Vertex<T>>;   // make private. Use this.references in canvas.
    public edgeSet: HashSet<Edge<T>>;
    private adjacencyMap: HashMap<Vertex<T>, IncidenceMapInterface<T>>;     // ?use linked positional list for vertices 

    constructor(isDirected: boolean, showWeights: boolean, showPositions: boolean) {
        this.isDirected = isDirected;
        this.showWeights = showWeights;
        this.showPositions = showPositions;

        this.vertexSet = new HashSet();
        this.edgeSet = new HashSet();
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
        v.setColor(colors.graphVertex);
        this.vertexSet.add(v);
        this.adjacencyMap.put(v, new IncidenceMap<T>());
    }

    insertEdge(e: Edge<T>): void {
        this.insertEdgeHelper(e);

        if (!this.isDirected) {
            this.insertEdgeHelper(new Edge(e.getEnd(), e.getStart(), e.getColor()));
        }
    }

    private insertEdgeHelper(e: Edge<T>): void {
        if (this.edgeSet.contains(e)) {
            return;
        }

        e.setColor(colors.graphEdge);
        this.edgeSet.add(e);

        let u = e.getStart();
        let v = e.getEnd();

        u.setColor(colors.graphVertex);
        this.insertVertex(u);
        v.setColor(colors.graphVertex);
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
            let reverseEdge = new Edge(e.getEnd(), e.getStart(), e.getColor());
            this.edgeSet.remove(reverseEdge);
        }
    }

    clear(): void {
        this.vertexSet = new HashSet();
        this.edgeSet = new HashSet();
        this.adjacencyMap = new HashMap();
    }

    getAdjacencyMap(): HashMap<Vertex<T>, IncidenceMap<T>> {     // for debugging.
        return this.adjacencyMap;
    }

    getIsDirected(): boolean {
        return this.isDirected;
    }

    setIsDirected(isDirected: boolean): void {
        
        if (this.isDirected && !isDirected) {
            // add reverse edges.
            for (let edge of this.edgeSet.getSet()) {
                let reverseEdge = new Edge(edge.getEnd(), edge.getStart(), edge.getColor());
                this.insertEdge(reverseEdge);
            }
        }

        this.isDirected = isDirected;
    }

    getShowWeights(): boolean {
        return this.showWeights;
    }

    setShowWeights(showWeights: boolean): void {
        this.showWeights = showWeights;
    }

    getShowPositions(): boolean {
        return this.showPositions;
    }

    setShowPositions(showPositions: boolean): void {
        this.showPositions = showPositions;
    }

    // setVertexColor(v: Vertex<T>, color: string): Vertex<T> {
    //     let vertex = this.vertexSet.get(v);
    //     if (vertex) {
    //         vertex.setColor(color);
    //         return vertex;
    //     } else {
    //         v.setColor(color)
    //         return v;
    //     }
    // }

    // setVerticesColor(vertices: Vertex<T>[], color: string): void {
    //     for (let vertex of vertices) {
    //         this.setVertexColor(vertex, color);
    //     }
    // }

    // setEdgeColor(e: Edge<T>, color: string): Edge<T> {
    //     let edge = this.getEdge(e.getStart(), e.getEnd());
    //     if (edge) {
    //         edge.setColor(color);

    //         if (!this.isDirected) {
    //             let reverseEdge = this.getEdge(e.getStart(), e.getEnd());
    //             reverseEdge!.setColor(color);
    //         }

    //         return edge;
    //     } else {
    //         e.setColor(color);
    //         if (!this.isDirected) {
    //             let reverseEdge = new Edge(e.getStart(), e.getEnd(), color);
    //             this.insertEdge(reverseEdge);
    //             reverseEdge.setColor(color);
    //         }
    //         return e;
    //     }
    // }

    // setEdgesColor(edges: Edge<T>[], color: string): void {
    //     for (let edge of edges) {
    //         this.setEdgeColor(edge, color);
    //     }
    // }
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

