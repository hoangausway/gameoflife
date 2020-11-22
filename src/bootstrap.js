import React from 'react'
import ReactDOM from 'react-dom'

import Gol from './components/GOL'

function App () {
  return (
    <>
      <h1>The Game Of Life</h1>
      <Gol />
    </>
  )
}

export default App

ReactDOM.render(<App />, document.getElementById('root'))
