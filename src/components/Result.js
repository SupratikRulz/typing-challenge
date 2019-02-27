import React, { Component } from 'react'

export default class Result extends Component {
  render() {
    const {accuracy, wpm, timeElapsed} = this.props;
    return (
      <div>
        <p>The Result is:</p>
        <p>
          Accuracy: {accuracy} <br></br>
          WPM: {wpm} <br></br>
          Time Elapsed: {Math.floor((timeElapsed % (1000 * 60 * 60))/ (1000 * 60))}:{ Math.floor((timeElapsed % (1000 * 60)) / 1000)}
        </p>
      </div>
    )
  }
}
