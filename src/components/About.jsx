import React, { Component } from 'react'

class About extends Component {
    constructor(props) {
        super(props)
        this.state = {
            link: '/about',
            tabName: 'About'
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

export default About