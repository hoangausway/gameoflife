import React from 'react'
import styled, { css } from 'styled-components'
import { useMediaQuery } from 'react-responsive'
import Gol from './golcombined'

const WIDTH = 736 // iPhonePlusLandscapeWidth
const barHeight = 160

const StyledWrapper = styled.div`
  padding: 0.5rem;
  ${ps =>
    ps.isSmall
      ? css`
          width: 100vw;
          height: calc(100vw + ${barHeight}px);
        `
      : css`
          width: ${WIDTH}px;
          height: calc(${WIDTH}px + ${barHeight}px);
        `}
`

const GameOfLife = () => {
  const isSmall = useMediaQuery({ maxWidth: WIDTH - 1 })
  return (
    <>
      <StyledWrapper isSmall={isSmall}>
        <Gol />
      </StyledWrapper>
    </>
  )
}

export default GameOfLife
