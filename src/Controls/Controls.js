import React from 'react';
import ReactDOM from 'react-dom';
import './Controls.css';

class Controls extends React.Component {

    constructor(props) {
        super(props);
        
    }

    render() {
        return (
            <div>
                <h2 class="text">How to Play</h2>
                <p class="text"> Get as close to 21 as possible. Don't go over, or you lose! 
                To hit, click the blue button. To stand, click the purple button. </p>        
            </div>
        );
    }

    
}
export default Controls;