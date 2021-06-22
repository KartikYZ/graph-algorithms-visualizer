import React from 'react';
import Canvas from './canvas';

interface Props {
    gridSize: number,
    nodeRadius: number
}

interface State {

}

class Grid extends React.Component<Props, State> {

    render() {
        return (<Canvas 
          gridSize={this.props.gridSize}    // alternative: {...this.props}
          nodeRadius={this.props.nodeRadius}
        />);
    }
}

export default Grid;