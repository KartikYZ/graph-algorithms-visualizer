import React from 'react';
import './App.css';

import Toolbar from './components/toolbar';
import Grid from './components/grid';
import Graph from './graph/graph';
import { depthFirstSearch } from './graph/algorithms';

interface Props {

}

interface State {
  sliderValue: number,
  graph: Graph<any>
}

class App extends React.Component<Props, State> {

  // private gridSizeValues: number[] = [100, 80, 40, 32, 25, 20, 16];
  private gridSizeValues: number[] = [100, 80, 40];

  constructor(props: Props) {
    super(props);

    this.onDirected = this.onDirected.bind(this);
    this.onShowWeights = this.onShowWeights.bind(this);
    this.onShowPositions = this.onShowPositions.bind(this);
    this.onGridSizeChange = this.onGridSizeChange.bind(this);
    
    this.onDepthFirstSearch = this.onDepthFirstSearch.bind(this);

    this.state = {
      sliderValue: 0,
      graph: new Graph(false, false, false)
    }
  }

  onDirected(directedEdges: boolean) {
    // console.log(directedEdges ? "directed": "undirected");
    this.state.graph.setIsDirected(directedEdges);
    this.setState({});
  }

  onShowWeights(showWeights: boolean) {
    // console.log(showWeights ? "showWeights" : "hideWeights");
    this.state.graph.setShowWeights(showWeights);
    this.setState({});
  }

  onShowPositions(showPositions: boolean) {
    // console.log(showPositions ? "showPosition" : "hidePositions");
    this.state.graph.setShowPositions(showPositions);
    this.setState({});
  }

  onGridSizeChange(sliderValue: number) {
    this.setState({sliderValue: sliderValue});
  }

  onDepthFirstSearch() {
    let visited = depthFirstSearch(this.state.graph, this.state.graph.vertices()[0]);
    console.log(visited);
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
            onStart: this.onDepthFirstSearch
          }}
          graphProps={{
            onSelectDirectedEdges: this.onDirected,
            onSelectShowWeights: this.onShowWeights,
            onSelectShowVertexPositions: this.onShowPositions
          }}
        />
        <Grid 
          gridSize={this.gridSizeValues[this.state.sliderValue]} 
          nodeRadius={5 - this.state.sliderValue}
          graph={this.state.graph}
        />
      </React.Fragment>
    );
  }
}

export default App;
