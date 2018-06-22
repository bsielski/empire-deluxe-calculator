import React from 'react'
import {CombatBox} from './CombatBox';

import './CombatBoxContainer.css';

export class CombatBoxContainer extends React.Component {
    
    render() {
	const buildCombatBox = (combat) => {
	    return (
		<CombatBox
		  key={combat.key}
		  attackerName={combat.attackerName}
		  defenderName={combat.defenderName}
		  fights={combat.fights}
		  winRatio={combat.winRatio}
		  averageCombatCostRate={combat.averageCombatCostRate}
		  winRatioQuality={combat.winRatioQuality}
		  combatCostRateQuality={combat.combatCostRateQuality}
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
