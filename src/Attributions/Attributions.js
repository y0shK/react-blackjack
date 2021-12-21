import React from 'react';
import ReactDOM from 'react-dom';
import './Attributions.css';

// list citations
class Attributions extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return(
            <div>
                <p id="attr_info">
                All artwork is used without modification with either explicit permission or a Creative Commons license.
        <li> <a href="https://drawsgood.itch.io/8bit-deck-card-assets">Title screen joker: drawsgood, itch.io (permission)</a></li>
        <li> <a href="https://georgeblackwell.itch.io/playing-cards-sprite-pack">Playing cards: George Blackwell, itch.io  (Creative Commons Attribution v4.0)</a></li>
        <li> <a href="https://opengameart.org/content/playing-card-\nassets-52-cards-deck-chips">Poker chips: mehrasaur, OpenGameArt  (CC0 1.0)</a></li>
        <li> <a href="https://pbarry.itch.io/ability-icons"> Powerup icons: pbarry, itch.io  (permission)</a></li>
            
                </p>
            </div>
        );

    }
}
export default Attributions;
