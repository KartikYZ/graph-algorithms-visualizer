import React from 'react';

interface Props {
    sliderValue: number,
    onSliderChange: (sliderValue: number) => void;
}

interface State {
    sliderValue: number
}

class Slider extends React.Component<Props, State> {

    // private sliderLength: number = 7;
    private sliderLength: number = 3;

    constructor(props: Props) {
        super(props);
        this.state = {
            sliderValue: this.props.sliderValue
        }
    }

    handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.props.onSliderChange(parseInt(event.currentTarget.value));
    }

    componentDidUpdate() {
        this.setState((prevState, props) => {
            if (props.sliderValue !== prevState.sliderValue) {
                return {
                    sliderValue: props.sliderValue
                }
            }
        });
    }

    render() {
        return React.createElement(
            'input', 
            {
                type: 'range',
                id: 'slider',
                value: this.state.sliderValue,
                max: this.sliderLength - 1,
                onChange: (event) => this.handleOnChange(event),
            },
            null
        );
    }
}

export default Slider;