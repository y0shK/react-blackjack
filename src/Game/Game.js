import React from 'react';
import ReactDOM from 'react-dom';
import './Game.css';
import blue_chip from '../assets/blue_chip.png';

class Game extends React.Component {

    // set state for hit button click
    // if button is clicked, add to initial hit count

    constructor(props) {
        super(props);
        this.state = {
            update: false,
        }

        this._getDealerCount = this._getDealerCount.bind(this);
        this._initial_hit = this._initial_hit.bind(this);
        this._toggle = this._toggle.bind(this);
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
        console.log("final:");
        console.log(count);

        return count;
    }

    // player starts with a random count (2-10)
    // can hit as needed
    _initial_hit() {
        return Math.floor(Math.random() * (10-2) + 2);
    }

    // obtain initial hit count
    // add to it
    // return value every single time button is pressed
    //_hit_button(original) {
      //  this.setState({update: true});
        //let value = original + Math.floor(Math.random() * (10-2) + 2);
        //console.log(value);
        // return value;
    //}

    _toggle() {
        this.setState({update: true});   
    }
    
    render() {

        let visible = this._getDealerCount()
        let visiblePlayer = this._initial_hit()

        // if the state is set to true, add to the hit count and set the state to false again
        // this allows for the state to switch every time the hit button is clicked
        if (this.state.update) {
            visiblePlayer = visiblePlayer + Math.floor(Math.random() * (10-2) + 2);
            this.setState({update: false});
        }

        return(

            <div>

                <p className="dealer_count">
                
                Dealer count: {visible}
                
                <img src={blue_chip} alt="hit option" id="blue_chip_hit"
                onClick={this._toggle}></img>

                Player count: {visiblePlayer}

                </p>

                   <p> 
                </p>
                
            </div>
            

        );
    }

}
export default Game;
