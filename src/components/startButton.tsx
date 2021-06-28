import React from "react";

interface Props {
    onStartButton: () => void;
}

interface State {

}

export default class StartButton extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }   

    handleClick() {
        console.log("button clicked!");
        this.props.onStartButton();
    }

    render() {
        return (
            <button type="button" onClick={() => this.props.onStartButton()}>

            </button>
        );
    }
}