import Graph from '../graph/graph';
import Vertex from '../graph/vertex';
import Edge from '../graph/edge';

import { AnimationBuilder } from '../animationBuilder';

import HashSet from '../data_structures/hashSet';
import HashMap from '../data_structures/hashMap';

function depthFirstSearch(graph: Graph<any>, startVertex: Vertex<any>): AnimationBuilder {
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

export default depthFirstSearch;