import React from "react";

interface Props {
    label: string
    onSelect: (selected: boolean) => void
}

class CheckBox extends React.Component<Props> {
    private checkBoxRef: React.RefObject<HTMLInputElement>;
    constructor(props: Props) {
        super(props);

        this.checkBoxRef = React.createRef();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        if (this.checkBoxRef) {
            let checkBox = this.checkBoxRef.current;
            if (checkBox?.checked) {
                this.props.onSelect(true);
                // console.log('checked!');
            } else {
                this.props.onSelect(false);
                // console.log('unchecked!');
            }
            
        }
    }

    render() {
        let styles = {
            padding: '2px',
            marginBottom: '2px'
        }
        return (
            <div style={styles}>
                <input type='checkbox' onClick={this.handleClick} ref={this.checkBoxRef}></input>
                <label> {this.props.label}</label>
            </div>
        );
    }
}

export default CheckBox;