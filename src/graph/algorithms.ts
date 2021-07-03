import HashSet from "../utils/hashSet";
// import Stack from "../utils/stack";
import Queue from "../utils/queue";
import Graph from "./graph";
import Vertex from "./vertex";
import Edge from "./edge";
import HashMap from "../utils/hashMap";

export function breadthFirstSearch(graph: Graph<any>, startVertex: Vertex<any>): AnimationBuilder {

    let animation = new AnimationBuilder();
    let visited = new HashSet<Vertex<any>>();
    let discovery: Edge<any>[] = [];
    let queue = new Queue<Vertex<any>>();
    
    queue.enqueue(startVertex);
    
    while (!queue.isEmpty()) {
        let currentVertex = queue.dequeue();
        if (!visited.contains(currentVertex)) {
            
            animation.addFrame({ outlineVertices: [currentVertex], redVertices: visited.getSet(), redEdges: discovery });
            visited.add(currentVertex);
            
            animation.addFrame({ outlineVertices: [currentVertex], redVertices: visited.getSet(), redEdges: discovery });
            animation.addFrame({ 
                outlineVertices: [currentVertex], 
                redVertices: visited.getSet(), 
                redEdges: discovery,
                yellowEdges: graph.outgoingEdges(currentVertex), 
            });

            for (let edge of graph.outgoingEdges(currentVertex)) {
                let opposite = graph.opposite(currentVertex, edge);
                discovery.push(...graph.outgoingEdges(currentVertex));
                queue.enqueue(opposite);
            }
        }
    }
    animation.addFrame({ redVertices: visited.getSet(), redEdges: discovery });

    return animation;
}

export function recursiveDepthFirstSearch(graph: Graph<any>, startVertex: Vertex<any>): AnimationBuilder {
    let animation = new AnimationBuilder();
    let visited = new HashSet<Vertex<any>>();
    let discovery = new HashMap<Vertex<any>, Edge<any>>();
    dfsHelper(graph, startVertex, visited, discovery, animation);
    return animation;
}

function dfsHelper(graph: Graph<any>, u: Vertex<any>, 
    visitedVertices: HashSet<Vertex<any>>, discoveryEdges: HashMap<Vertex<any>, Edge<any>>, animation: AnimationBuilder) {
    
    visitedVertices.add(u);
    animation.addFrame({ 
        outlineVertices: [u], 
        redVertices: visitedVertices.getSet(), 
        redEdges: discoveryEdges.values(),
    })

    for (let edge of graph.outgoingEdges(u)) {
        let v: Vertex<any> = graph.opposite(u, edge);
        if (!visitedVertices.contains(v)) {
            discoveryEdges.put(v, edge);
            animation.addFrame({ 
                outlineVertices: [u], 
                redVertices: visitedVertices.getSet(), 
                redEdges: discoveryEdges.values(), 
                yellowEdges: graph.outgoingEdges(u) 
            });

            dfsHelper(graph, v, visitedVertices, discoveryEdges, animation);
            animation.addFrame({ 
                outlineVertices: [u], 
                redVertices: visitedVertices.getSet(), 
                redEdges: discoveryEdges.values(), 
            })

        }
    }
}

export class AnimationBuilder {
    private frames: GraphAnimationFrame[];

    constructor() {
        this.frames = [];
    }

    public addFrame(frame: GraphAnimationFrame) {
        this.frames.push(this.cloneFrame(frame));
    }

    public getFrames(): GraphAnimationFrame[] {
        return this.frames;
    }

    private cloneArray(arr: any[] | null | undefined): any[] | null {
        return arr ? arr.slice(0, arr.length): null;
    }

    private cloneFrame(frame: GraphAnimationFrame): GraphAnimationFrame {
        // todo: explore ways to 'object map'
        return {
            outlineVertices: this.cloneArray(frame.outlineVertices),
            redVertices: this.cloneArray(frame.redVertices),
            redEdges: this.cloneArray(frame.redEdges),
            yellowVertices: this.cloneArray(frame.yellowVertices),
            yellowEdges: this.cloneArray(frame.yellowEdges),
            greenVertices: this.cloneArray(frame.greenEdges),
            greenEdges: this.cloneArray(frame.greenEdges)
        }
    }
}

export interface GraphAnimationFrame {
    outlineVertices?: Vertex<any>[] | null,
    redVertices?: Vertex<any>[] | null,
    redEdges?: Edge<any>[] | null,
    yellowVertices?: Vertex<any>[] | null,
    yellowEdges?: Edge<any>[] | null,
    greenVertices?: Vertex<any>[] | null,
    greenEdges?: Edge<any>[] | null
}

// function dfsHelper(graph: Graph<any>, startVertex: Vertex<any>, 
//     visited: HashSet<Vertex<any>>, discovery: HashSet<Edge<any>>, animation: AnimationBuilder): void {

//     // TODO: record discovery edges.

//     // mark start as visited;
//     // animation.addFrame(visited.getSet(), startVertex, discovery.getSet());
//     visited.add(startVertex);
//     animation.addFrame(visited.getSet(), startVertex, discovery.getSet(), null);
//     // for each of start's outgoing edges:
//     for (let edge of graph.outgoingEdges(startVertex)) {
//         // if (other endpoint is not visited):
//         let opposite = graph.opposite(startVertex, edge);
//         if (!visited.contains(opposite)) {
//             // depthFirstSearch(other endpoint of edge);
//             discovery.add(edge);
//             animation.addFrame(visited.getSet(), startVertex, discovery.getSet(), graph.outgoingEdges(startVertex));
//             // display outgoing edges.
//             // set explorationEdge(edge)
//             // animation.addFrame(visited.getSet(), discoveryEdges.getSet(), graph.outgoingEdges(startVertex));
//             dfsHelper(graph, opposite, visited, discovery, animation);
//             animation.addFrame(visited.getSet(), startVertex, discovery.getSet(), null);
//         }
//     }  
// }

/*
One frame of DFS:
    actual graph: taken care of by Canvas ComponentDidUpdate

    start vertex: default is first inserted vertex, (todo:) can be changed through toolbar
    current vertex: the one dfs is called recursively on
    outgoing edges from current vertex: adjMap
    visited vertices: maintain a collection
    discovery edges: maintain a collection

*/
// export function iterativeDepthFirstSearch(graph: Graph<any>, startVertex: Vertex<any>): AnimationBuilder {
//     let visited = new HashSet<Vertex<any>>();
//     let discovery = new HashMap<Vertex<any>, Edge<any>>();
//     let animation = new AnimationBuilder();
//     let stack = new Stack<Vertex<any>>();

//     stack.push(startVertex);

//     while (!stack.isEmpty()) {
//         let u = stack.pop();

//         // animation.addFrame({ outlineVertices: [u], redVertices: visited.getSet(), redEdges: discovery.values() })
//         visited.add(u);
//         // animation.addFrame({ outlineVertices: [u], redVertices: visited.getSet(), redEdges: discovery.values() })

//         for (let edge of graph.outgoingEdges(u)) {
//             let v: Vertex<any> = graph.opposite(u, edge);
//             if (!visited.contains(v)) {
//                 discovery.put(v, edge);
//                 stack.push(v);
//             }
//         }
//     }
    
//     return animation;
// }
