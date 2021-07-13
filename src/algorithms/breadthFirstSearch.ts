import Graph from '../graph/graph';
import Vertex from '../graph/vertex';
import Edge from '../graph/edge';

import { AnimationBuilder } from '../animationBuilder';

import HashSet from '../data_structures/hashSet';
import Queue from '../data_structures/queue';

function breadthFirstSearch(graph: Graph<any>, startVertex: Vertex<any>): AnimationBuilder {

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

export default breadthFirstSearch;