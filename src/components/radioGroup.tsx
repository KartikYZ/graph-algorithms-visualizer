import React from "react";

interface Props {
    label: string
}

class RadioGroup extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.handleSelection = this.handleSelection.bind(this);
    }

    handleSelection() {

    }

    render() {
        // const radioButtons = this.props.labels.map((label) => 
        //     <div>
        //         <input type='radio' name="mode"></input>
        //         <label> {label}</label>
        //     </div>
        // );
        return (
            <div>
                <input type='radio' name="mode"></input>
                <label>{this.props.label}</label>
            </div>
        );
    }
}

export default RadioGroup;