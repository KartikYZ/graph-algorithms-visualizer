import React from 'react';

interface Props {
    label: string,
    sliderLength: number
    sliderValue: number,
    onSliderChange: (sliderValue: number) => void;
}

interface State {
    sliderValue: number
}

class Slider extends React.Component<Props, State> {    // todo: make reusable/generic

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

        return (
            <>
            <input 
                type="range" 
                value={this.state.sliderValue} 
                max={this.props.sliderLength - 1} 
                onChange={(event) => this.handleOnChange(event)} 
                name="slider"
            />
            <label>{this.props.label}</label>
            </>
        );

    }
}

export default Slider;