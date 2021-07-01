import React from 'react';

interface Props {
    label: string,
    options: string[];
    onChange: (option: string) => void
}

interface State {

}

class DropDown extends React.Component<Props, State> {
    
    render() {
        const options = this.props.options.map((option) => <option key={option} value={option}>{option}</option>);
        return (
            <div>
                <label htmlFor="dropdown">{this.props.label}</label>
                <select 
                    id="dropdown" 
                    defaultValue={this.props.options[0]}
                    onChange={(event) => this.props.onChange(event.currentTarget.value)}
                >
                    {options}
                </select>
            </div>
        );
    }
}

export default DropDown;