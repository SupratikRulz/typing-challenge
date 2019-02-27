import React, { Component } from 'react';
import Timer from './Timer';
import Result from './Result';
import GameContainer from './GameContainer';


import './App.css';

class App extends Component {

  constructor() {
    super();

    this.state = {
      timerActive: true,
      stopTimer: false
    }
    this.correctCount = 0;
    this.incorrectCount = 0;
    this.wpm = 0;
    this.timeElapsed = 0;
  }


  
  showResult = () => {
    this.stopTimer();
    console.log(this.correctCount, this.incorrectCount);
  }

  incrementCorrect = () => {
    this.correctCount += 1; 
  }

  incrementIncorrect = () => {
    this.incorrectCount += 1; 
  }

  setWPM = wpm => {
    this.wpm = wpm;
  }

  setTimeElapsed = ms => {
    this.timeElapsed = ms;
  }

  stopTimer = () => {
    this.setState({
      stopTimer: true
    })
  }

  deactivateTimer = () => {
    this.setState({
      timerActive: false
    })
  }

  render() {
    
    return (
      <div className="App container-fluid">
        {
          this.state.stopTimer ? null :
          <Timer 
            showResult={this.showResult}
            stopTimer={this.state.stopTimer}
            setTimeElapsed={this.setTimeElapsed}
          />
        }
        <GameContainer 
          incrementIncorrect={this.incrementIncorrect}
          incrementCorrect={this.incrementCorrect}
          showResult={this.showResult}
          stopTimer={this.state.stopTimer}
          setWPM={this.setWPM}
        />

        {
          this.state.stopTimer && (
            <Result 
              accuracy={ (this.correctCount + this.incorrectCount) && (((this.correctCount * 100) / (this.correctCount + this.incorrectCount)).toFixed(2) + '%') || '0.00%'}
              wpm={this.wpm}
              timeElapsed={this.timeElapsed}
            />
          )
        }
      </div>
    );
  }
}

export default App;
