import React, { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import title from '@/js/title'
import App from '@/App'
import axios from 'axios'

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

function AppWithCallbackAfterRender(state) {
    const [rendered, setRendered] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setRendered(true) // 设置状态rendered为true
            document.title = title + ` rendered=${rendered}`
        }, 2000)
    })

    return <App rendered={rendered} tab="home" />
}
const container = document.getElementById('app')
const root = createRoot(container) // createRoot(container!) if you use TypeScript
root.render(<AppWithCallbackAfterRender />)
axios.get('/api/users/denghuiquan').then(result => {
    console.log(result, '<-----github.com users api result-----')
}).catch(err => {
    console.log(err.message)
})