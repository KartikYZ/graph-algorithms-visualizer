import React from 'react';

import Slider from './slider';
// import StartButton from './startButton';

import TitledToolbarContainer from './titledToolbarContainer';
// import RadioGroup from './radioGroup';
import CheckBox from './checkBox'

interface Props {
    sliderProps: {
        sliderValue: number,
        onSliderChange: (sliderValue: number) => void
    }
    startButtonProps: {
        onStart: () => void
    }
    graphProps: {
        onSelectDirectedEdges: (selected: boolean) => void,
        onSelectShowWeights: (selected: boolean) => void,
        onSelectShowVertexPositions: (selected: boolean) => void
    }
}

interface State {

}

class Toolbar extends React.Component<Props, State> {
    
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
                {/* <StartButton onStartButton={this.props.startButtonProps.onStart}/>
                <Slider {...this.props.sliderProps} /> */}
                {/* <TitledToolbarContainer title="Mode">
                    <RadioGroup label={'Graph'} />
                    <RadioGroup label={'Grid'} />
                    <Slider {...this.props.sliderProps} /> 
                </TitledToolbarContainer> */}

                <TitledToolbarContainer title="Graph">
                    <CheckBox label='Directed Edges' onSelect={this.props.graphProps.onSelectDirectedEdges}/>
                    <CheckBox label='Show Weights' onSelect={this.props.graphProps.onSelectShowWeights}/>
                    <CheckBox label='Show Vertex Positions' onSelect={this.props.graphProps.onSelectShowVertexPositions}/>
                    <Slider {...this.props.sliderProps} /> 
                </TitledToolbarContainer>
                <TitledToolbarContainer title="Algorithms"/>
                <TitledToolbarContainer title="Animation"/>
            </div>
        );
    }
}

export default Toolbar;