import React from "react";

interface Props {
    title: string
}

interface State {

}

class titledToolbarContainer extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
            </div>
        );
    }
}

export default titledToolbarContainer;