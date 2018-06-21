import React from 'react';

import './SearchContainer.css';

export class SearchContainer extends React.Component {

    render() {
	return (
	    <div className="search_container">
	      <label>
		Attacker:
		<input
		  type="search"
		  name="attacker"
		  value={this.props.attackerValue}
		  onChange={this.props.onChange}
		  />
	      </label>
	      <label>
		Defender:
		<input
		  type="search"
		  name="defender"
		  value={this.props.defenderValue}
		  onChange={this.props.onChange}
		  />
	      </label>

	    </div>
	);
    }
}
