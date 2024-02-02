import {Component} from 'react'

import './index.css'

const initialState = {timerStatus: false, timerCount: 25, timerElapsed: 0}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimeInterval()
  }

  clearTimeInterval = () => clearInterval(this.timerId)

  onIncrement = () => {
    this.setState(prevState => ({timerCount: prevState.timerCount + 1}))
  }

  onDecrement = () => {
    this.setState(prevState => ({timerCount: prevState.timerCount - 1}))
  }

  renderTimeLimitController = () => {
    const {timerCount, timerElapsed} = this.state
    const isButtonDisable = timerElapsed > 0

    return (
      <div>
        <p>Set Timer Limit</p>
        <button
          type="button"
          onClick={this.onDecrement}
          disabled={isButtonDisable}
          className="value"
        >
          <p className="v">-</p>
        </button>
        <p className="v">{timerCount}</p>
        <button
          type="button"
          onClick={this.onIncrement}
          disabled={isButtonDisable}
          className="value"
        >
          <p className="v">+</p>
        </button>
      </div>
    )
  }

  incrementTimeSeconds = () => {
    const {timerCount, timerElapsed} = this.state
    const isTimeCompleted = timerElapsed === timerCount * 60
    if (isTimeCompleted) {
      this.setState({timerStatus: false})
    } else {
      this.setState(prevState => ({timerElapsed: prevState.timerStatus + 1}))
    }
  }

  startOrPause = () => {
    const {timerStatus, timerCount, timerElapsed} = this.state
    const isTimeCompleted = timerElapsed === timerCount * 60
    if (isTimeCompleted) {
      this.setState({timerElapsed: 0})
    }
    if (timerStatus) {
      this.clearTimeInterval()
    } else {
      this.timerId = setInterval(this.incrementTimeSeconds(), 1000)
    }
    this.setState({timerStatus: !timerStatus})
  }

  resetBtn = () => {
    this.clearTimeInterval()
    this.setState(initialState)
  }

  renderTimerController = () => {
    const {timerStatus} = this.state
    const StartOrPauseImageUrls = timerStatus
      ? 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
    const StartOrPauseAltText = timerStatus ? 'play icon' : 'pause icon'

    return (
      <div>
        <button
          type="button"
          onClick={this.startOrPause}
          className="Stat-Puase-btn"
        >
          <img
            src={StartOrPauseImageUrls}
            alt={StartOrPauseAltText}
            className="StartOrPause"
          />
        </button>
        {timerStatus ? <p>Start</p> : <p>Pause </p>}
        <button
          type="button"
          className="Stat-Puase-btn"
          onClick={this.resetBtn}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            alt="reset icon"
            className="StartOrPause"
          />
        </button>
        <p>Reset</p>
      </div>
    )
  }

  getElphasedSeconds = () => {
    const {timerCount, timerElapsed} = this.state
    const totalRemainingSeconds = timerCount * 60 - timerElapsed
    const Minutes = Math.floor(totalRemainingSeconds / 60)
    const Seconds = Math.floor(totalRemainingSeconds % 60)
    const StringfyMinutes = Minutes > 9 ? Minutes : `0${Minutes}`
    const StringfySeconds = Seconds > 9 ? Seconds : `0${Seconds}`

    return `${StringfyMinutes} : ${StringfySeconds}`
  }

  render() {
    const {timerElapsed, timerCount, timerStatus} = this.state
    const renderValues = this.renderTimerController()
    console.log(timerCount)
    console.log(timerElapsed)
    console.log(timerStatus)
    const labelText = timerStatus ? 'Running' : 'Paused'

    return (
      <div className="bg">
        <h1>Digital Timer</h1>
        <div className="timer-bg">
          <h1 className="timer">{this.getElphasedSeconds()}</h1>
          <p>{labelText}</p>
        </div>
        <div>{renderValues}</div>
        <div>{this.renderTimeLimitController()}</div>
      </div>
    )
  }
}

export default DigitalTimer
