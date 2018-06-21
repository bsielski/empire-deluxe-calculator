import React from 'react';

import './CombatBox.css';

export class CombatBox extends React.Component {

    render() {

	return (
	    <div className={"combat_box combat_box--" + this.props.quality} >
              <header className="combat_box__header">
		<p className="combat_box__participants">
		  {this.props.attackerName} vs {this.props.defenderName}
		</p>
              </header>
	      <p className="combat_box__win_ratio">
		Win ratio: {this.props.winRatio}%
	      </p>
	      <p className="combat_box__cost">
		Lost HP cost rate: {this.props.averageCombatCostRate}
	      </p>	
	    </div>
	)
    }
}
