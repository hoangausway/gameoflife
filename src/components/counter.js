import React from 'react'

const Counter = (props) => {
  const [count, setCount] = React.useState(0)
  return (
    <>
      <p>My count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </>
  )
}

export default Counter
