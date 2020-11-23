import React from 'react'
import { of, Subject, merge } from 'rxjs'
import {
  map,
  scan,
  debounceTime,
  distinctUntilChanged,
  switchMap
} from 'rxjs/operators'

import styled from 'styled-components'

import { Select } from '../common/select'
import { Button } from '../common/button'

const GOLControlPanel = ({
  resetEmit,
  pauseEmit,
  patterns,
  options,
  count
}) => {
  const [
    initialTick,
    initialPatternName,
    initialOriginX,
    initialOriginy
  ] = options

  const initialState = {
    isPaused: false,
    patternName: initialPatternName,
    originX: initialOriginX,
    originY: initialOriginy,
    tick: initialTick,
    selectionNames: ''
  }

  const [state, setState] = React.useState(initialState)

  const stateObserver = state => setState(state)
  const [
    isPausedEmit,
    patternNameEmit,
    patterNameKeyUpEmit,
    originXEmit,
    originYEmit,
    tickEmit
  ] = useEventPanel(stateObserver, initialState, Object.keys(patterns).sort())

  const resetHandler = e => {
    const key = patterns.hasOwnProperty(state.patternName)
      ? state.patternName
      : 'EMPTY'
    const ev = {
      ...e,
      world_event_reset: {
        pattern: {
          matrix: patterns[key],
          originX: state.originX,
          originY: state.originY
        },
        tick: state.tick
      }
    }
    resetEmit(ev)
  }

  const pauseHandler = e => {
    isPausedEmit(e)
    pauseEmit(e)
  }

  const patOptions = Object.keys(patterns)
    .sort()
    .map((pat, idx) => ({ value: idx, label: pat }))
  const handler = selected => {
    patternNameEmit({ target: { value: selected.label } })
    const ev = {
      world_event_reset: {
        pattern: {
          matrix: patterns[selected.label],
          originX: state.originX,
          originY: state.originY
        },
        tick: state.tick
      }
    }
    resetEmit(ev)
  }
  const patValue = patOptions.find(
    patOption => patOption.label === initialPatternName
  )

  return (
    <StyledPanel>
      <StyledLeft>
        <Button onClick={pauseHandler}>{state.isPaused ? 'Play' : 'Pause'}</Button>
        <label>{'Lives: ' + count}</label>
      </StyledLeft>
      <StyledRight>
        <div>
          <Select
            defaultValue={patValue}
            options={patOptions}
            onChange={handler}
          />
        </div>
        <StyledParams>
          <StyledInput>
            <label>X</label>
            <input
              type='number'
              placeholder='X origin'
              value={state.originX}
              onChange={originXEmit}
            />
          </StyledInput>
          <StyledInput>
            <label>Tick</label>
            <input
              type='number'
              placeholder='X origin'
              value={state.tick}
              onChange={tickEmit}
            />
          </StyledInput>
          <StyledInput>
            <label>Y</label>
            <input
              type='number'
              placeholder='Y origin'
              value={state.originY}
              onChange={originYEmit}
            />
          </StyledInput>
          <div>
            <Button onClick={resetHandler}>Set</Button>
          </div>
        </StyledParams>
      </StyledRight>
    </StyledPanel>
  )
}

export default GOLControlPanel

const getNames = chars => patternNameArray =>
  patternNameArray
    .filter(v => v.indexOf(chars.toUpperCase()) > -1)
    .sort()
    .join(' ')

const useEventPanel = (stateObserver, initialState, patternNameArray) => {
  // define events and related triggers
  const [isPausedEmit, isPausedEvent$] = useEvent()
  const [patternNameEmit, patternNameEvent$] = useEvent()
  const [patterNameKeyUpEmit, patterNameKeyUpEvent$] = useEvent()
  const [originXEmit, originXEvent$] = useEvent()
  const [originYEmit, originYEvent$] = useEvent()
  const [tickEmit, tickEvent$] = useEvent()

  const isPaused$ = isPausedEvent$.pipe(
    map(e => state => ({ ...state, isPaused: !state.isPaused }))
  )
  const patternName$ = patternNameEvent$.pipe(
    map(e => state => ({ ...state, patternName: e.target.value.toUpperCase() }))
  )
  const originX$ = originXEvent$.pipe(
    map(e => state => ({ ...state, originX: parseInt(e.target.value) }))
  )
  const originY$ = originYEvent$.pipe(
    map(e => state => ({ ...state, originY: parseInt(e.target.value) }))
  )
  const tick$ = tickEvent$.pipe(
    map(e => state => ({ ...state, tick: parseInt(e.target.value) }))
  )

  // type ahead for patternName
  const patterNameKeyUp$ = patterNameKeyUpEvent$.pipe(
    map(e => e.target.value),
    debounceTime(300),
    distinctUntilChanged(),
    switchMap(chars => of(getNames(chars)(patternNameArray))),
    map(names => state => ({ ...state, selectionNames: names }))
  )

  /*
    values emitted by each stream above are functions f: old state => new state
    merge them then scan to make stream of state values: state ... state ...
  */
  const state$ = merge(
    isPaused$,
    patternName$,
    patterNameKeyUp$,
    originX$,
    originY$,
    tick$
  ).pipe(scan((state, f) => f(state), initialState))

  React.useEffect(() => {
    const stateSub = state$.subscribe(stateObserver)

    return () => {
      stateSub.unsubscribe()
    }
    // eslint-disable-next-line
  }, [])

  return [
    isPausedEmit,
    patternNameEmit,
    patterNameKeyUpEmit,
    originXEmit,
    originYEmit,
    tickEmit
  ]
}

const useEvent = (deps = []) => {
  // eslint-disable-next-line
  const eventStream$ = React.useMemo(() => new Subject(), deps)
  // eslint-disable-next-line
  const eventEmit = React.useCallback(e => eventStream$.next(e), deps)
  return [eventEmit, eventStream$]
}

// Helpers styled
const StyledPanel = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr;
  grid-gap: 6px;

  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;

  & > :nth-child(1) {
    width: 100px;
  }
  & > :nth-child(2) {
    width: 300px;
  }

`

const StyledLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: left;

  & > :nth-child(1) {
    height: 100%;
  }
  & > :nth-child(2) {
    height: 28px;
    padding-top: 0.5rem;
  }

  border: 1px solid blue;
  padding: 0.5rem;
`
const StyledRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: left;
`

const StyledParams = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 12px;

  & > :nth-child(4) {
    text-align: right;
  }

  border: 1px solid blue;
  padding: 0.5rem;
  margin-top: 0.5rem;
`

const StyledInput = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  & > :nth-child(2) {
    width: 60px;
    height: 28px;
    padding: 6px;
    margin-left: 2px;
  }
`
