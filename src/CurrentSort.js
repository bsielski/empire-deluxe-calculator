import React from 'react';

import './CurrentSort.css';

export class CurrentSort extends React.Component {

    render() {
	const byWhat = this.props.byWhat;
	const reversed = this.props.reversed;
	return (
	    <p className="current_sort">
	      <span className="current_sort_method">
		{byWhat} ({reversed})
	      </span>
	    </p>
	);
    }
}
