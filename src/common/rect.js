import React from 'react'
import styled from 'styled-components'

const StyledRect = styled.div`
  width: 100%;
  display: grid;
  & > * {
    grid-area: 1/1;
  }
`
export const Rect = ({ children, w = 1, h = 1 }) => {
  return (
    <StyledRect>
      <svg viewBox={`0 0 ${w} ${h}`} />
      {children}
    </StyledRect>
  )
}
