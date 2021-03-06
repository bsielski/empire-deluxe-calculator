import React from 'react';
import {SortButton} from './SortButton';

import './SortButtonContainer.css';

export class SortButtonContainer extends React.Component {

    constructor(props) {
	super(props);
	this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
	this.props.onChange(e.target.value);
    }

    render() {
	const buildOption = (option, index) => {
	    return (
		<SortButton
		  key={index}
		  name="sort by"
		  value={option.value}
		  label={option.label}
		  description={option.description}
		  onChange={this.onChange}
		  checked={this.props.selectedOption == option.value}
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
