import React from 'react';
import Canvas from './canvas';

interface Props {
    gridSize: number,
    nodeRadius: number
}

interface State {

}

class Grid extends React.Component<Props, State> {

    handleClick(event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
        console.log('clicked!');
    }

    handleMouseMove(event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
        // console.log(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
        console.log('moved!');

    }

    render() {
        return (<Canvas 
          gridSize={this.props.gridSize}    // alternative: {...this.props}
          nodeRadius={this.props.nodeRadius}
          onClick={(event) => this.handleClick(event)}
          onMouseMove={(event) => this.handleMouseMove(event)}
        />);
    }
}

export default Grid;