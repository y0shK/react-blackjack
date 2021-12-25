import React from 'react';
import ReactDOM from 'react-dom';
import './Game.css';
import blue_chip from '../assets/blue_chip.png';

class Game extends React.Component {

    // in constructor, keep track of dealer count and player count as states
    // dealer count and player count are initialized to some value when "Play Game" is selected
    constructor(props) {
        super(props);

        this.state = {
            dealerCount: this._getDealerCount(),
            playerCount: this._initial_hit(),
        }

        this._getDealerCount = this._getDealerCount.bind(this);
        this._initial_hit = this._initial_hit.bind(this);
        this._other_hit = this._other_hit.bind(this);
    }

    // game logic goes here
    // dealer hits until 17 or more - generate random numbers until count is high enough
    _getDealerCount() {
        let count = 0;
        let val = Math.floor(Math.random() * (10-2) + 2);
        count = val;

        while (count < 17) {
          val = Math.floor(Math.random() * (10-2) + 2);
          count = count + val;
        }

        return count;
    }

    // player starts with a random count (2-10)
    // this value is initialized when the state is created in the constructor
    _initial_hit() {
        return Math.floor(Math.random() * (10-2) + 2);
    }

    // if the hit button is clicked,
    // call this function onClick
    // in the function, modify the state each time the click occurs
    _other_hit() {
        this.setState({playerCount: this.state.playerCount + Math.floor(Math.random() * (10-2) + 2)})
    }
    
    render() {

        // because we set the dealer & player displays to react states and call them as html objects,
        // we know that they will modify as defined by this.setState (instead of modifying directly)
        return(
            <div>

                <p id="game_interface">
                
                Dealer count: {this.state.dealerCount}
                
                <img src={blue_chip} alt="hit option" id="blue_chip_hit"
                onClick={this._other_hit}></img>

                Player count: {this.state.playerCount}

                </p>
                
            </div>
        );
    }

}
export default Game;
