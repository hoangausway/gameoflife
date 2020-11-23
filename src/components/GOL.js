import React, { useState } from 'react'
import styled from 'styled-components'

import { drawPattern, lifeCount } from './rulesOfLife'
import { patterns } from './patterns' /* pre-defined GOL patterns */
import useEventOfLife from './useEventOfLife'
import GridOfLife from './GridOfLife'
import GOLControlPanel from './GOLControlPanel'

// const initialWorld = drawPattern(HEIGHT, WIDTH, pattern)
const makePattern = (patternName, originX, originY) => ({
  matrix: patterns[patternName],
  originX,
  originY
})
const makeResetEvent = (tick, pattern) => ({
  world_event_reset: { pattern, tick }
})

const Gol = ({
  height = 40,
  width = 40,
  initialPatternName = 'ROTEIGHTOR',
  initialOriginX = 5,
  initialOriginY = 5,
  initialTick = 1000
}) => {
  const initialPattern = makePattern(
    initialPatternName,
    initialOriginX,
    initialOriginY
  )
  const initialResetEvent = makeResetEvent(initialTick, initialPattern)
  const initialWorld = drawPattern(height, width, initialPattern)

  // states: world, lives count
  const [world, setWorld] = useState(initialWorld)
  const [count, setCount] = useState(lifeCount(initialWorld.arr))

  // observers which will update states
  const worldObserver = setWorld
  const pauseObserver = paused => console.log(`Is paused? ${!paused}`)
  const countObserver = setCount
  const resetObserver = e => console.log('RESET')

  /*
    wrapper of business logics of the game of life
    return a set of handlers/emitter which can be used to raise/trigger events
    from inside the wrapper, the observers will be called as events happen
  */
  const [resetEmit, pauseEmit, toggleEmit] = useEventOfLife(
    [worldObserver, pauseObserver, countObserver, resetObserver],
    initialWorld,
    initialResetEvent
  )

  return (
    <StyledGOL>
      <div>
        <GOLControlPanel
          resetEmit={resetEmit}
          pauseEmit={pauseEmit}
          patterns={patterns}
          options={[
            initialTick,
            initialPatternName,
            initialOriginX,
            initialOriginY
          ]}
          count={count}
        />
      </div>
      <div style={style}>
        <GridOfLife world={world} toggle={toggleEmit} />
      </div>
    </StyledGOL>
  )
}
export default Gol

const style = {
  width: '400px',
  height: '400px',
  border: '1px solid navy',
  margin: '0.5em',
  padding: '3px'
}

const StyledGOL = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  /* background: lightgray; */
`
