import React from 'react';
import ReactDOM from 'react-dom';
import './Game.css';

class Game extends React.Component {

    constructor(props) {
        super(props);
        this._getDealerCount = this._getDealerCount.bind(this);
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
    

    render() {

        let visible = this._getDealerCount()

        return(

            <div>
                <p>
                   {visible} 
                </p>
            </div>

        );
    }

}
export default Game;
