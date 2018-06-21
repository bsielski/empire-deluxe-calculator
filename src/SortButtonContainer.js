import React from 'react';
import {SortButton} from './SortButton';

import './SortButtonContainer.css';

export class SortButtonContainer extends React.Component {

    render() {
	return (
	    <div className="sort_button_container">
	      <SortButton
		label="Win ratio"
		alt="from best to worst win ratio"
		altReversed="from worst to best win ratio"
		icon="001-sort-by-order.svg"
	    iconReversed="002-sort-by-numeric-order.svg"
	    newIcon={{"role": "img", "aria-label": "crossed swords", "char": "⚔"}}
		sort={this.props.clickByWinRatio}
		startReversed={true}
		/>
	      
	      <SortButton
		label="Cost ratio"
		alt="from best to worst cost ratio"
		altReversed="from worst to best cost ratio"
		icon="002-sort-by-numeric-order.svg"
	    newIcon={{"role": "img", "aria-label": "dollar sign", "char": "$"}}
		iconReversed="001-sort-by-order.svg"
		sort={this.props.clickByCostRatio}
		startReversed={false}
		/>
	    </div>
	);
    }
}
