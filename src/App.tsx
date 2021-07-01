import React from 'react';
import './App.css';

import Toolbar from './components/toolbar';
import Grid from './components/grid';
import Graph from './graph/graph';
import { depthFirstSearch, breadthFirstSearch, AnimationBuilder, GraphAnimationFrame } from './graph/algorithms';
import Vertex from './graph/vertex';

interface Props {

}

interface State {
    sliderValue: number,
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
    private algorithms: IDAlgorithmMap;

    constructor(props: Props) {
        super(props);

        this.onDirected = this.onDirected.bind(this);
        this.onShowWeights = this.onShowWeights.bind(this);
        this.onShowPositions = this.onShowPositions.bind(this);
        this.onGridSizeChange = this.onGridSizeChange.bind(this);
        this.onClear = this.onClear.bind(this);
        this.onSelection = this.onSelection.bind(this);
        this.onStart = this.onStart.bind(this);

        this.algorithms = {
            'dfs': depthFirstSearch,
            'bfs': breadthFirstSearch
        }

        this.state = {
            sliderValue: 0,
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
        this.setState({sliderValue: sliderValue});
    }

    onClear() {
        this.state.graph.clear();
        this.setState({});
    }

    onSelection(option: string) {
        this.setState({ algorithm: option })
    }

    onStart() {

        if (this.state.graph.vertices().length === 0) {
            return;
        }

        let intervalDelay = 400;  // todo: use slider for this

        this.setState({isAnimating: true});

        let frames = this.algorithms[this.state.algorithm](this.state.graph, this.state.graph.vertices()[0]).getFrames();

        for (let i = 0; i < frames.length; i++) {
            setTimeout(() => {
                this.setState({
                    animationFrame: frames[i]
                });
            }, (i + 1) * intervalDelay);
        }

        setTimeout(() => {this.setState({isAnimating: false, animationFrame: null})}, (frames.length + 3) * intervalDelay);
    }

    render() {
        return (
            <React.Fragment>
                <Toolbar 
                    sliderProps={{
                        sliderValue: this.state.sliderValue, 
                        onSliderChange: this.onGridSizeChange
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
                        onClear: this.onClear,
                    }}
                />
                <Grid 
                    gridSize={this.gridSizeValues[this.state.sliderValue]} 
                    nodeRadius={5 - this.state.sliderValue}
                    graph={this.state.graph}
                    isAnimating={this.state.isAnimating}
                    animationFrame={this.state.animationFrame}
                />
            </React.Fragment>
        );
    }
}

export default App;
