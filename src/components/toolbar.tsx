import React from 'react';

import Slider from './slider';
import Button from './button';

import TitledToolbarContainer from './titledToolbarContainer';
import CheckBox from './checkBox'
import DropDown from './dropdown';

interface Props {
    sliderProps: {
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
            // height: 160, 
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
                    <Slider {...this.props.sliderProps} /> 
                    <Button label="Clear" onClick={this.props.graphProps.onClear} />
                </TitledToolbarContainer>
                <TitledToolbarContainer title="Algorithms">
                    <DropDown 
                        label="Select Algorithm" 
                        options={this.props.startButtonProps.options} 
                        onChange={(event) => this.props.startButtonProps.onSelection(event)}
                    />
                </TitledToolbarContainer>
                <TitledToolbarContainer title="Animation">
                    <Button label="Start" onClick={this.props.startButtonProps.onStart}/>
                </TitledToolbarContainer>
            </div>
        );
    }
}

export default Toolbar;