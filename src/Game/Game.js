import React from 'react';
import ReactDOM from 'react-dom';
import './Game.css';
import blue_chip from '../assets/blue_chip.png';
import purple_chip from '../assets/purple_chip.png';

class Game extends React.Component {

    // in constructor, keep track of dealer count and player count as states
    // dealer count and player count are initialized to some value when "Play Game" is selected
    // also keep track of whether or not the player can act (set to false when the player stands)
    // and make sure the dealer hand is only assigned once the player stands
    constructor(props) {
        super(props);

        this.state = {
            dealerCount: "TBD",
            playerCount: this._initial_hit(),
            playerCanAct: true,
            dealerHandAssigned: false,
            playerCanStand: true,
            endGameState: "TBD",
        }

        this._getDealerCount = this._getDealerCount.bind(this);
        this._initial_hit = this._initial_hit.bind(this);
        this._other_hit = this._other_hit.bind(this);
        this._stand = this._stand.bind(this);
        this._set_game_end_state = this._set_game_end_state.bind(this);
    }

    // game logic goes here
    // dealer hits until 17 or more - generate random numbers until count is high enough
    _getDealerCount() {

        // only generate new dealer count if the dealer hand has not already been assigned
        // follow same algorithm as for player count

        if (! this.state.dealerHandAssigned) {
            
            // initial count
            let val = Math.floor(Math.random() * (13-1) + 1);
            let runningCount = 0;

            if (val === 1) {
                runningCount = 11;
            }
            else if (2 <= val && val <= 9) {
                runningCount = val;
            }
            else if (val >= 10) {
                runningCount = 10;
            }

            // further hit values

            while (runningCount < 17) {

                val = Math.floor(Math.random() * (13-1) + 1);
                
                if (val === 1) {
                    
                    if (runningCount + val > 21) {
                        runningCount = runningCount + 1;
                    }
                    else {
                        runningCount = runningCount + 11;
                    }

                }
                else if (2 <= val && val >= 9) {
                    runningCount = runningCount + val;
                }
                else if (val >= 10) {
                    runningCount = runningCount + 10;
                }

            }

            return runningCount;
 
        }
    
    }

    // three possibilities for initial hit:
    // ace (11) -> 1
    // number (2-9) -> 2-9
    // face (10) -> 10-13 (10, jack, queen, king)
    // generate a random number from 1-13, then add the corresponding value

    // this value is initialized when the state is created in the constructor
    _initial_hit() {
        
        // generate a random number
        const randomNum = Math.floor(Math.random() * (13-1) + 1);
        let runningCount = 0;
        
        // add corresponding value
        if (randomNum === 1) { // ace
            runningCount = 11;
        }
        else if (2 <= randomNum && randomNum <= 9) {
            runningCount = randomNum;
        }
        else if (randomNum >= 10) { // 10, jack, queen, king
            runningCount = 10;
        }

        return runningCount;
    }

    // if the hit button is clicked,
    // call this function onClick
    // in the function, modify the state each time the click occurs

    // create a randomNum var to store hit value
    // same algorithm as above
    // only difference - if ace=11 causes a bust, then set ace=1 (hard ace vs soft ace)
    _other_hit() {
        if (this.state.playerCanAct) {
           
            // generate a random number
            const randomNum = Math.floor(Math.random() * (13-1) + 1);
            let otherRunningCount = 0;
           
            if (randomNum === 1) { // draw an ace
                if (this.state.playerCount + 11 > 21) { // make sure that ace does not cause a bust
                    otherRunningCount = 1;
                }
                else {
                    otherRunningCount = 11;
                }
            }
            else if (2 <= randomNum && randomNum <= 9) {
                otherRunningCount = randomNum;
            }
            else if (randomNum >= 10) { // 10, jack, queen, king
                otherRunningCount = 10;
            }

            // instead of returning otherRunningCount, set the state to include the hit value
            this.setState({playerCount: this.state.playerCount + otherRunningCount});
        }
    }
    
    // if the stand button is clicked,
    // player's turn is over
    // after the player ends their turn, call the function determining the winner
    _stand() {

        if (this.state.playerCanStand) {
            
            // lock player's ability to hit
            this.setState({playerCanAct: false});
            this.setState({dealerHandAssigned: true}); // cannot reassign dealer hand multiple times
            this.setState({playerCanStand: false}); // can't stand multiple times

            // react setState is async
            // to ensure that we call the function on the updated value,
            // call the function inside setState
            // https://stackoverflow.com/questions/36085726/why-is-setstate-in-reactjs-async-instead-of-sync

            const dealer = this._getDealerCount();
            this.setState({dealerCount: dealer}, () => {
                this._set_game_end_state();
            });
           
        }
        
    }

    // and set state for game win/loss/tie
    // compare player and dealer count
    // if player > 21, automatic loss
    // if player < 21 and dealer > 21, player wins
    // if player and dealer < 21, higher wins
    _set_game_end_state() {

        if (this.state.playerCount > 21) {
            this.setState({endGameState: "loss"});
        }
        else if (this.state.playerCount <= 21 && this.state.dealerCount > 21) {
            this.setState({endGameState: "win"});
        }
        else {
            if (this.state.playerCount > this.state.dealerCount) {
                this.setState({endGameState: "win"});
            }
            else if (this.state.playerCount < this.state.dealerCount) {
                this.setState({endGameState: "loss"});
            }
            else {
                this.setState({endGameState: "tie"});
            }
        }

    }

    render() {

        // because we set the dealer & player displays to react states and call them as html objects,
        // we know that they will modify as defined by this.setState (instead of modifying directly)
        return(
            <div>

                <p id="game_interface">
                
                Dealer count: {this.state.dealerCount}
                
                <img src={blue_chip} alt="hit option" className="chip"
                onClick={this._other_hit}></img>

                <img src={purple_chip} alt="stand option" className="chip"
                onClick={this._stand}>

                </img>

                Player count: {this.state.playerCount}

                </p>

                <p id="end_state">
                    End game state: {this.state.endGameState}
                </p>
                
            </div>
        );
    }

}
export default Game;
