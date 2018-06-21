import React, { Component } from 'react';
import {CombatBoxContainer} from './CombatBoxContainer';
import {SortButtonContainer} from './SortButtonContainer';
import {SearchContainer} from './SearchContainer';
import {CurrentSort} from './CurrentSort';
import {TitleBar} from './TitleBar';
import {Footer} from './Footer';

import combatData from './combat-x-200_000.json';

import './App.css';

class App extends Component {

    constructor(props) {
	super(props);
	this.state = {
	    currentSorting: this.sortByWinRatio,
	    defender: "",
	    attacker: ""
	    
	};
	this.changeDefender = this.changeDefender.bind(this);
	this.filterCombats = this.filterCombats.bind(this);

	this.clickByWinRatio = this.clickByWinRatio.bind(this);
	this.clickByCostRatio = this.clickByCostRatio.bind(this);
    }

    componentWillMount() {
	this.combats = combatData
	    .filter( combat =>
		     Number(combat.fights) > 0
		   )
	    .map( (combat, index) => {
		return {
		    key: index,
		    attackerName: combat.attacker_name,
		    defenderName: combat.defender_name,
		    averageCombatCostRate: (Math.round((Math.round((Math.round((Number(combat.average_combat_cost_rate).toFixed(4) * 1000)) / 10)) / 10)) / 10).toFixed(1),
		    fights: Number(combat.fights).toFixed(0),
		    winRatio: Math.round(Math.round(Number(combat.win_ratio).toFixed(4) * 1000) / 10.0)
		}
	    });
	this.sortLabels = {
	    "sortByWinRatio": {
		name: "By Win Ratio (from best to worst)",
		icon: "001-sort-by-order.svg",
		keyValue: "winRatio",
		testGood: value => value >= 51,
		testBad: value => value <= 49
	    },
	    "sortByWinRatioReversed": {
		name: "By Win Ratio (from worst to best)",
		icon: "002-sort-by-numeric-order.svg",
		keyValue: "winRatio",
		testGood: value => value >= 51,
		testBad: value => value <= 49,
	    },
	    "sortByCostRatio": {
		name: "By Combat Cost Ratio (from best to worst)",
		icon: "002-sort-by-numeric-order.svg",
		keyValue: "averageCombatCostRate",
		testGood: value => value <= 0.9,
		testBad: value => value >= 1.1
	    },
	    "sortByCostRatioReversed": {
		name: "By Combat Cost Ratio (from worst to best)",
		icon: "001-sort-by-order.svg",
		keyValue: "averageCombatCostRate",
		testGood: value => value <= 0.9,
		testBad: value => value >= 1.1
	    }
	};
	
	this.abbreviations = {
		IN: "Infantry",
	    AR: "Armor",
	    TK: "Truck",
	    LA: "Light Artillery",
	    HA: "Heavy Artillery",
	    EN: "Engineer",
	    AA: "Anti Air Battery",
	    FI: "Fighter",
	    BO: "Bomber",
	    HE: "Helicopter",
	    AT: "Air Transport",
	    PB: "Patrol Boat",
	    TR: "Transport",
	    DE: "Destroyer",
	    SS: "Surfaced Sub",
	    SU: "Submerged Sub",
	    SD: "Deep Running Sub",
	    CR: "Cruiser",
	    BA: "Battleship",
	    AC: "Carrier",
	    SB: "Sea Bee",
	    SC: "Scout Satellite",
	    AS: "Armed Satellite",
	    SR: "Short Range Missile",
	    LR: "Long Range Missile",
	    SN: "Short Range Nuke",
	    LN: "Long Range Nuke"
	};
	
    }
    
    sortByWinRatio(combats) {
	const sorted = combats.slice();
	sorted.sort((a,b) => {
	    if (a.winRatio > b.winRatio) return -1; else return 1
	});
	return sorted;
    }

    sortByWinRatioReversed(combats) {
	const sorted = combats.slice();
	sorted.sort((a,b) => {
	    if (a.winRatio < b.winRatio) return -1; else return 1
	});
	return sorted;
    }
    
    sortByCostRatio(combats) {
	const sorted = combats.slice();
	sorted.sort((a,b) => {
	    if (a.averageCombatCostRate < b.averageCombatCostRate) return -1; else return 1
	});
	return sorted;
    }

    sortByCostRatioReversed(combats) {
	const sorted = combats.slice();
	sorted.sort((a,b) => {
	    if (a.averageCombatCostRate > b.averageCombatCostRate) return -1; else return 1
	});
	return sorted;
    }
    
    clickByWinRatio(isReversed) {
	if (isReversed === false) {
	    this.setState({currentSorting: this.sortByWinRatio});
	}
	else {
	    this.setState({currentSorting: this.sortByWinRatioReversed});
	}
    }
    
    clickByCostRatio(isReversed) {
	if (isReversed === false) {
	    this.setState({currentSorting: this.sortByCostRatio});
	}
	else {
	    this.setState({currentSorting: this.sortByCostRatioReversed});
	}
    }

    filterCombats(combats) {
	let defenderPhrase = this.state.defender;
	let attackerPhrase = this.state.attacker;
	let checkDefender = (combat) => combat.defenderName.toLowerCase().includes(defenderPhrase.toLowerCase());
	let checkAttacker = (combat) => combat.attackerName.toLowerCase().includes(attackerPhrase.toLowerCase());
	if (defenderPhrase.length === 2 && this.abbreviations[defenderPhrase.toUpperCase()]) {
	    defenderPhrase = this.abbreviations[defenderPhrase.toUpperCase()];
	    checkDefender = (combat) => defenderPhrase === combat.defenderName;
	}
	if (attackerPhrase.length === 2 && this.abbreviations[attackerPhrase.toUpperCase()]) {
	    attackerPhrase = this.abbreviations[attackerPhrase.toUpperCase()];
	    checkAttacker = (combat) => attackerPhrase === combat.attackerName;
	}
	if (defenderPhrase === "") {
	    checkDefender = (combat) => true;
	}
	if (attackerPhrase === "") {
	    checkAttacker = (combat) => true;
	}

	console.log("DEF PHRASE: " + defenderPhrase + " " + new Date());
	
	const filtered = combats.slice()
	      .filter( combat => 
	      	        checkDefender(combat) && checkAttacker(combat)
	      	     );
	return filtered;
    }

    changeDefender(event) {
	const field = event.target;
	this.setState({[event.target.name]: event.target.value});

    }
    
    render() {

	const combatToDisplay = this.state.currentSorting(this.filterCombats(this.combats));

	return (
	    <div className="page_container">
              <TitleBar/>

	      <SortButtonContainer
		clickByWinRatio={this.clickByWinRatio}
		clickByCostRatio={this.clickByCostRatio}
		/>
	      <SearchContainer
		defenderValue={this.state.defender}
		attackerValue={this.state.attacker}
		onChange={this.changeDefender}
		/>

	      <CurrentSort
		method={this.sortLabels[this.state.currentSorting.name]}	
		/>
	      
	      <CombatBoxContainer
		combatToDisplay={combatToDisplay}
		keyValue={this.sortLabels[this.state.currentSorting.name].keyValue}
		testGood={this.sortLabels[this.state.currentSorting.name].testGood}
		testBad={this.sortLabels[this.state.currentSorting.name].testBad}
		/>
              <Footer/>
	    </div>
	);
    }
}

export default App;
