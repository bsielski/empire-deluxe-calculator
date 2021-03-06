import React from 'react';

import './SortButton.css';

export class SortButton extends React.Component {

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
		{this.props.label + " " + this.props.description}
	      </label>
	    </div>
	);
    }
}
