import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

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

const StyledSmall = styled.div`
  width: 100vw;
  height: calc(100vw + 160px);
`

const StyledBig = styled.div`
  width: 736px;
  height: calc(736px + 160px);

  margin: auto;
`

function App () {
  return (
    <>
      <Metadata title='Game Of Life' description='The game of life' />
      <h3 style={{ textAlign: 'center', paddingTop: '0.75rem' }}>The Game Of Life</h3>
      <SmallScreen>
        <StyledSmall>
          <Gol />
        </StyledSmall>
      </SmallScreen>
      <BigScreen>
        <StyledBig>
          <Gol />
        </StyledBig>
      </BigScreen>
    </>
  )
}

export default App

ReactDOM.render(<App />, document.getElementById('root'))
