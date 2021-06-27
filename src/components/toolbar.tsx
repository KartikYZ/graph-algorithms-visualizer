import React from 'react';
import Slider from './slider';

// for testing
import { main } from '../graph/test';

interface Props {
    sliderProps: {
        sliderValue: number,
        onSliderChange: (sliderValue: number) => void
    }
}

interface State {

}

class Toolbar extends React.Component<Props, State> {

    componentDidMount() {
        main();
    }

    render() {
        return <Slider {...this.props.sliderProps} />;
    }
}

export default Toolbar;