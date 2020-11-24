import { css } from 'styled-components'

export const bodyMixin = css`
  font-family: Helvetica, Arial, sans-serif;
  font-size: 16px;
  font-weight: 200;
  overflow-x: hidden;
  color: black;
  max-width: 736px;
  margin: auto;

  a,
  a:hover,
  a:visited,
  a:link,
  a:active {
    text-decoration: none;
  }
`

export const gridLayoutMixin = css`
  display: grid;
  grid-template-columns: minmax(10rem, 1fr) minmax(10rem, 1fr);
  grid-template-rows: auto;
  grid-gap: 0;
  align-items: start;
`
export const simpleButtonMixin = css`
  border-radius: 5px;
  border: 1px solid lightgray;
  color: ${ps => ps.theme.palette.contrastText};
  cursor: pointer;

  font-size: 0.85rem;
  font-weight: 400;

  text-align: center;
`
export const simpleLinkMixin = css`
  color: ${ps => ps.theme.palette.contrastText};
  cursor: pointer;

  font-size: 0.85rem;
  font-weight: 400;
  text-decoration: underline;
  text-align: right;
`
export const ellipsisMixin = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
