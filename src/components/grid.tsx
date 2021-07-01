import React from 'react';
import Canvas from './canvas';

import Vertex from '../graph/vertex';
import Edge from '../graph/edge';
import Graph from '../graph/graph'
import { GraphAnimationFrame } from '../graph/algorithms';

interface Props {
    gridSize: number,
    nodeRadius: number,
    graph: Graph<any>,
    isAnimating: boolean,
    animationFrame: GraphAnimationFrame | null;
}

interface State {
    hoveringVertex: Vertex<any> | null,
    currentVertex: Vertex<any> | null,
    hoveringEdge: Edge<any> | null,
    graph: Graph<any>
}

interface GridState {
    cursor: [number, number],
    nearestVertexInPixels: [number, number],
}

class Grid extends React.Component<Props, State> {

    private gridState: GridState;

    constructor(props: Props) {
        super(props);

        let graph = this.props.graph

        this.state = {
            hoveringVertex: null,
            currentVertex: null,
            hoveringEdge: null,
            graph: graph,
        }

        this.gridState = {
            cursor: [-1, -1],
            nearestVertexInPixels: [-1, -1],
        }
    }

    handleClick(event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {

        if (this.props.isAnimating) {
            return;
        }

        if (this.state.hoveringVertex) {
            if (this.state.hoveringVertex.equals(this.state.currentVertex)) {
                this.setState({
                    currentVertex: null,
                    hoveringEdge: null
                });
            } else {
                if (this.state.hoveringEdge) {
                    if (!this.state.graph.edgeSet.contains(this.state.hoveringEdge)) {
                        this.state.graph.insertEdge(this.state.hoveringEdge);
                    } else {
                        this.state.graph.removeEdge(this.state.hoveringEdge);
                    }
                }

                this.setState({
                    currentVertex: this.state.hoveringVertex,
                    hoveringEdge: null
                });
            }

            if (!this.state.graph.vertexSet.contains(this.state.hoveringVertex)) {
                this.state.graph.insertVertex(this.state.hoveringVertex);
            }
        }
    }

    handleRightClick(event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
        
        event.preventDefault();

        if (this.props.isAnimating) {
            return;
        }

        if (this.state.hoveringVertex) {
            if (this.state.graph.vertexSet.contains(this.state.hoveringVertex)) {
                this.state.graph.removeVertex(this.state.hoveringVertex);
                this.setState({
                    currentVertex: null,
                    hoveringEdge: null
                });
            }
        }
    }

    handleMouseMove(event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {

        if (this.props.isAnimating) {
            return;
        }

        // console.log(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
        let prevNearestVertexInPixels = this.gridState.nearestVertexInPixels;   // keek track of Vertex object instead of tuple.
        this.gridState.cursor = [event.nativeEvent.offsetX, event.nativeEvent.offsetY];

        if (this.nearestVertexInPixels(this.gridState.cursor)[0] !== prevNearestVertexInPixels[0] || 
            this.nearestVertexInPixels(this.gridState.cursor)[1] !== prevNearestVertexInPixels[1]) {
                this.gridState.nearestVertexInPixels = this.nearestVertexInPixels(this.gridState.cursor);

                if (this.state.currentVertex) {
                    let hoveringEdge = new Edge(this.state.currentVertex, this.PixelsToVertex(this.gridState.nearestVertexInPixels), 0);
                    this.setState({
                        hoveringEdge: hoveringEdge
                    });
                }
            }
        
        if (this.inVertexRadius(this.gridState.cursor)) {
    
            if (!this.state.hoveringVertex) {
                this.setState({
                    hoveringVertex: this.PixelsToVertex(this.gridState.nearestVertexInPixels)
                });
            }

        } else {
            
            if (this.state.hoveringVertex) {
                this.setState({
                    hoveringVertex: null
                });
            }
        }

    }

    render() {
        return (<Canvas 
          gridSize={this.props.gridSize}    // alternative: {...this.props}
          nodeRadius={this.props.nodeRadius}
          hoveringVertex={this.state.hoveringVertex}
          hoveringEdge={this.state.hoveringEdge}
          currentVertex={this.state.currentVertex}
          graph={this.state.graph}
          animationFrame={this.props.animationFrame}

          onClick={(event) => this.handleClick(event)}
          handleRightClick={(event) => this.handleRightClick(event)}
          onMouseMove={(event) => this.handleMouseMove(event)}
        />);
    }

    // utility methods

    PixelsToVertex(point: [number, number]): Vertex<any> {
        let vertexPoint = point.map((val) => val / this.props.gridSize);
        return new Vertex([vertexPoint[0], vertexPoint[1]]);
    }

    /**
     * 
     * @param cursor size 2 array where cursor[0] = cursorX, cursor[1] = cursorY; pixel position on canvas element.
     * @returns pixel position of nearest vertex relative to cursor position on grid as size 2 array.
     */
     nearestVertexInPixels(cursor: [number, number]): [number, number] {
        
        const { gridSize } = this.props;
        let nearest: number[] = cursor.map((val) => Math.round(val / gridSize) * gridSize)
        let nearestPixelNode: [number, number] = [nearest[0], nearest[1]];
        
        switch (nearestPixelNode[0]) {
            case 0:
                nearestPixelNode[0] += gridSize;
                break;
            case Canvas.WIDTH:
                nearestPixelNode[0] -= gridSize;
                break;
            default:
                break;
        }

        switch (nearestPixelNode[1]) {
            case 0:
                nearestPixelNode[1] += gridSize;
                break;
            case Canvas.HEIGHT:
                nearestPixelNode[1] -= gridSize;
                break;
            default:
                break;
        }

        return nearestPixelNode;
    }

    inVertexRadius(cursor: [number, number]): boolean {
        let nearestVertex: [number, number] = this.nearestVertexInPixels(cursor);
        // this.gridState.nearestVertexInPixels = nearestVertex;
        if (nearestVertex[0] > 0 && nearestVertex[0] < Canvas.WIDTH && nearestVertex[1] > 0 && nearestVertex[1] < Canvas.HEIGHT) {
            return this.euclideanDist(cursor, nearestVertex) < Canvas.VERTEX_RADIUS; // and with conditional to assign isHovering directly here. This will cause redundant renders.
        }
        return false;
    }

    euclideanDist(p1: number[], p2: number[]) {
        return Math.sqrt((p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2);
    }

}

export default Grid;