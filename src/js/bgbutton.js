import "@/css/bgbutton.less"
import "@/css/bgbutton.css"
import React, { Component } from 'react'

class BgButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      h2: 'Tell webpack that Button.js uses these styles',
      className: 'bgBox'
    }
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    this.setState(prevState => ({
      className: prevState.className == 'bgBoxSmaller' ? 'bgBox' : 'bgBoxSmaller'
    }))
  }
  render() {
    return (
      <div>
        <div className={this.state.className}>
          <h2>{this.state.h2}</h2>
        </div>
        <div className="image-center">
          <button className="btn-chbg" onClick={this.handleClick}>TT-.-TT</button>
        </div>
      </div>
    )
  }
}

export default BgButton
