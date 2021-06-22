import React from 'react';
import './App.css';

import Toolbar from './components/toolbar';
import Canvas from './components/canvas';

interface Props {

}

interface State {
  sliderValue: number
}

class App extends React.Component<Props, State> {

  // private gridSizeValues: number[] = [100, 80, 40, 32, 25, 20, 16];
  private gridSizeValues: number[] = [100, 80, 40];

  constructor(props: Props) {
    super(props);

    this.onGridSizeChange = this.onGridSizeChange.bind(this);
    this.state = {
      sliderValue: 0
    }
  }

  onGridSizeChange(sliderValue: number) {
    this.setState({sliderValue: sliderValue});
  }

  render() {
    return (<React.Fragment>
      <Toolbar 
        sliderProps={{
          sliderValue: this.state.sliderValue, 
          onSliderChange: this.onGridSizeChange
        }}
      />
      <Canvas gridSize={this.gridSizeValues[this.state.sliderValue]} nodeRadius={5 - this.state.sliderValue}/>
    </React.Fragment>);
  }
}

export default App;
