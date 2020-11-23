import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { lifeCount } from './rulesOfLife'

const GridOfLife = ({ world, toggle }) => {
  const { arr, height, width } = world
  return (
    <StyledContainer>
      <StyledCount>Lives: {lifeCount(world.arr)}</StyledCount>
      <StyledGrid height={height} width={width}>
        {arr.map((v, i) => {
          const y = Math.floor(i / width)
          const x = i - y * width
          return (
            <StyledCell
              key={i}
              data-x={x}
              data-y={y}
              islive={v}
              onClick={toggle}
            />
          )
        })}
      </StyledGrid>
    </StyledContainer>
  )
}

GridOfLife.propTypes = { world: PropTypes.object, toggle: PropTypes.func }

export default GridOfLife

/*
  Helpers - Styled Components
*/
const StyledContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0.5rem;
  border: 1px solid navy;
`

const StyledCount = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.5rem;
  opacity: 0.7;
  font-size: 0.75rem;
`

const StyledGrid = styled.div`
  width: 100%;
  height: 100%;

  display: grid;
  grid-gap: 0px;
  grid-template-columns: ${props => `repeat(${props.width}, 1fr)`};
  grid-template-rows: ${props => `repeat(${props.height}, 1fr)`};
  border: 1px solid #fafafa;

  cursor: pointer;
`

const StyledCell = styled.div`
  background-color: ${props => (props.islive ? 'navy' : 'white')};
  border: 1px solid #f0f0f0;
`
