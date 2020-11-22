import React from 'react'
import ReactDOM from 'react-dom'
import '../src/styles/index.css'
import Gol from './components/GOL'

function App () {
  return (
    <>
      <h3>The Game Of Life</h3>
      <Gol />
    </>
  )
}

export default App

ReactDOM.render(<App />, document.getElementById('root'))
