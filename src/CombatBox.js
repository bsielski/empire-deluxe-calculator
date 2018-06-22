import React from 'react';

import './CombatBox.css';

export class CombatBox extends React.Component {

    render() {

	return (
	    <div className="combat_box" >
              <header className="combat_box__header">
		<p className="combat_box__participants">
		  {this.props.attackerName} vs {this.props.defenderName}
		</p>
	      </header>
	      <table>
		<tr>
		  <td className="combat_box__value_name">
		    Win ratio:
		  </td>
		  <td className={"combat_box__value combat_box__value--" + this.props.winRatioQuality}>
		    {this.props.winRatio}%
		  </td>
		</tr>
		<tr>
		  <td className="combat_box__value_name">
		    Combat cost ratio:
		  </td>
		  <td className={"combat_box__value combat_box__value--" + this.props.combatCostRateQuality}>
		    {this.props.averageCombatCostRate}
		  </td>
		</tr>
	      </table>
	    </div>
	)
    }
}
