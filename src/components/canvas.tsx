import React from 'react';
import './styles.css';

import Graph from '../graph/graph';
import Vertex from '../graph/vertex';
import Edge from '../graph/edge';
import { GraphAnimationFrame } from '../graph/algorithms';
import { colors } from '../utils/colors';

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
    
    public static readonly VERTEX_RADIUS: number = 10;
    // public static _WIDTH: number = 1280;
    // public static _HEIGHT: number = 640;
    public static readonly WIDTH: number = 1600;
    public static readonly HEIGHT: number = 800;

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
            
            let ctx = this.canvas.getContext('2d');

            if (ctx) {
                this.canvas.style.width = `${Canvas.WIDTH}px`;
                this.canvas.style.height = `${Canvas.HEIGHT}px`;

                let scale = window.devicePixelRatio;    

                this.canvas.width = Math.floor(Canvas.WIDTH * scale);
                this.canvas.height = Math.floor(Canvas.HEIGHT * scale);

                ctx.scale(scale, scale);

                this.drawGrid(ctx);

            }   
        }
    }

    componentDidUpdate() {
            
        let ctx = this.canvas!.getContext('2d');

        if (ctx) {

            this.drawGrid(ctx);

            const {
                // gridSize, 
                hoveringVertex, 
                hoveringEdge, 
                currentVertex, 
                graph,
                animationFrame } = this.props;

            let isDirected = graph.getIsDirected();
            let showPositions = graph.getShowPositions();
            let vertices = graph.vertices();
            let edges = graph.edges();

            // // color animation frame
            // if (this.props.animationFrame) {
            //     this.color(this.props.animationFrame);
            //     let { outlineVertices } = this.props.animationFrame;
            //     if (outlineVertices) {
            //         for (let vertex of outlineVertices) {
            //             let v = vertex.getPosition();
            //             this.drawCircle(
            //                 v[0] * gridSize, 
            //                 v[1] * gridSize,
            //                 Canvas.VERTEX_RADIUS + 2, 
            //                 colors.animBlue,
            //                 false,
            //                 ctx,
            //                 3
            //             );
            //         }
            //     }
            // }

            if (animationFrame) {
                this.colorFrame(animationFrame);
            }

            // edge set
            if (isDirected) {
                for (let edge of edges) {
                    this.drawDirectedEdge(edge, ctx);
                }
            } else {
                for (let edge of edges) {
                    this.drawUndirectedEdge(edge, ctx);
                }
            }     
            
            // hover edge
            if (hoveringEdge) {
                if (isDirected) {
                    // this.drawDirectedHoverEdge(hoveringEdge, ctx);
                    this.drawDirectedEdge(hoveringEdge, ctx);
                } else {
                    // this.drawUndirectedHoverEdge(hoveringEdge, ctx);
                    this.drawUndirectedEdge(hoveringEdge, ctx);
                }
            }

            // hover vertex
            if (hoveringVertex) {
                this.drawHoverVertex(hoveringVertex, ctx);
                if (showPositions) {
                    this.drawVertexPosition(hoveringVertex, ctx);
                }
            }

            // vertex set
            for (let vertex of vertices) {
                if (!vertex.equals(currentVertex)) {
                    this.drawGraphVertex(vertex, ctx);
                    // if (this.props.graph.getShowPositions()) {
                    //     this.drawVertexPosition(vertex);
                    // }
                }
            }

            // current active vertex
            if (currentVertex) {
                let old = currentVertex.getColor();
                currentVertex.setColor(colors.currentVertex);
                this.drawCurrentVertex(currentVertex, ctx);
                currentVertex.setColor(old);
                // if (this.props.graph.getShowPositions()) {
                //     this.drawVertexPosition(currentVertex);
                // }
                // how about an outline?
            }
        
            // weights 
            if (this.props.graph.getShowWeights()) {
                for (let edge of edges) {
                    this.drawEdgeWeight(edge, false, ctx);
                }
            }

            if (animationFrame) {
                this.unColorFrame(animationFrame);
            }

            // // deColor animation frame
            // if (this.props.animationFrame) {
            //     this.deColor(this.props.animationFrame);
            // }
        }
    }

    render() {
        return (
            // todo: fix height to accommodate for different displays
            <div className="canvas-container" style={{height: Canvas.HEIGHT + 50, backgroundColor: "#444444"}}>
                {this.constCanvasElement}
            </div>
        );
    }

    // drawing handlers
    drawGrid(ctx: CanvasRenderingContext2D): void {

        const { gridSize, nodeRadius } = this.props;

        if (ctx) {
            ctx.clearRect(0, 0, Canvas.WIDTH, Canvas.HEIGHT);
            
            ctx.fillStyle = colors.gridLines;
            ctx.strokeStyle = colors.gridLines;
            
            for (let i = 1; i < Canvas.WIDTH / gridSize; i++) {   
                for (let j = 1; j < Canvas.HEIGHT / gridSize; j++) {
                    
                    let xpos = i * gridSize;
                    let ypos = j * gridSize;
                    
                    ctx.beginPath();
                    ctx.moveTo(0, ypos);
                    ctx.lineTo(Canvas.WIDTH, ypos);
                    ctx.stroke();
            
                    ctx.beginPath();
                    ctx.moveTo(xpos, 0);
                    ctx.lineTo(xpos, Canvas.HEIGHT);
                    ctx.stroke();
        
                    ctx.beginPath();
                    ctx.arc(i * gridSize, j * gridSize, nodeRadius, 0, 2 * Math.PI);
                    ctx.fill();
                    
                }
            }
        }
        
    }

    drawCircle(x: number, y: number, r: number, color: string, fill = true, ctx: CanvasRenderingContext2D, lineWidth?: number): void {
        
        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI, true);
        
        if (fill) {
            ctx.fillStyle = color;
            ctx.fill();
        } else {
            if (lineWidth) {
                ctx.lineWidth = lineWidth;
            }
            ctx.strokeStyle = color;
            ctx.stroke();
        }

        ctx.restore();
    }

    drawVertex(v: Vertex<any>, ctx: CanvasRenderingContext2D): void {
        
        const pos: [number, number] = v.getPosition();
        const { gridSize } = this.props;
        
        this.drawCircle(
            pos[0] * gridSize,
            pos[1] * gridSize,
            Canvas.VERTEX_RADIUS,
            v.getColor(),
            true,
            ctx
        );
    }

    drawHoverVertex(v: Vertex<any>, ctx: CanvasRenderingContext2D) {
        this.drawVertex(v, ctx);
    }

    drawCurrentVertex(v: Vertex<any>, ctx: CanvasRenderingContext2D) {
        this.drawVertex(v, ctx);
    }

    drawGraphVertex(v: Vertex<any>, ctx: CanvasRenderingContext2D) {
        this.drawVertex(v, ctx);
    }

    drawVertexPosition(v: Vertex<any>, ctx: CanvasRenderingContext2D) {
        let pos = v.getPosition();
        let { gridSize } = this.props;
        let x = pos[0] * gridSize;
        let y = pos[1] * gridSize;

        ctx.save();

        ctx.translate(x, y);

        // ctx.strokeStyle = 'black';
        // ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        // ctx.strokeRect(-30, -30, 20, 20);
        // ctx.fillRect(-30, -30, 20, 20);

        // text   (todo: extract draw text method)
        let strPos = `(${pos[0]}, ${pos[1]})`;
        ctx.font = '18px serif';
        ctx.fillStyle = colors.vertexPosition;
        ctx.fillText(strPos, -(ctx.measureText(strPos).width + 10), -10);
        ctx.restore();

        ctx.restore();
    }

    drawUndirectedEdge(e: Edge<any>, ctx: CanvasRenderingContext2D): void {

        let start = e.start.getPosition();
        let end = e.end.getPosition();
        const { gridSize, nodeRadius } = this.props;

        ctx.save();
        ctx.strokeStyle = e.getColor();
        ctx.lineWidth = nodeRadius;
        ctx.beginPath();
        ctx.moveTo(start[0] * gridSize, start[1] * gridSize);
        ctx.lineTo(end[0] * gridSize, end[1] * gridSize);
        ctx.stroke();
        ctx.restore();
    }

    // drawUndirectedHoverEdge(e: Edge<any>, ctx: CanvasRenderingContext2D): void {
    //     // let c = 'rgba(255, 255, 255, 0.3)';
    //     this.drawUndirectedEdge(e, ctx);
    // }

    drawDirectedEdge(e: Edge<any>, ctx: CanvasRenderingContext2D): void {
        this.drawUndirectedEdge(e, ctx);
        this.drawEdgeArrow(e, ctx);
    }

    // drawDirectedHoverEdge(e: Edge<any>, ctx: CanvasRenderingContext2D): void {     // rectify alpha channel later.
    //     this.drawDirectedEdge(e, ctx);
    // }

    drawEdgeArrow(e: Edge<any>, ctx: CanvasRenderingContext2D) {
        let v1 = e.start.getPosition();
        let v2 = e.end.getPosition();

        let { gridSize } = this.props;
        let angle = Math.atan2(v2[1] - v1[1], v2[0] - v1[0]);
        let mag = 10;
        
        ctx.save();
        
        // if (color) {
        //     ctx.strokeStyle = ctx.fillStyle = color;
        // } else {
        //     ctx.strokeStyle = ctx.fillStyle = Canvas.COLORS.current_node_color;
        // }

        ctx.strokeStyle = ctx.fillStyle = e.getColor();

        ctx.translate(
            v2[0] * gridSize - this.props.nodeRadius * Math.cos(angle),
            v2[1] * gridSize - this.props.nodeRadius * Math.sin(angle)
        );

        ctx.rotate(angle);
        
        ctx.moveTo(-1.4 * mag, 0);
        ctx.lineTo(-2 * mag, 0.8 * mag);
        ctx.lineTo(0, 0);
        ctx.lineTo(-2 * mag, -0.8 * mag);
        ctx.lineTo(-1.4 * mag, 0);
        ctx.stroke();
        ctx.clip();
        ctx.fill();

        ctx.restore();
    }

    drawEdgeWeight(e: Edge<any>, round: boolean, ctx: CanvasRenderingContext2D) {

        let v1 = e.start.getPosition();
        let v2 = e.end.getPosition();
        let weight: string = e.getWeight().toString();
        ctx.save();
    
        ctx.translate(
            0.5 * (v2[0] + v1[0]) * this.props.gridSize,
            0.5 * (v2[1] + v1[1]) * this.props.gridSize
        );
        
        // container
        if (round) {
            this.drawCircle(0, 0, 15, colors.edgeWeightBackground, true, ctx);
            this.drawCircle(0, 0, 15, colors.edgeWeightBorder, false, ctx);
        } else {
            ctx.strokeStyle = colors.edgeWeightBorder;
            ctx.fillStyle = colors.edgeWeightBackground;
            ctx.strokeRect(-15, -15, 30, 30);
            ctx.fillRect(-15, -15, 30, 30);
        }

        // weight
        ctx.font = '18px serif';
        ctx.fillStyle = colors.edgeWeight;
        ctx.fillText(weight, -ctx.measureText(weight).width / 2, 6);
        ctx.restore();
    }

    colorEdges(edges: Edge<any>[], color: string) {
        for (let edge of edges) {
            edge.setColor(color);
        }

        if (!this.props.graph.getIsDirected()) {
            for (let edge of edges) {
                let reverseEdge = this.props.graph.getEdge(edge.getEnd(), edge.getStart());
                reverseEdge!.setColor(color);
            }
        }
    }
    
    colorVertices(vertices: Vertex<any>[], color: string) {
        for (let vertex of vertices) {
            vertex.setColor(color);
        }
    }
    
    colorFrame(frame: GraphAnimationFrame) {
        const { 
            redVertices, 
            yellowVertices, 
            greenVertices, 
            redEdges, 
            yellowEdges, 
            greenEdges } = frame;

        // const { graph } = this.props;

        if (redEdges) {
            this.colorEdges(redEdges, colors.animRed);
        }

        if (yellowEdges) {
            this.colorEdges(yellowEdges, colors.animYellow);
        }

        if (greenEdges) {
            this.colorEdges(greenEdges, colors.animGreen);
        }

        if (redVertices) {
            this.colorVertices(redVertices, colors.animRed);
        }

        if (yellowVertices) {
            this.colorVertices(yellowVertices, colors.animYellow);
        }

        if (greenVertices) {
            this.colorVertices(greenVertices, colors.animGreen);
        }
    }
    
    unColorFrame(frame: GraphAnimationFrame) {
        const { 
            redVertices, 
            yellowVertices, 
            greenVertices, 
            redEdges, 
            yellowEdges, 
            greenEdges } = frame;

        // const { graph } = this.props;

        if (redEdges) {
            this.colorEdges(redEdges, colors.graphEdge);
        }

        if (yellowEdges) {
            this.colorEdges(yellowEdges, colors.graphEdge);
        }

        if (greenEdges) {
            this.colorEdges(greenEdges, colors.graphEdge);
        }

        if (redVertices) {
            this.colorVertices(redVertices, colors.graphVertex);
        }

        if (yellowVertices) {
            this.colorVertices(yellowVertices, colors.graphVertex);
        }

        if (greenVertices) {
            this.colorVertices(greenVertices, colors.graphVertex);
        }
    }
}

export default Canvas;

// Notes:
/* 
Using offsetX and offsetY breaks when zooming in with trackpad. (Standard browser zooming works)
Disable toolbar UI during animations
*/