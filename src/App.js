import React, { Component } from 'react';
import {CombatBoxContainer} from './CombatBoxContainer';
import {SearchContainer} from './SearchContainer';
import {CurrentSort} from './CurrentSort';
import {TitleBar} from './TitleBar';
import {Footer} from './Footer';
import {RadioButtonGroup} from './RadioButtonGroup';

import combatData from './combat-x-500_000';

import './App.css';

class App extends Component {

    constructor(props) {
	super(props);
	this.state = {
	    order: 0,
	    sorting: 0,
	    defender: "",
	    attacker: ""  
	};
	this.changeDefender = this.changeDefender.bind(this);

	this.filterCombats = this.filterCombats.bind(this);
	this.sortCombats = this.sortCombats.bind(this);

	this.setOrder = this.setOrder.bind(this);	
	this.setSorting = this.setSorting.bind(this);
    }

    componentWillMount() {

	this.orders = [
	    {
		currentSortLabel: "best first",
		buttonLabel: "best first",
		comparisonMod: (bool) => bool
	    },
	    {
		currentSortLabel: "worst first",
		buttonLabel: "worst first",
		comparisonMod: (bool) => !bool
	    }
	];
	this.sortings = [
	    {
		currentSortLabel: "Sorted by Win Ratio",
		buttonLabel: "Sort by Win Ratio",
		comparison: (a, b) => a.winRatio > b.winRatio
	    },
	    {
		currentSortLabel: "Sorted by Combat Cost",
		buttonLabel: "Sort by Combat Cost",
		comparison: (a, b) => a.averageCombatCostRate < b.averageCombatCostRate
	    }
	];

	this.tests = {
	    "winRatio": value => {
		if (value >= 51) {
		    return "good";
		}
		else if (value <= 49) {
		    return "bad";
		}
		else {
		    return "medium";
		}
	    },
	    "averageCombatCostRate": value => {
		if (value <= 0.9) {
		    return "good";
		}
		else if (value >= 1.1) {
		    return "bad";
		}
		else {
		    return "medium";
		}
	    }
	};
	
	this.combats = combatData
	    .filter( combat =>
		     Number(combat.fights) > 0
		   )
	    .map( (combat, index) => {
		const winRatio = Math.round(Math.round(Number(combat.win_ratio).toFixed(4) * 1000) / 10.0);
		const averageCombatCostRate = (Math.round((Math.round((Math.round((Number(combat.average_combat_cost_rate).toFixed(4) * 1000)) / 10)) / 10)) / 10).toFixed(1);
		return {
		    key: index,
		    attackerName: combat.attacker_name,
		    defenderName: combat.defender_name,
		    averageCombatCostRate: averageCombatCostRate,
		    fights: Number(combat.fights).toFixed(0),
		    winRatio: winRatio,
		    winRatioQuality: this.tests.winRatio(winRatio),
		    combatCostRateQuality: this.tests.averageCombatCostRate(averageCombatCostRate)
		}
	    });

	this.abbreviations = {
	    "IN": "Infantry", AR: "Armor", TK: "Truck", LA: "Light Artillery", HA: "Heavy Artillery",
	    EN: "Engineer", AA: "Anti Air Battery", FI: "Fighter", BO: "Bomber", HE: "Helicopter",
	    AT: "Air Transport", PB: "Patrol Boat", TR: "Transport", DE: "Destroyer", SS: "Surfaced Sub",
	    SU: "Submerged Sub", SD: "Deep Running Sub", CR: "Cruiser", BA: "Battleship", AC: "Carrier",
	    SB: "Sea Bee", SC: "Scout Satellite", AS: "Armed Satellite", SR: "Short Range Missile",
	    LR: "Long Range Missile", SN: "Short Range Nuke", LN: "Long Range Nuke"
	};
	
    }

    setOrder(option) {
	this.setState({ order: option });
    }
    
    setSorting(option) {
	this.setState({ sorting: option });
    }
    
    sortCombats(combats) {
	const sorted = combats.slice();
	sorted.sort((a,b) => {
	    if (this.orders[this.state.order].comparisonMod(this.sortings[this.state.sorting].comparison(a, b))) {
		return -1;
	    }
	    else {
		return 1;
	    }
	});
	return sorted;
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

	const filtered = combats.slice()
	      .filter( combat => 
	      	       checkDefender(combat) && checkAttacker(combat)
	      	     );
	return filtered;
    }

    changeDefender(event) {
	this.setState({[event.target.name]: event.target.value});
    }
    
    render() {
	const combatToDisplay = this.sortCombats(this.filterCombats(this.combats));

	return (
	    <div className="page_container">
	      <TitleBar/>
	      
	      <RadioButtonGroup
		options={this.orders}
		name={"order"}
		selectedOption={this.state.order}
		onChange={this.setOrder}
		/>
	      
	      <RadioButtonGroup
		options={this.sortings}
		name={"sorting"}
		selectedOption={this.state.sorting}
		onChange={this.setSorting}
		/>
	      
	      <SearchContainer
		defenderValue={this.state.defender}
		attackerValue={this.state.attacker}
		onChange={this.changeDefender}
		/>

	      <CurrentSort
		reversed={this.orders[this.state.order].currentSortLabel}
		byWhat={this.sortings[this.state.sorting].currentSortLabel}
		/>
	      
	      <CombatBoxContainer
		combatToDisplay={combatToDisplay}
		tests={this.tests}
		/>

              <Footer/>
	    </div>
	);
    }
}

export default App;
