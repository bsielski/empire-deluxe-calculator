import React from 'react'
import {CombatBox} from './CombatBox';

import './CombatBoxContainer.css';

export class CombatBoxContainer extends React.Component {

    
    componentWillMount() {
	this.test = (combat) => {
	    if (this.props.testGood(combat[this.props.keyValue])) {
		return "good";
	    }
	    else if (this.props.testBad(combat[this.props.keyValue])) {
		return "bad";
	    }
	    else {
		return "medium";
	    }
	};
	
    }

    render() {
	const buildCombatBox = (combat) => {
	    return (
		<CombatBox
		  key={combat.key}
		  attackerName={combat.attackerName}
		  defenderName={combat.defenderName}
		  averageCombatCostRate={combat.averageCombatCostRate}
		  fights={combat.fights}
		  winRatio={combat.winRatio}
		  quality={this.test(combat)}
		  />
	    );
	}
	
	const combatBoxes = this.props.combatToDisplay.map(buildCombatBox);
	
	return (
	    <div className="combat_box_container">
	      {combatBoxes}
	    </div>
	)
    }
}
