import React from "react";

interface Props {
    text: string
}

interface State {
    textDisplay: boolean
}

export default class ToggleButton extends React.Component<Props, State>{
    constructor(props: Props){
        super(props);
        this.state = { textDisplay: true};
    }

    render() {
        return(
            <div>
                <button>
                    
                </button>
            </div>
        );
    }
}

