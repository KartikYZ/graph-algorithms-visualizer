import React from "react";
import './styles.css'

interface Props {
    label: string,
    onClick: () => void
}

interface State {

}

class Button extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }   

    handleClick() {     // not necessary?
        this.props.onClick();
    }

    render() {
        let styles = {
            backgroundColor: '#222222',     // use only one
            display: 'flex',
            justifyContent: 'center',
            padding: '4px',
        }
        return (
            <div className="button" style={styles} onClick={() => this.props.onClick()}>
                <p className="button" style={{padding: '2px 5px', backgroundColor: '#222222'}}> {this.props.label} </p>
            </div>
        );
    }
}

export default Button;