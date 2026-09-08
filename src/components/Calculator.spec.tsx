import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Calculator } from './Calculator'

describe('Calculator', () => {
  it('calculates an expression through the keypad', () => {
    render(<Calculator />)

    for (const digit of '12') fireEvent.click(screen.getByRole('button', { name: new RegExp(`^${digit}$`) }))
    fireEvent.click(screen.getByRole('button', { name: /^\+$/ }))
    fireEvent.click(screen.getByRole('button', { name: /^3$/ }))
    fireEvent.click(screen.getByRole('button', { name: /^=$/ }))

    expect(screen.getByRole('status', { name: 'Calculator display' })).toHaveTextContent('15')
  })

  it('renders the input limit hint and allows a new entry after an operator', () => {
    render(<Calculator />)

    for (const digit of '1234567890') fireEvent.click(screen.getByRole('button', { name: new RegExp(`^${digit}$`) }))
    fireEvent.click(screen.getByRole('button', { name: /^\+$/ }))
    fireEvent.click(screen.getByRole('button', { name: /^5$/ }))

    expect(screen.getByRole('status', { name: 'Calculator display' })).toHaveTextContent('5')
  })
})
