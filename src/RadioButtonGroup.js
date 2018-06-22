import React from 'react';
import {RadioButton} from './RadioButton';

import './RadioButtonGroup.css';

export class RadioButtonGroup extends React.Component {

    constructor(props) {
	super(props);
	this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
	this.props.onChange(parseInt(e.target.value, 10));
    }

    render() {
	const buildOption = (option, index) => {
	    return (
		<RadioButton
		  key={index}
		  name={this.props.name}
		  value={index}
		  label={option.buttonLabel}
		  onChange={this.onChange}
		  checked={this.props.selectedOption === index}
		  />
	    );
	}

	const options = this.props.options.map(buildOption);
	return (
            <div className="reverse_sorting_buttons">
	      {options}
            </div>
	)
    }

}
