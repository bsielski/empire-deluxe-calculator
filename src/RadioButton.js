import React from 'react';

import './RadioButton.css';

export class RadioButton extends React.Component {

    render() {
	return (
	    <div>
	      <label>
		<input
		  type="radio"
		  name={this.props.name}
		  value={this.props.value}
		  onChange={this.props.onChange}
		  checked={this.props.checked}
		  />
		{this.props.label}
	      </label>
	    </div>
	);
    }
}
