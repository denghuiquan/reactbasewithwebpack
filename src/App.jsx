import React, { Component } from 'react'
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom'
import Image from '@/js/image.js'
import BgButton from '@/js/bgbutton.js'
import Home from '@/components/home.jsx'
import About from '@/components/About.jsx'

import utils from '@/js/utils.js'
import Api from '@/js/api.js'
import '@/js/font.js'
import '@/css/index.css'

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
                <BrowserRouter>
                    <div>
                        <Link to={'/home'}>Home</Link>
                    </div>
                    <div>
                        <Link to={'/about'}>About</Link>
                    </div>

                    <Routes>
                        <Route path='/' element={<Home />}></Route>
                        <Route path='/home' element={<Home />}></Route>
                        <Route path='/about' element={<About />}></Route>
                    </Routes>
                </BrowserRouter>
                <h2>{this.state.title}</h2>
                {this.props.rendered &&
                    <div>
                        <p>the App dom is rendered</p>
                        <ul>
                            {Object.keys(this.props.userData).map((key) => {
                                const value = this.props.userData[key]
                                return (value && <li key={key.toString()}>
                                    <code>{`${key}: ${value}`}</code>
                                </li>)
                            })}
                        </ul>
                    </div>
                }
                <BgButton />
                <Image />
            </div>
        )
    }
}
export default App