import React from 'react'
import ReactDOM from 'react-dom'

import Gol from './components/GOL'

function App () {
  return (
    <>
      <h1>Hello from Game Of Life App</h1>
      <Gol />
    </>
  )
}

export default App

ReactDOM.render(<App />, document.getElementById('root'))
