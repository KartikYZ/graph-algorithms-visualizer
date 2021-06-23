import React from 'react';
import Canvas from './canvas';

import Vertex from '../graph/vertex';

interface Props {
    gridSize: number,
    nodeRadius: number
}

interface State {
    hoveringVertex: Vertex<any> | null,
    currentVertex: Vertex<any> | null
}

interface GridState {
    cursor: [number, number],
    nearestVertexInPixels: [number, number],
    // isHoveringOverVertex: boolean
}

class Grid extends React.Component<Props, State> {

    private gridState: GridState;

    constructor(props: Props) {
        super(props);
        this.state = {
            hoveringVertex: null,
            currentVertex: null
        }

        this.gridState = {
            cursor: [-1, -1],
            nearestVertexInPixels: [-1, -1],
            // isHoveringOverVertex: false
        }
    }   

    handleClick(event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
        console.log('clicked!');

        if (this.state.hoveringVertex) {
            if (this.state.hoveringVertex.equals(this.state.currentVertex)) {
                this.setState({
                    currentVertex: null
                });
            } else {
                this.setState({
                    currentVertex: this.state.hoveringVertex
                });
            }
        }
    }

    handleMouseMove(event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
        // console.log(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
        this.gridState.cursor = [event.nativeEvent.offsetX, event.nativeEvent.offsetY];
        
        if (this.inVertexRadius(this.gridState.cursor)) {
    
            if (!this.state.hoveringVertex) {
                this.setState({
                    hoveringVertex: this.PixelsToVertex(this.nearestVertexInPixels(this.gridState.cursor))
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
          currentVertex={this.state.currentVertex}
          onClick={(event) => this.handleClick(event)}
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
        this.gridState.nearestVertexInPixels = nearestVertex;
        if (nearestVertex[0] > 0 && nearestVertex[0] < Canvas.WIDTH && nearestVertex[1] > 0 && nearestVertex[1] < Canvas.HEIGHT) {
            return this.euclideanDist(cursor, nearestVertex) < Canvas.HOVER_RADIUS; // and with conditional to assign isHovering directly here. This will cause redundant renders.
        }
        return false;
    }

    euclideanDist(p1: number[], p2: number[]) {
        return Math.sqrt((p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2);
    }

}

export default Grid;