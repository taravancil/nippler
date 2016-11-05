import React from 'react'
import ReactDOM from 'react-dom'

import Editor from './components/Editor'

navigator.serviceWorker.register('service-worker.js', {
  scope: '.'
})

ReactDOM.render(<Editor />, document.getElementById('nippler-container'))
