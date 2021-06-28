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

    this.onGridSizeChange = this.onGridSizeChange.bind(this);
    this.onDepthFirstSearch = this.onDepthFirstSearch.bind(this);

    this.state = {
      sliderValue: 0,
      graph: new Graph(false)
    }
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
        <div style={{height: 80, textAlign: 'center'}}> {/* encapsulate within toolbar */}
          <Toolbar 
            sliderProps={{
              sliderValue: this.state.sliderValue, 
              onSliderChange: this.onGridSizeChange
            }}
            startButtonProps={{
              onStart: this.onDepthFirstSearch
            }}
          />
        </div>
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
