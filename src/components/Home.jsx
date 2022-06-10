import React, { Component } from 'react'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            link: '/home',
            tabName: 'Home'
        }
    }
    render() {
        return (
            <div>
                <h2>{this.state.tabName} Component Page</h2>
            </div>
        )
    }
}

export default Home