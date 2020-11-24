import React from 'react'
import ReactDOM from 'react-dom'
import { Helmet } from 'react-helmet'

import GameOfLife from './components/gameoflife'
import './styles/index.css'

const Metadata = ({ title, description }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
    </Helmet>
  )
}

function App () {
  return (
    <>
      <Metadata title='Game Of Life' description='The game of life' />
      <h3 style={{ textAlign: 'center', paddingTop: '0.75rem' }}>
        The Game Of Life
      </h3>
      <GameOfLife />
    </>
  )
}

export default App

ReactDOM.render(<App />, document.getElementById('root'))
