import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Game from './Game/Game.js';
import Controls from './Controls/Controls.js';
import Attributions from './Attributions/Attributions.js';

// home screen component should have three buttons
// each button switches to a new component that handles the functionality
// play game - starts blackjack game
// how to play - explains rules
// attributions - loads sources (images, etc.) used in game

// use a class to switch components on button click
/*
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      play: false,
      htp: false,
      attr: false
    }
    this._handleHTP = this._handleHTP.bind(this);
  }

  _handleHTP(props) {
    this.setState(prevState => ({
      htp: !prevState.htp
    }))
    const htpBool = props.htp;
    if (htpBool) {
      return <Controls />;
    }
  }

  render() {
    return (
      <button onClick={this._handleHTP}>
        How to Play
      </button>
    );
  }
}
*/

// https://stackoverflow.com/questions/33840150/onclick-doesnt-render-new-react-component

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      play: false,
      htp: false,
      attr: false,
    };
    this._play = this._play.bind(this);
    this._htpToggle = this._htpToggle.bind(this);
    this._attrToggle = this._attrToggle.bind(this);
  }

  _play() {
    // only click play game button once
    // cannot click either other button
    this.setState({play: true}); // do not want this to reset like the other two buttons
    // console.log(this.state.play) // true

    // once the play game button is clicked, the other two buttons cannot be clicked
    this.setState({htp: false});
    this.setState({attr: false});
  }

  _htpToggle() {
    if (! this.state.play) {
      const currentHTP = this.state.htp;
      this.setState({htp: ! currentHTP});
      // console.log(this.state.htp);

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
      // console.log(this.state.attr);

      // vice versa for how to play content
      if (this.state.htp) {
        this.setState({htp: ! this.state.htp});
      }
    }
    
  }

  render() {
    return (

      <div>
        <h1>Wacky Blackjack</h1>
        <h2>A Blackjack Variant</h2>

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
