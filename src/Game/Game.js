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
            dealerCount: -1,
            playerCount: this._initial_hit(),
            playerCanAct: true,
            dealerHandAssigned: false,
            playerCanStand: true,
            gameFinished: false,
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

        let count = 0;

        if (! this.state.dealerHandAssigned) {
            
            let val = Math.floor(Math.random() * (10-2) + 2);
            count = val;

            while (count < 17) {
                val = Math.floor(Math.random() * (10-2) + 2);
                count = count + val;
            }

            return count;
 
        }
    
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
        if (this.state.playerCanAct) {
            this.setState({playerCount: this.state.playerCount + Math.floor(Math.random() * (10-2) + 2)})
        }
    }
    
    // if the stand button is clicked,
    // player's turn is over
    // also show the dealer count
    _stand() {

        if (this.state.playerCanStand) {
            // lock player's ability to hit
            this.setState({playerCanAct: false});

            // show dealer count

            // react setState is async
            // to ensure that we call the function on the updated value,
            // call the function inside setState
            // https://stackoverflow.com/questions/36085726/why-is-setstate-in-reactjs-async-instead-of-sync

            const dealer = this._getDealerCount();
            this.setState({dealerCount: dealer}, () => {
                this._set_game_end_state();
            });


            this.setState({dealerHandAssigned: true}); // cannot reassign dealer hand multiple times
            this.setState({playerCanStand: false}); // can't stand multiple times

            // game is over - show end state
            this.setState({gameFinished: true});
            return this.state.dealerCount;
        }
        
    }

    // and set state for game win/loss/tie
    // compare player and dealer count
    // if player > 21, automatic loss
    // if player < 21 and dealer > 21, player wins
    // if player and dealer < 21, higher wins
    _set_game_end_state() {
        console.log(this.state.playerCount);
        console.log(this.state.dealerCount);

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
