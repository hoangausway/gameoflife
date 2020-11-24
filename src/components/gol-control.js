import React, { useState } from 'react'
import { of, Subject, merge } from 'rxjs'
import {
  map,
  scan,
  debounceTime,
  distinctUntilChanged,
  switchMap
} from 'rxjs/operators'

import styled from 'styled-components'

import { Select, Button } from '../common'

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
    setShown(!shown)
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

  const [shown, setShown] = useState(true)
  return (
    <>
      <StyledPanel shown={shown}>
        <Button onClick={() => setShown(!shown)}>Params</Button>
        <Button
          bgColor={state.isPaused ? 'green' : '#9f0000'}
          onClick={pauseHandler}
        >
          {state.isPaused ? 'Play' : 'Pause'}
        </Button>
        <Select
          defaultValue={patValue}
          options={patOptions}
          onChange={handler}
        />
      </StyledPanel>
      <StyledParams shown={!shown}>
        <Button onClick={resetHandler}>OK</Button>
        <StyledInput>
          <div>X</div>
          <input
            type='number'
            placeholder='X origin'
            value={state.originX}
            onChange={originXEmit}
          />
        </StyledInput>
        <StyledInput>
          <div>Y</div>
          <input
            type='number'
            placeholder='Y origin'
            value={state.originY}
            onChange={originYEmit}
          />
        </StyledInput>
        <StyledInput>
          <div>Tick</div>
          <input
            type='number'
            placeholder='tick'
            value={state.tick}
            onChange={tickEmit}
          />
        </StyledInput>
      </StyledParams>
    </>
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
  display: ${ps => (ps.shown ? 'grid' : 'none')};
  grid-template-columns: 80px 80px 1fr;
  grid-gap: 6px;
  align-items: center;

  width: 100%;
  height: 100%;
  padding: 0.5rem 0;
  margin-top: 0.5rem;
`
const StyledParams = styled.div`
  display: ${ps => (ps.shown ? 'flex' : 'none')};
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  width: 100%;
  height: 100%;
  padding: 0.5rem 0;
  margin-top: 0.5rem;

  & > * {
    margin-left: 0.5rem;
  }
  & > :nth-child(1) {
    width: 80px;
    margin-left: 0;
  }
`
const StyledInput = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;

  height: 100%;
  margin-bottom: 0.2rem;

  & > :nth-child(1) {
    font-size: 0.55rem;
    font-weight: 600;
  }
  & > :nth-child(2) {
    font-size: 0.55rem;
    height: 24px;
    max-width: 65px;
    padding: 0.2rem;
  }
`
