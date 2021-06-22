import React from 'react';
import './styles.css';

const grid_shade = 190;
const hover_shade = 190;

interface Props {
    gridSize: number,
    nodeRadius: number,
}

interface State {
    
}

class Canvas extends React.Component<Props, State> {

    public static defaultProps = {
        nodeRadius: 5
    }

    private canvasRef: React.RefObject<HTMLCanvasElement>;
    private canvas: HTMLCanvasElement | null;
    
    private static WIDTH: number = 1600;
    private static HEIGHT: number = 800;

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
        // console.log(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
    }

    render() {
        return (
            <div className="canvas-container">
                <canvas 
                    id="canvas" 
                    ref={this.canvasRef} 
                    onMouseMove={(event) => this.handleMouseMove(event)}
                />
            </div>
        );
    }

    // drawing handlers
    drawGrid() {
        
        this.context.clearRect(0, 0, Canvas.WIDTH, Canvas.HEIGHT);
        
        this.context.strokeStyle = Canvas.COLORS.grid_color;
        this.context.fillStyle = Canvas.COLORS.inactive_node_color;
        
        const NODE_RADIUS = this.props.nodeRadius;
        const GRID_SIZE = this.props.gridSize;
        
        for (let i = 1; i < Canvas.WIDTH / GRID_SIZE; i++) {   
            for (let j = 1; j < Canvas.HEIGHT / GRID_SIZE; j++) {
                
                let xpos = i * GRID_SIZE;
                let ypos = j * GRID_SIZE;
                
                this.context.beginPath();
                this.context.moveTo(0, ypos);
                this.context.lineTo(Canvas.WIDTH, ypos);
                this.context.stroke();
        
                this.context.beginPath();
                this.context.moveTo(xpos, 0);
                this.context.lineTo(xpos, Canvas.HEIGHT);
                this.context.stroke();
    
                this.context.beginPath();
                this.context.arc(i * GRID_SIZE, j * GRID_SIZE, NODE_RADIUS, 0, 2 * Math.PI);
                this.context.fill();
                
            }
        }
    }

    
}



export default Canvas;