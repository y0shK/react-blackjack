import React from 'react';
import ReactDOM from 'react-dom';
import './Attributions.css';

// list citations for other elements used
class Attributions extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return(
            <div>
                <p id="attr_info">
                    All artwork is used without modification with either explicit permission or a Creative Commons license.
                    <li> <a href="https://opengameart.org/content/playing-card-\nassets-52-cards-deck-chips">Poker chips: mehrasaur, OpenGameArt  (CC0 1.0)</a></li>
                </p>
            </div>
        );

    }
}
export default Attributions;
