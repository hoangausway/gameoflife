import React from 'react'
import ReactSelect from 'react-select'

const primaryMain = '#2f4f4f'
const primaryText = '#0d47a1' // theme.palette.contrastText

// Helpers - CSS
const customStyles = {
  control: (provided, state) => ({
    ...provided,
    fontSize: '0.75rem',
    fontFamily: 'Helvetica, Arial, sans-serif',
    backgroundColor: 'none'
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: primaryMain
  }),
  option: (provided, state) => ({
    ...provided,
    fontSize: '0.75rem',
    fontFamily: 'Helvetica, Arial, sans-serif',
    color: state.isSelected ? primaryText : primaryMain,
    backgroundColor: state.isSelected ? '#fafafa' : provided.backgroundColor
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: primaryText
  })
}

const customTheme = theme => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: '#cccccc',
    primary: primaryMain
  }
})

export const Select = ({ defaultValue, value, options, onChange }) => (
  <ReactSelect defaultValue={defaultValue} value={value} options={options} onChange={onChange} theme={customTheme} styles={customStyles} />
)

const extraSelectCustomStyles = {
  control: (provided, state) => ({
    ...provided,
    fontSize: '0.75rem',
    fontFamily: 'Helvetica, Arial, sans-serif',
    backgroundColor: 'none'
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: primaryText
  }),
  option: (provided, state) => ({
    ...provided,
    fontSize: '0.75rem',
    fontFamily: 'Helvetica, Arial, sans-serif',
    color: state.isSelected ? primaryText : primaryMain,
    backgroundColor: state.isSelected ? '#fafafa' : provided.backgroundColor
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: primaryText
  })
}

export const SelectExtra = ({ value, options, onChange }) => (
  <ReactSelect
    value={value}
    options={options}
    onChange={onChange}
    theme={customTheme}
    styles={extraSelectCustomStyles}
  />
)
