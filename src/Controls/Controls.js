import React from 'react';
import ReactDOM from 'react-dom';
import './Controls.css';

// list game controls
class Controls extends React.Component {
    constructor(props) {
        super(props);
        
    }

    render() {
        return (
            <div>
                <p class="text">
                    This game is a blackjack variant that provides the player with power-ups to balance against
        the implicit edge of the dealer. An explanation of each power-up can be found in
        the "How to Play" section. I hope you have fun playing the game! </p>

                <h2 class="text">How to Play</h2>
                <p class="text"> Get as close to 21 as possible. Don't go over, or you lose! </p>
                
            </div>
        );
    }

    
}
export default Controls;