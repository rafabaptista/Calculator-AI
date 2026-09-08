import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Display } from './Display'

describe('Display', () => {
  it('formats complete numeric values for presentation', () => {
    render(<Display value="1234567.67" hint={null} />)

    expect(screen.getByRole('status', { name: 'Calculator display' })).toHaveTextContent('1 234 567.67')
  })

  it('renders calculation history above the number', () => {
    render(<Display value="1234" hint={null} calculationHistory="12 +" />)

    expect(screen.getByRole('paragraph', { name: 'Calculation history' })).toHaveTextContent('12 +')
    expect(screen.getByRole('status', { name: 'Calculator display' })).toHaveTextContent('1 234')
  })

  it('keeps partially typed values and errors unchanged', () => {
    const { rerender } = render(<Display value="12345." hint={null} />)
    const display = screen.getByRole('status', { name: 'Calculator display' })

    expect(display).toHaveTextContent('12345.')
    rerender(<Display value="Error" hint={null} />)
    expect(display).toHaveTextContent('Error')
  })

  it('shows and hides the hint state through its class', () => {
    const { rerender } = render(<Display value="0" hint={null} />)
    const hint = document.querySelector('.calculator-hint')

    expect(hint).not.toHaveClass('calculator-hint--visible')
    rerender(<Display value="0" hint="Maximum 10 digits" />)
    expect(hint).toHaveClass('calculator-hint--visible')
    expect(hint).toHaveTextContent('Maximum 10 digits')
  })
})
