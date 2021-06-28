import React from 'react';

import Slider from './slider';
import StartButton from './startButton';

interface Props {
    sliderProps: {
        sliderValue: number,
        onSliderChange: (sliderValue: number) => void
    }
    startButtonProps: {
        onStart: () => void
    }
}

interface State {

}

class Toolbar extends React.Component<Props, State> {
    
    render() {
        return (
            <div style={{height: 80, textAlign: 'center'}}>
                <StartButton onStartButton={this.props.startButtonProps.onStart}/>
                <Slider {...this.props.sliderProps} />
            </div>
        );
    }
}

export default Toolbar;