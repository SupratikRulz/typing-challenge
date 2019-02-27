import React, { Component } from 'react';
import './GameContainer.css';
import WPM from './WPM';
import axios from 'axios';

export default class GameContainer extends Component {

  constructor() {
    super();
    this.state = {
      text: 'Lorem ipsum dolor ben! hhsdj fff',
      currentIndex: 0,
      arrText: [],
      domArr: [],
      correctCount: 0,
      incorrectCount: 0,
      wordCount: 0,
      wpm: 0
    };
    this.timeStart = 0;
  }

  componentDidMount = () => {

    fetch('https://www.randomtext.me/api/')
      .then(data => data.json())
      .then(data => data.text_out.replace(/(<p>)|(<\/p>)/ig, ''))
      .then(text => {

        let arrText = text.split(' '),
          domArr = arrText.map((text, index) => (<div key={index} className="untouch">{text}&nbsp;</div>));
        this.setState({
          arrText,
          domArr
        });
  
        this.timeStart = new Date().getTime();
      })
  }
  

  handleKeyPress = e => {
    let arrText = [...this.state.arrText],
      currentIndex = this.state.currentIndex,
      domArr = [...this.state.domArr],
      correctCount = this.state.correctCount,
      incorrectCount = this.state.incorrectCount,
      wordCount = this.state.wordCount,
      timeNow = new Date().getTime(),
      timeElapsed = timeNow - this.timeStart,
      wpm;
    let value = e.target.value.trim();
    if (e.keyCode === 32) {
      if (arrText[currentIndex] === value) {
        domArr[currentIndex] = (<span key={currentIndex} className="correct">{arrText[currentIndex]}&nbsp;</span>)
        currentIndex++;
        e.target.value = "";
        correctCount++;
        this.props.incrementCorrect();
        wordCount++;
        wpm = Math.floor((wordCount / timeElapsed) * 1000 * 60);
        this.props.setWPM(wpm);
        if (currentIndex === arrText.length) {
          this.props.showResult(correctCount, incorrectCount);
        }
        this.setState({
          domArr,
          currentIndex,
          correctCount,
          wordCount,
          wpm
        });
      } else {
        domArr[currentIndex] = (<span key={currentIndex} className="incorrect">{arrText[currentIndex]}&nbsp;</span>)
        incorrectCount++;
        this.props.incrementIncorrect();
        this.setState({
          domArr,
          incorrectCount
        });
      }

    }
  }

  render() {
    
    return (
      this.props.stopTimer ? null : 
      (<>
        <WPM wpm={this.state.wpm}/>
        <div className='row'>
          <div className='col-10 ml-auto mr-auto'>
            <div className='row'>
              {this.state.domArr}
            </div>
            <div className='row mt-10'>
              <input type='text' onKeyUp={this.handleKeyPress}></input>
            </div>
          </div>
        </div>
      </>)
    )
  }
}
