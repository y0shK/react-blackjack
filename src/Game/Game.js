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
            playerCount: this._initialHit(),
            playerCanAct: true,
            dealerHandAssigned: false,
            playerCanStand: true,
            endGameState: "TBD",
        }

        this._handAlgorithm = this._handAlgorithm.bind(this);
        this._getDealerCount = this._getDealerCount.bind(this);
        this._initialHit = this._initialHit.bind(this);
        this._otherHit = this._otherHit.bind(this);
        this._stand = this._stand.bind(this);
        this._setGameEndState = this._setGameEndState.bind(this);
        this._replay = this._replay.bind(this);
    }

    // detail assigning player/dealer hand algorithm below
    // provide boolean firstHit as parameter
    // return the result of one hit - could be 2 to 10, jack/queen/king, ace=11

    // https://stackoverflow.com/questions/10841737/boolean-argument-not-passing-correctly
    // default parameter - https://stackoverflow.com/questions/894860/set-a-default-parameter-value-for-a-javascript-function?rq=1

    _handAlgorithm(firstHit, currentHandValue=0) {
        
        // generate a random value
        // each random value corresponds to a particular hit value
        // ace (11) -> 1
        // number (2-9) -> 2-9
        // face (10) -> 10-13 (10, jack, queen, king)

        let randVal = Math.floor(Math.random() * (13-1) + 1);
        let hitVal = 0;

        if (randVal >= 2 && randVal <= 10) {
            hitVal = randVal;
        }
        else if (randVal > 10) {
            hitVal = 10;
        }
        else { // randVal = 1
            // first hit: ace is always 11
            // after first hit: ace can be 11 or 1
            if (firstHit) {
                hitVal = 11;
            }
            else {
                if (currentHandValue + 11 > 21) { // if ace=11 causes a bust, set ace=1
                    hitVal = 1;
                }
                else {
                    hitVal = 11;
                }
            }
        }

        return hitVal;

    }

    // game logic goes here
    // dealer hits until 17 or more - generate random numbers until count is high enough
    _getDealerCount() {

        // only generate new dealer count if the dealer hand has not already been assigned
        // to generate dearler count, keep adding to the running count using the algorithm until 17
        if (! this.state.dealerHandAssigned) {

            let hit = this._handAlgorithm(true, 0);
            
            while (hit < 17) {
                hit = hit + this._handAlgorithm(false, hit);
            }

            return hit;
 
        }
    
    }

    // this value is initialized when the state is created in the constructor
    _initialHit() {
        return this._handAlgorithm(true, 0);
    }

    // if the hit button is clicked,
    // call this function onClick
    // in the function, modify the state each time the click occurs
    _otherHit() {
        if (this.state.playerCanAct) {
           
            let newHitValue = this._handAlgorithm(false, this.state.playerCount);

            // instead of returning the old count + the new value, 
            // set the state to include the new hit value
            // only include the new hit value if the count is not already above 21
            if (this.state.playerCount <= 21) {
                this.setState({playerCount: this.state.playerCount + newHitValue});
            }
            else {
                this.setState({playerCount: this.state.playerCount});
            }
            
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
                this._setGameEndState();
            });
           
        }
        
    }

    // and set state for game win/loss/tie
    // compare player and dealer count
    // if player > 21, automatic loss
    // if player < 21 and dealer > 21, player wins
    // if player and dealer < 21, higher wins
    _setGameEndState() {

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

    // allow user to replay game
    // if a replay button is clicked at the end of the game,
    // reset all states back to default values
    // https://stackoverflow.com/questions/46617980/how-to-reload-a-page-state-in-a-react-app
    _replay() {

        this.setState({
            dealerCount: "TBD",
            playerCount: this._initialHit(),
            playerCanAct: true,
            dealerHandAssigned: false,
            playerCanStand: true,
            endGameState: "TBD",
        });

    }

    render() {

        // because we set the dealer & player displays to react states and call them as html objects,
        // we know that they will modify as defined by this.setState (instead of modifying directly)
        return(
            <div>

                <p id="game_interface">
                
                Dealer count: {this.state.dealerCount}
                
                <img src={blue_chip} alt="hit option" className="chip"
                onClick={this._otherHit}></img>

                <img src={purple_chip} alt="stand option" className="chip"
                onClick={this._stand}>
                </img>

                Player count: {this.state.playerCount}
                </p>

                <p id="end_state">
                    End game state: {this.state.endGameState}

                    <button id="replay_button" onClick={this._replay}>
                        Play again!
                    </button>
                </p>

            </div>
        );
    }

}
export default Game;
