import React from 'react';
import './styles.css';

import Graph from '../graph/graph';
import Vertex from '../graph/vertex';
import Edge from '../graph/edge';
import { GraphAnimationFrame } from '../graph/algorithms';

const grid_shade = 190;
const hover_shade = 190;

interface Props {
    gridSize: number,
    nodeRadius: number,
    hoveringVertex: Vertex<any> | null,
    hoveringEdge: Edge<any> | null,
    currentVertex: Vertex<any> | null,
    graph: Graph<any>,
    animationFrame: GraphAnimationFrame | null;

    onClick: (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void,
    handleRightClick: (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void,
    onMouseMove: (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void
}

class Canvas extends React.Component<Props> {

    public static defaultProps = {
        nodeRadius: 5
    }

    private canvasRef: React.RefObject<HTMLCanvasElement>;
    private canvas: HTMLCanvasElement | null;
    private constCanvasElement: any;
    
    public static VERTEX_RADIUS: number = 10;
    // public static _WIDTH: number = 1280;
    // public static _HEIGHT: number = 640;
    public static WIDTH: number = 1600;
    public static HEIGHT: number = 800;

    private static COLORS = {
        grid_color: `rgba(${grid_shade}, ${grid_shade}, ${grid_shade})`,
        node_hover_color: `rgba(${hover_shade}, ${hover_shade}, ${hover_shade}, 0.5)`,
        // active_node_color: 'rgba(50, 100, 168, 0.7)',
        active_node_color: 'rgba(255, 255, 255, 0.3)',
        // current_node_color: 'rgba(98, 217, 131, 0.5)',
        current_node_color: 'rgba(255, 255, 255, 0.7)',
        inactive_node_color: `rgba(${hover_shade}, ${hover_shade}, ${hover_shade}, 0.7)`,
        edge_hover_color: 'rgba(50, 100, 168, 0.5)',
        default_edge_color: 'rgba(50, 100, 168, 1)',
    }

    constructor(props: Props) {
        super(props);

        this.canvasRef = React.createRef<HTMLCanvasElement>();
        this.canvas = null;

        // Dan Abramov on SO: a constant element tells React to never rerender.
        this.constCanvasElement = <canvas
            id="canvas" 
            ref={this.canvasRef} 
            onClick={this.props.onClick}
            onContextMenu={this.props.handleRightClick}
            onMouseMove={this.props.onMouseMove}
        />      
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

            const { 
                hoveringVertex, 
                hoveringEdge, 
                currentVertex, 
                graph } = this.props;

            let vertices = graph.vertices();
            let edges = graph.edges();

            // hover vertex
            if (hoveringVertex) {
                this.drawHoverVertex(hoveringVertex);
                if (this.props.graph.getShowPositions()) {
                    this.drawVertexPosition(hoveringVertex);
                }
            }

            // vertex set
            for (let vertex of vertices) {
                if (!vertex.equals(currentVertex)) {
                    this.drawGraphVertex(vertex);
                    // if (this.props.graph.getShowPositions()) {
                    //     this.drawVertexPosition(vertex);
                    // }
                }
                
            }

            // current active vertex
            if (currentVertex) {
                this.drawCurrentVertex(currentVertex);
                // if (this.props.graph.getShowPositions()) {
                //     this.drawVertexPosition(currentVertex);
                // }
                // how about an outline?
            }

            // // hover edge
            // if (hoveringEdge) {
            //     // this.drawUndirectedHoverEdge(this.props.hoveringEdge);
            //     if (this.props.graph.getIsDirected()) {
            //         this.drawDirectedHoverEdge(hoveringEdge);
            //     } else {
            //         this.drawUndirectedHoverEdge(hoveringEdge);
            //     }
            // }

            // edge set
            if (this.props.graph.getIsDirected()) {     // todo: call getter once per update
                for (let edge of edges) {
                    this.drawDirectedEdge(edge);
                }
            } else {
                for (let edge of edges) {
                    this.drawUndirectedEdge(edge);
                }
            }     
            
            // hover edge
            if (hoveringEdge) {
                // this.drawUndirectedHoverEdge(this.props.hoveringEdge);
                if (this.props.graph.getIsDirected()) {
                    this.drawDirectedHoverEdge(hoveringEdge);
                } else {
                    this.drawUndirectedHoverEdge(hoveringEdge);
                }
            }

            // animation frame
            if (this.props.animationFrame) {
                // for (let vertex of this.props.animationFrame) {
                //     this.drawVertex(vertex, 'rgba(252, 77, 61, 0.8)');
                // }
                let color = 'rgba(252, 77, 61, 0.8)';
                let frame = this.props.animationFrame;
                for (let vertex of frame.visitedVertices) {
                    this.drawVertex(vertex, color);
                }

                color = 'rgba(134, 186, 235, 0.8)';
                let v = this.props.animationFrame.currentVertex.getPosition();
                this.drawCircle(
                    v[0] * this.props.gridSize, 
                    v[1] * this.props.gridSize,
                    Canvas.VERTEX_RADIUS + 2, 
                    color,
                    false,
                    3
                );

                // for (let edge of frame.visitedEdges) {
                //     if (this.props.graph.getIsDirected()) {
                //         this.drawDirectedEdge(edge, color);
                //     } else {
                //         this.drawUndirectedEdge(edge, color);
                //     }
                // }

                // for (let outgoingEdge of frame.outgoingEdges) {
                //     if (this.props.graph.getIsDirected()) {
                //         this.drawDirectedEdge(outgoingEdge, color);
                //     } else {
                //         this.drawUndirectedEdge(outgoingEdge, color);
                //     }
                // }
            }

            // weights 

            if (this.props.graph.getShowWeights()) {
                for (let edge of edges) {
                    this.drawEdgeWeight(edge);
                }
            }
        }
    }

    render() {
        return (
            <div className="canvas-container">
                {this.constCanvasElement}
            </div>
        );
    }

    // drawing handlers
    drawGrid(): void {

        const { gridSize, nodeRadius } = this.props;
        
        // this.context.clearRect(0, 0, Canvas.WIDTH, Canvas.HEIGHT);
        // this.context.fillStyle = 'rgba(0, 0, 0, 1)';
        this.context.fillStyle = '#444444';
        this.context.fillRect(0, 0, Canvas.WIDTH, Canvas.HEIGHT);
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

    drawCircle(x: number, y: number, r: number, color: string, fill = true, lineWidth?: number): void {
        
        this.context.save();
        this.context.beginPath();
        this.context.arc(x, y, r, 0, 2 * Math.PI, true);
        
        if (fill) {
            this.context.fillStyle = color;
            this.context.fill();
        } else {
            if (lineWidth) {
                this.context.lineWidth = lineWidth;
            }
            this.context.strokeStyle = color;
            this.context.stroke();
        }

        this.context.restore();
    }

    drawVertex(v: Vertex<any>, color: string): void {
        
        const pos: [number, number] = v.getPosition();
        const { gridSize } = this.props;
        
        this.drawCircle(
            pos[0] * gridSize,
            pos[1] * gridSize,
            Canvas.VERTEX_RADIUS,
            color,
            true
        );
    }

    drawHoverVertex(v: Vertex<any>) {
        this.drawVertex(v, Canvas.COLORS.node_hover_color);
    }

    drawCurrentVertex(v: Vertex<any>) {
        this.drawVertex(v, Canvas.COLORS.current_node_color);
    }

    drawGraphVertex(v: Vertex<any>) {
        this.drawVertex(v, Canvas.COLORS.active_node_color);
    }

    drawVertexPosition(v: Vertex<any>) {
        let pos = v.getPosition();
        let { gridSize } = this.props;
        let x = pos[0] * gridSize;
        let y = pos[1] * gridSize;

        this.context.save();

        this.context.translate(x, y);

        // this.context.strokeStyle = 'black';
        // this.context.fillStyle = 'rgba(0, 0, 0, 0.5)';
        // this.context.strokeRect(-30, -30, 20, 20);
        // this.context.fillRect(-30, -30, 20, 20);

        // text   (todo: extract draw text method)
        let strPos = `(${pos[0]}, ${pos[1]})`;
        this.context.font = '18px serif';
        this.context.fillStyle = 'rgba(255, 255, 0, 0.9)';
        this.context.fillText(strPos, -(this.context.measureText(strPos).width + 10), -10);
        this.context.restore();

        this.context.restore();
    }

    drawUndirectedEdge(e: Edge<any>, color: string = 'rgba(255, 255, 255, 0.7)'): void {

        let start = e.start.getPosition();
        let end = e.end.getPosition();
        const { gridSize, nodeRadius } = this.props;

        this.context.save();
        this.context.strokeStyle = color;
        this.context.lineWidth = nodeRadius;
        this.context.beginPath();
        this.context.moveTo(start[0] * gridSize, start[1] * gridSize);
        this.context.lineTo(end[0] * gridSize, end[1] * gridSize);
        this.context.stroke();
        this.context.restore();
    }

    drawUndirectedHoverEdge(e: Edge<any>): void {
        let color = 'rgba(255, 255, 255, 0.3)';
        this.drawUndirectedEdge(e, color);
    }

    drawDirectedEdge(e: Edge<any>, color?: string): void {
        if (color) {
            this.drawUndirectedEdge(e, color);
            this.drawEdgeArrow(e, color);
        } else {
            this.drawUndirectedEdge(e);
            this.drawEdgeArrow(e);
        }
    }

    drawDirectedHoverEdge(e: Edge<any>): void {     // rectify alpha channel later.
        let color = 'rgba(255, 255, 255, 0.3)'
        this.drawDirectedEdge(e, color);
    }

    drawEdgeArrow(e: Edge<any>, color?: string) {
        let v1 = e.start.getPosition();
        let v2 = e.end.getPosition();

        let { gridSize } = this.props;
        let angle = Math.atan2(v2[1] - v1[1], v2[0] - v1[0]);
        let mag = 10;
        
        this.context.save();
        
        if (color) {
            this.context.strokeStyle = this.context.fillStyle = color;
        } else {
            this.context.strokeStyle = this.context.fillStyle = Canvas.COLORS.current_node_color;
        }

        this.context.translate(
            v2[0] * gridSize - this.props.nodeRadius * Math.cos(angle),
            v2[1] * gridSize - this.props.nodeRadius * Math.sin(angle)
        );

        this.context.rotate(angle);
        
        this.context.moveTo(-1.4 * mag, 0);
        this.context.lineTo(-2 * mag, 0.8 * mag);
        this.context.lineTo(0, 0);
        this.context.lineTo(-2 * mag, -0.8 * mag);
        this.context.lineTo(-1.4 * mag, 0);
        this.context.stroke();
        this.context.clip();
        this.context.fill();

        this.context.restore();
    }

    drawEdgeWeight(e: Edge<any>, round: boolean = false) {

        let v1 = e.start.getPosition();
        let v2 = e.end.getPosition();
        let weight: string = e.getWeight().toString();
        this.context.save();
    
        this.context.translate(
            0.5 * (v2[0] + v1[0]) * this.props.gridSize,
            0.5 * (v2[1] + v1[1]) * this.props.gridSize
        );
        
        // container
        if (round) {
            this.drawCircle(0, 0, 15, 'rgba(255, 255, 255, 0.8)', true);
            this.drawCircle(0, 0, 15, 'black', false);
        } else {
            this.context.strokeStyle = 'black';
            this.context.fillStyle = 'rgba(255, 255, 255, 0.8)';
            this.context.strokeRect(-15, -15, 30, 30);
            this.context.fillRect(-15, -15, 30, 30);
        }

        // weight
        this.context.font = '18px serif';
        this.context.fillStyle = 'black';
        this.context.fillText(weight, -this.context.measureText(weight).width / 2, 6);
        this.context.restore();
    }
}

export default Canvas;

// Notes:
/* 

Abstract canvas array, separate logic and drawing between two components > done
Use setState to trigger rerenders > done
Prevent the canvas element itself from rerendering. > done
Using offsetX and offsetY breaks when zooming in with trackpad. (Standard browser zooming works)

*/