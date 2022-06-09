import React, { Component } from 'react'
import Image from './js/image.js'
import BgButton from './js/bgbutton.js'

import utils from './js/utils.js'
import Api from './js/api.js'
import './js/font.js'
import './css/index.css'

console.log(Api.getUserInfo(9527))
console.log(Api.ajaxAsync('https://www.lookatme.com'))
console.log(utils.sum(120, 233))
console.log(utils.square(12))

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '前端工程化之React built with Webpack.xxxx'
        }
    }
    render() {
        return (
            <div>
                <h2>{this.state.title}</h2>
                {this.props.rendered &&
                    <p>{'the App dom is rendered'}</p>
                }
                <BgButton />
                <Image />
            </div>
        )
    }
}
export default App