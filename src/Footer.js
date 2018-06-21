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
		The lower lost HP cost rate - the more profitable attack for the attacker. Ratio 1.0 is neutral.
	      </p>

	      <p className="footer__row">
		The lower lost HP cost rate tells if the attack is profitable for the attacker.
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
	    </div>
	    
	)
    }
}
