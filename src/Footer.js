import React from 'react'
import './Footer.css';
import {VERSION} from './version';

export class Footer extends React.Component {
    
    render() {	
	return (
	    <div className="footer">

	      <p className="footer__row">
		Ranged Combat is not present in those comparisons. It is all about Movement Combat. 
	      </p>
	      <p className="footer__row">
		Units in simulations had full HP and terrain had no impact.
	      </p>

	      <p className="footer__row">
		The lower combat cost ratio - the more profitable attack for the attacker. Ratio 1.0 is neutral.
	      </p>
	      <p className="footer__row">
		Combat cost ratio formula: (attacker's average HP lost * turns to build attacker unit / full HP of attacker) / (defender's average HP lost * turns to build defender unit / full HP of defender)
	      </p>

	      <p className="footer__row">
		Search fields are case insensitive and they can search by unit id ("IN", "FI", "de", "eN") or by full name.
	      </p>
	      
	      <p className="footer__row">
		<span className="footer__caption">Version: </span>
		<span className="footer__value">{VERSION}</span>
	      </p>

              <p className="footer__row">
		<span className="footer__caption">Source code: </span>
		<a href="https://github.com/bsielski/empire-deluxe-calculator" className="footer__value">https://github.com/bsielski/empire-deluxe-calculator</a>
	      </p>
              <p className="footer__row">
		<span className="footer__caption">Combat simulation results: </span>
		<a href="./combat-x-500_000.json" className="footer__value">combat-x-500_000.json</a>
	      </p>
	    </div>
	)
    }
}
