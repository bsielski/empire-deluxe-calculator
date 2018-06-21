import React from 'react';

import './CurrentSort.css';

export class CurrentSort extends React.Component {

    render() {
	const name = this.props.method.name;
	const icon = this.props.method.icon;
	return (
	    <p className="current_sort">
	      <span className="current_sort_method">
		{name} <img className="sort_icon" alt="from first to last generated" src={icon} width="18" height="18"/>
	      </span>
	    </p>
	);
    }
}
