import React, { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import title from '@/js/title'
import App from '@/App'
import axios from 'axios'
import { async } from 'regenerator-runtime'

if (module.hot) {
    module.hot.accept([
        './js/title.js'
    ])
}

// ReactDOM.render(<App />, document.getElementById('app'))
/**
 * ReactDOM.render is no longer supported in React 18. 
 * Use createRoot instead. 
 * Until you switch to the new API, your app will behave as if it’s running React 17. 
 * Learn more: https://reactjs.org/link/switch-to-createroot
 */
class AppWrapper extends React.Component {
    constructor(props) {
        super(props)
        this.handleMouseMove = this.handleMouseMove.bind(this)
        this.state = { rendered: false, x: 0, y: 0, userData: {} }
    }

    handleMouseMove(event) {
        this.setState({
            x: event.clientX,
            y: event.clientY
        })
    }
    componentDidMount() {
        axios.get('/api/users/denghuiquan').then(result => {
            this.setState({ rendered: true }) // 设置状态rendered为true
            document.title = title + ` rendered=${this.state.rendered}`
            this.setState({ userData: result.data })
        }).catch(err => {
            console.log(err.message)
        })
    }
    render() {
        return (
            <div onMouseMove={this.handleMouseMove}>
                <App rendered={this.state.rendered} userData={this.state.userData} ></App >
                <div style={{ position: 'fixed', textAlign: 'right', top: 0, right: 0 }}>
                    <h1>Move the mouse around!</h1>
                    <p>The current mouse position is ({this.state.x}, {this.state.y})</p>
                </div>
            </div >
        )
    }
}

const container = document.getElementById('app')
const root = createRoot(container) // createRoot(container!) if you use TypeScript
root.render(<AppWrapper />)