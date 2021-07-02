import React from 'react';
import './App.css';

import Toolbar from './components/toolbar';
import Grid from './components/grid';
import Graph from './graph/graph';
import { recursiveDepthFirstSearch, breadthFirstSearch, AnimationBuilder, GraphAnimationFrame } from './graph/algorithms';
import Vertex from './graph/vertex';
import Edge from './graph/edge';
import { getRandomBoolean, getRandomInt } from './utils/rng';

interface Props {

}

interface State {
    gridSize: number,
    animationSpeed: number
    graph: Graph<any>,
    isAnimating: boolean,
    animationFrame: GraphAnimationFrame | null,
    algorithm: string
}

interface IDAlgorithmMap {
    [key: string]: (graph: Graph<any>, startVertex: Vertex<any>) => AnimationBuilder
}

class App extends React.Component<Props, State> {

  // private gridSizeValues: number[] = [100, 80, 40, 32, 25, 20, 16];
    private gridSizeValues: number[] = [100, 80, 40];
    private animationSpeeds: number[] = [2000, 1000, 500, 400, 200, 100, 50, 20];
    private algorithms: IDAlgorithmMap;

    constructor(props: Props) {
        super(props);

        this.onDirected = this.onDirected.bind(this);
        this.onShowWeights = this.onShowWeights.bind(this);
        this.onShowPositions = this.onShowPositions.bind(this);
        this.onGridSizeChange = this.onGridSizeChange.bind(this);
        this.onGenerateGrid = this.onGenerateGrid.bind(this);
        this.onGenerateRandom = this.onGenerateRandom.bind(this);
        this.onClear = this.onClear.bind(this);
        this.onSelection = this.onSelection.bind(this);
        this.onAnimationSpeedChange = this.onAnimationSpeedChange.bind(this);
        this.onStart = this.onStart.bind(this);

        this.algorithms = {
            'dfs': recursiveDepthFirstSearch,
            'bfs': breadthFirstSearch
        }

        this.state = {
            gridSize: 0,
            animationSpeed: 2,
            graph: new Graph(false, false, false),
            isAnimating: false,
            animationFrame: null,
            algorithm: Object.keys(this.algorithms)[0]
        }    
    }

    onDirected(directedEdges: boolean) {
        this.state.graph.setIsDirected(directedEdges);
        this.setState({});
    }

    onShowWeights(showWeights: boolean) {
        this.state.graph.setShowWeights(showWeights);
        this.setState({});
    }

    onShowPositions(showPositions: boolean) {
        this.state.graph.setShowPositions(showPositions);
        this.setState({});
    }

    onGridSizeChange(sliderValue: number) {
        this.setState({gridSize: sliderValue});
    }

    onGenerateRandom() {
        let gridSize = this.gridSizeValues[this.state.gridSize];    // todo: state holds gridSize rather than index
        let hdivs: number = 1600 / gridSize;
        let vdivs: number = 800 / gridSize;

        this.state.graph.clear();

        let xstep = [1, 2, 3, 4][getRandomInt(0, 3)];
        let ystep = [1, 2, 3, 4][getRandomInt(0, 3)];

        for (let y = 1; y < vdivs; y += ystep) {
            for (let x = 1; x < hdivs; x += xstep) {
                if (getRandomBoolean() && getRandomBoolean()) {
                    this.state.graph.insertVertex(new Vertex([x, y]));
                }
                
            }
        }

        for (let u of this.state.graph.vertices()) {
            for (let v of this.state.graph.vertices()) {
                if (getRandomBoolean() && getRandomBoolean() && getRandomBoolean() && !u.equals(v)) {
                    this.state.graph.insertEdge(new Edge(u, v));
                }
            }
        }

        this.setState({});

    }

    onGenerateGrid() {
        let gridSize = this.gridSizeValues[this.state.gridSize];
        let hdivs: number = 1600 / gridSize;
        let vdivs: number = 800 / gridSize;

        this.state.graph.clear();

        for (let y = 1; y < vdivs; y++) {
            for (let x = 1; x < hdivs; x++) {
                // this.state.graph.insertVertex(new Vertex([x, y]));
                let s = new Vertex([x, y]);
                let r = new Vertex([x + 1, y]);
                let d = new Vertex([x, y + 1]);
                let right = new Edge(s, r);
                let down = new Edge(s, d);
                if (x !== hdivs - 1) {
                    this.state.graph.insertEdge(right);
                }

                if (y !== vdivs - 1)  {
                    this.state.graph.insertEdge(down);
                }
            }
        }

        this.setState({});
    }

    onClear() {
        this.state.graph.clear();
        this.setState({});
    }

    onSelection(option: string) {
        this.setState({ algorithm: option })
    }

    onAnimationSpeedChange(sliderValue: number) {
        this.setState({ animationSpeed: sliderValue });
    }

    onStart() {

        let intervalDelay = this.animationSpeeds[this.state.animationSpeed];

        if (this.state.graph.vertices().length === 0) {
            return;
        }

        this.setState({isAnimating: true});

        let frames = this.algorithms[this.state.algorithm](this.state.graph, this.state.graph.vertices()[0]).getFrames();

        for (let i = 0; i < frames.length; i++) {
            setTimeout(() => {
                this.setState({
                    animationFrame: frames[i]
                });
            }, (i + 1) * intervalDelay);
        }

        // use requestAnimationFrame or recursive setTimout.
        setTimeout(() => {this.setState({isAnimating: false, animationFrame: null})}, ((frames.length + 1) * intervalDelay) + 3000);
    }

    render() {
        return (
            <React.Fragment>
                <Toolbar 
                    gridSizeSliderProps={{
                        label: 'Grid Size',
                        sliderLength: this.gridSizeValues.length,
                        sliderValue: this.state.gridSize, 
                        onSliderChange: this.onGridSizeChange
                    }}
                    animationSpeedSliderProps={{
                        label: 'Animation Speed',
                        sliderLength: this.animationSpeeds.length,
                        sliderValue: this.state.animationSpeed, 
                        onSliderChange: this.onAnimationSpeedChange
                    }}
                    startButtonProps={{
                        options: Object.keys(this.algorithms),
                        onStart: this.onStart,
                        onSelection: this.onSelection
                    }}
                    graphProps={{
                        onSelectDirectedEdges: this.onDirected,
                        onSelectShowWeights: this.onShowWeights,
                        onSelectShowVertexPositions: this.onShowPositions,
                        onGenerateGrid: this.onGenerateGrid,
                        onGenerateRandom: this.onGenerateRandom,
                        onClear: this.onClear,
                    }}
                />
                <Grid 
                    gridSize={this.gridSizeValues[this.state.gridSize]} 
                    nodeRadius={5 - this.state.gridSize}
                    graph={this.state.graph}
                    isAnimating={this.state.isAnimating}
                    animationFrame={this.state.animationFrame}
                />
            </React.Fragment>
        );
    }
}

export default App;
