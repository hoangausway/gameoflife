import React, { useState } from 'react'
import styled from 'styled-components'

import { drawPattern, lifeCount } from './rules-of-life'
import { patterns } from './patterns' /* pre-defined GOL patterns */
import useEventOfLife from './use-event-of-life'
import GridOfLife from './grid-of-life'
import GOLControlPanel from './gol-control'

// const initialWorld = drawPattern(HEIGHT, WIDTH, pattern)
const makePattern = (patternName, originX, originY) => ({
  matrix: patterns[patternName],
  originX,
  originY
})
const makeResetEvent = (tick, pattern) => ({
  world_event_reset: { pattern, tick }
})

const StyledGOL = styled.div`
  display: grid;
  grid-template-rows: 60px 1fr;
  align-items: center;

  width: 100%;
  height: 100%;
`
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
      <GridOfLife world={world} toggle={toggleEmit} />
    </StyledGOL>
  )
}
export default Gol
