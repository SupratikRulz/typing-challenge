import React, { Component } from 'react';

export default class Timer extends Component {
  constructor() {
    super();
    this.state = {
      timer: 0,
      timeRef: null
    }
  }

  componentDidMount() {
    let totalTime = 1000 * 60 * 2;
    let timeLeft = totalTime,
    timeElapsed = 0;
    var time = setInterval(() => {
      timeLeft-= 1000;
      timeElapsed += 1000;
      this.props.setTimeElapsed(timeElapsed);
      this.setState({
        timer: timeLeft
      })

      if (timeLeft <= 0) {
        clearInterval(time);
        // this.props.deactivateTimer();
        this.props.showResult()
      }
    }, 1000);

    this.setState({
      timer: totalTime,
      timeRef: time
    });

  }
  
  render() {
    let millis = this.state.timer,
      seconds = Math.floor((millis % (1000 * 60)) / 1000),
      minutes = Math.floor((millis % (1000 * 60 * 60))/ (1000 * 60));
    if (this.props.stopTimer) {
      clearInterval(this.state.timeRef);
    }
    return (
      <div>
        {minutes} : {seconds}
      </div>
    )
  }
}
