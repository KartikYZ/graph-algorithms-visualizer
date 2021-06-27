import React from 'react';
import Slider from './slider';

interface Props {
    sliderProps: {
        sliderValue: number,
        onSliderChange: (sliderValue: number) => void
    }
}

interface State {

}

class Toolbar extends React.Component<Props, State> {
    
    render() {
        return <Slider {...this.props.sliderProps} />;
    }
}

export default Toolbar;