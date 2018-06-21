import React from 'react'
import './TitleBar.css';

export class TitleBar extends React.Component {
    
    render() {	
	return (
	    <header className="title-bar">
	      <h1 className="title-bar__title">
		Empire Deluxe EE unit comparison
	      </h1>
	      <p className="title-bar__subtitle">
		based on 200k combat simulations between each pair of units
	      </p>
	    </header>
	)
    }
}
