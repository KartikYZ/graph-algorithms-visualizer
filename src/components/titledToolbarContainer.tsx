import React from "react";

interface Props {
    title: string
}

interface State {

}

class TitledToolbarContainer extends React.Component<Props, State> {

    // constructor(props: Props) {
    //     super(props);
    // }

    render() {
        let styles = {
            // backgroundColor: '#aaaaaa',
            border: '1px solid black',
            borderRadius: '8px',
            padding: '10px',
            margin: '0 2px',
            color: 'rgba(255, 255, 255, 0.8)'
        }
        return (
            <div style={styles}>
                <h3 style={{textAlign: 'center', paddingBottom: 5}}>{this.props.title}</h3>
                {this.props.children}
            </div>
        );
    }
}

export default TitledToolbarContainer;