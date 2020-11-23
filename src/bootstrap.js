import React from 'react'
import ReactDOM from 'react-dom'

import { Helmet } from 'react-helmet'
import { useMediaQuery } from 'react-responsive'

import Gol from './components/GOL'
import '../src/styles/index.css'

const Metadata = ({ title, description }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
    </Helmet>
  )
}

const iPhonePlusLandscapeWidth = 736
const BigScreen = ({ children }) => {
  return useMediaQuery({ minWidth: iPhonePlusLandscapeWidth }) ? children : null
}
const SmallScreen = ({ children }) => {
  return useMediaQuery({ maxWidth: iPhonePlusLandscapeWidth - 1 })
    ? children
    : null
}

function App () {
  return (
    <>
      <Metadata title='Game Of Life' description='The game of life' />
      <h3>The Game Of Life</h3>
      <Gol />
    </>
  )
}

export default App

ReactDOM.render(<App />, document.getElementById('root'))
