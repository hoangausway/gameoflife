import styled from 'styled-components'

export const Button = styled.div`
  height: ${ps => ps.height || '28px'};

  padding: 0rem 1rem;
  border-radius: 3px;

  font-size: 0.75rem;
  font-weight: 500;

  color: white;
  background-color: navy;

  cursor: pointer;
  text-align: center;

  display: flex;
  align-items: center;
  justify-content: center
`

export const CircleButton = styled(Button)`
  border-radius: 50%;
  width: ${ps => ps.size || '40px'};
  height: ${ps => ps.size || '40px'};
`
