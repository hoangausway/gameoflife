import React from 'react'
import styled from 'styled-components'

import { useMediaQuery } from 'react-responsive'

import Gol from './GOL'
import '../styles/index.css'

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

const GameOfLife = () => {
  return (
    <>
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

export default GameOfLife
