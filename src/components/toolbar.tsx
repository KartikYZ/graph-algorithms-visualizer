import React from 'react';

import Slider from './slider';
import Button from './button';
import './styles.css';

import TitledToolbarContainer from './titledToolbarContainer';
import CheckBox from './checkBox'
import DropDown from './dropdown';

interface Props {
    gridSizeSliderProps: {
        label: string,
        sliderLength: number,
        sliderValue: number,
        onSliderChange: (sliderValue: number) => void
    },
    animationSpeedSliderProps: {    // make interface
        label: string,
        sliderLength: number,
        sliderValue: number,
        onSliderChange: (sliderValue: number) => void
    }
    startButtonProps: {
        options: string[],
        onStart: () => void,
        onSelection: (option: string) => void;
    }
    graphProps: {
        onSelectDirectedEdges: (selected: boolean) => void,
        onSelectShowWeights: (selected: boolean) => void,
        onSelectShowVertexPositions: (selected: boolean) => void,
        onGenerateGrid: () => void,
        onGenerateRandom: () => void,
        onClear: () => void,
    }
}

interface State {
    
}

class Toolbar extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.handleOnStart = this.handleOnStart.bind(this);
    }

    handleOnStart() {

    }
    
    render() {
        let styles = {
            backgroundColor: '#222222',
            // backgroundColor: '#5995da',
            padding: '10px 0',
            display: 'flex',
            justifyContent: 'center',
        }
        return (
            <div style={styles}>
                <TitledToolbarContainer title="Graph">
                    <CheckBox label='Directed Edges' onSelect={this.props.graphProps.onSelectDirectedEdges}/>
                    <CheckBox label='Show Weights' onSelect={this.props.graphProps.onSelectShowWeights}/>
                    <CheckBox label='Show Vertex Positions' onSelect={this.props.graphProps.onSelectShowVertexPositions}/>
                    <Slider {...this.props.gridSizeSliderProps} /> 
                    <Button label="Clear" onClick={this.props.graphProps.onClear} />
                </TitledToolbarContainer>
                <TitledToolbarContainer title="Algorithms">
                    <DropDown 
                        label="Select Algorithm" 
                        options={this.props.startButtonProps.options} 
                        onChange={(event) => this.props.startButtonProps.onSelection(event)}
                    />
                    <Button label="Generate Grid Graph" onClick={this.props.graphProps.onGenerateGrid} />
                    <Button label="Generate Random Graph" onClick={this.props.graphProps.onGenerateRandom} />
                </TitledToolbarContainer>
                <TitledToolbarContainer title="Animation">
                    <Slider {...this.props.animationSpeedSliderProps} /> 
                    <Button label="Start" onClick={this.props.startButtonProps.onStart}/>
                </TitledToolbarContainer>
                <TitledToolbarContainer title="Custom graphs">
                    <div>
                        <p className="subtitle">Addition</p>
                            1. Click on nodes to start drawing. Click on the currently active source node to exit draw mode. <br />
                            2. Click on nodes other than the currently active source node to draw edges. <br />
                            3. Use the toolbar to switch between directed/undirected/weighted/unweighted edges. <br />
                        <p className="subtitle">Removal</p>
                            1. Right click on vertex to remove it (and its incident edges, if any). <br />
                            2. To remove an undirected edge, draw over/retrace the edge. <br />
                            3. To remove a directed edge, draw/retrace the edge from its tail to the arrowhead. <br />
                    </div>
                </TitledToolbarContainer>
            </div>
        );
    }
}

export default Toolbar;