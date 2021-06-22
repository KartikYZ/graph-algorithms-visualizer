import React from 'react';
import './styles.css';

import Vertex from '../graph/vertex';
import Edge from '../graph/edge';

const grid_shade = 190;
const hover_shade = 190;

interface Props {
    gridSize: number,
    nodeRadius: number,
}

interface State {
    hoverVertexInPixels: number[] | null;
}

interface GridState {
    cursor: [number, number],
    nearestVertexInPixels: [number, number],
    isHoveringOverVertex: boolean
}

class Canvas extends React.Component<Props, State> {

    public static defaultProps = {
        nodeRadius: 5
    }

    private canvasRef: React.RefObject<HTMLCanvasElement>;
    private canvas: HTMLCanvasElement | null;
    
    private gridState: GridState;
    private static WIDTH: number = 1600;
    private static HEIGHT: number = 800;
    private static HOVER_RADIUS: number = 10;

    private static COLORS = {
        grid_color: `rgba(${grid_shade}, ${grid_shade}, ${grid_shade})`,
        node_hover_color: `rgba(${hover_shade}, ${hover_shade}, ${hover_shade}, 0.5)`,
        active_node_color: 'rgba(50, 100, 168, 0.7)',
        current_node_color: 'rgba(98, 217, 131, 0.5)',
        inactive_node_color: `rgba(${hover_shade}, ${hover_shade}, ${hover_shade}, 0.7)`,
        edge_hover_color: 'rgba(50, 100, 168, 0.5)',
        default_edge_color: 'rgba(50, 100, 168, 1)',
    }

    constructor(props: Props) {
        super(props);

        this.canvasRef = React.createRef<HTMLCanvasElement>();
        this.canvas = null;

        this.state = {
            hoverVertexInPixels: null
        }

        this.gridState = {
            cursor: [-1, -1],
            nearestVertexInPixels: [-1, -1],
            isHoveringOverVertex: false
        }
    }

    // lifecycle methods
    componentDidMount() {

        this.canvas = this.canvasRef.current;
        
        if (this.canvas) {
            
            this.context = this.canvas.getContext('2d');

            if (this.context) {
                this.canvas.style.width = `${Canvas.WIDTH}px`;
                this.canvas.style.height = `${Canvas.HEIGHT}px`;

                let scale = window.devicePixelRatio;    

                this.canvas.width = Math.floor(Canvas.WIDTH * scale);
                this.canvas.height = Math.floor(Canvas.HEIGHT * scale);

                this.context.scale(scale, scale);

                this.drawGrid();

            }
            
        }

    }

    componentDidUpdate() {
            
        this.context = this.canvas!.getContext('2d');

        if (this.context) {
            this.drawGrid();
        }
    }

    // event listeners
    handleMouseMove(event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
        
        this.gridState.cursor = [event.nativeEvent.offsetX, event.nativeEvent.offsetY];
        
        if (this.inVertexRadius(this.gridState.cursor)) {
            if (!this.gridState.isHoveringOverVertex) {
                this.gridState.isHoveringOverVertex = true;
                this.drawCircle(...this.gridState.nearestVertexInPixels, Canvas.HOVER_RADIUS, Canvas.COLORS.node_hover_color, true);
            }
        } else {
            if (this.gridState.isHoveringOverVertex) {
                this.gridState.isHoveringOverVertex = false;
            }
            this.drawGrid();
        }
    }

    handleClick(event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
        
    }

    render() {
        return (
            <div className="canvas-container">
                <canvas 
                    id="canvas" 
                    ref={this.canvasRef} 
                    onMouseMove={(event) => this.handleMouseMove(event)}
                    onClick={(event) => this.handleClick(event)}
                />
            </div>
        );
    }

    // drawing handlers
    drawGrid(): void {

        const { gridSize, nodeRadius } = this.props;
        
        this.context.clearRect(0, 0, Canvas.WIDTH, Canvas.HEIGHT);
        this.context.strokeStyle = Canvas.COLORS.grid_color;
        this.context.fillStyle = Canvas.COLORS.inactive_node_color;
        
        for (let i = 1; i < Canvas.WIDTH / gridSize; i++) {   
            for (let j = 1; j < Canvas.HEIGHT / gridSize; j++) {
                
                let xpos = i * gridSize;
                let ypos = j * gridSize;
                
                this.context.beginPath();
                this.context.moveTo(0, ypos);
                this.context.lineTo(Canvas.WIDTH, ypos);
                this.context.stroke();
        
                this.context.beginPath();
                this.context.moveTo(xpos, 0);
                this.context.lineTo(xpos, Canvas.HEIGHT);
                this.context.stroke();
    
                this.context.beginPath();
                this.context.arc(i * gridSize, j * gridSize, nodeRadius, 0, 2 * Math.PI);
                this.context.fill();
                
            }
        }
    }

    drawCircle(x: number, y: number, r: number, color: string, fill = true): void {
        // console.log(x, y, r, color, fill, context);

        this.context.save();
        this.context.beginPath();
        this.context.arc(x, y, r, 0, 2 * Math.PI, true);
        
        if (fill) {
            this.context.fillStyle = color;
            this.context.fill();
        } else {
            this.context.strokeStyle = color;
            this.context.stroke();
        }
        this.context.restore();
    }

    drawVertex(v: Vertex<any>): void {
        this.drawCircle(
            v.getPosition()[0] * this.props.gridSize,
            v.getPosition()[1] * this.props.gridSize,
            this.props.nodeRadius,
            Canvas.COLORS.active_node_color,
            true
        );
    }

    drawUndirectedEdge(e: Edge<any>): void {
        let start = e.start.getPosition();
        let end = e.start.getPosition();
        const { gridSize } = this.props;

        this.context.save();
        this.context.strokeStyle = Canvas.COLORS.default_edge_color;
        this.context.lineWidth = this.props.nodeRadius - 3;
        this.context.beginPath();
        this.context.moveTo(start[0] * gridSize, start[1] * gridSize);
        this.context.lineTo(end[0] * gridSize, end[1] * gridSize);
        this.context.stroke();
        this.context.restore();
    }

    drawDirectedEdge(e: Edge<any>): void {

    }

    // utility methods

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

export default Canvas;

// Notes:
/* 
Abstract canvas array, separate logic and drawing between two components.
Use setState to trigger rerenders.

*/