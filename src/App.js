import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Game from './Game/Game.js';
import Controls from './Controls/Controls.js';
import Attributions from './Attributions/Attributions.js';

// https://stackoverflow.com/questions/33840150/onclick-doesnt-render-new-react-component

class App extends React.Component {

  constructor(props) {

    super(props);
    
    this.state = {
      play: false,
      htp: false,
      attr: false,
    };
    
    // necessary to bind each function
    this._play = this._play.bind(this);
    this._htpToggle = this._htpToggle.bind(this);
    this._attrToggle = this._attrToggle.bind(this);
  }

  _play() {

    // only click play game button once
    this.setState({play: true}); // do not want this to reset like the other two buttons

    // once the play game button is clicked, the other two buttons cannot be clicked
    this.setState({htp: false});
    this.setState({attr: false});
  }

  // if htp button is clicked, close attributions
  // and vice versa
  _htpToggle() {
  
    if (! this.state.play) {
      const currentHTP = this.state.htp;
      this.setState({htp: ! currentHTP});

      // if the attribution content is opened when the how to play menu is being opened,
      // then also close the attribution content
      if (this.state.attr) {
        this.setState({attr: ! this.state.attr});
        }
      }
  
  } 

  _attrToggle() {

    if (! this.state.play) {
      const currentATTR = this.state.attr;
      this.setState({attr: ! currentATTR});

      // vice versa for how to play content
      if (this.state.htp) {
        this.setState({htp: ! this.state.htp});
      }
    }
    
  }

  render() {

    return (
      <div>
        <h1>React Blackjack</h1>
        <h2>Made by Yash Karandikar</h2>

        <button onClick={this._play} id="play_button">Play Game</button>
        {this.state.play ?
          <Game /> :
          null
        }
        
        <button onClick={this._htpToggle} id="htp_button">How to Play </button>
        {this.state.htp ?
           <Controls /> :
           null
        }
        
        <button onClick={this._attrToggle} id="attr_button">Attributions</button>
        {this.state.attr ?
          <Attributions /> :
          null
        }

      </div>
    );
  }
}
export default App;
