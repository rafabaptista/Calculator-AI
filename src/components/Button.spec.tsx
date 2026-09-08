import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Button } from './Button'

const config = { label: '+', type: 'operator' as const, value: '+' }

describe('Button', () => {
  it('renders its label and type class', () => {
    render(<Button config={config} onClick={vi.fn()} />)

    expect(screen.getByRole('button', { name: '+' })).toHaveClass('calculator-button--operator')
  })

  it('passes its configured value to the click handler', () => {
    const onClick = vi.fn()
    render(<Button config={config} onClick={onClick} />)

    fireEvent.click(screen.getByRole('button', { name: '+' }))

    expect(onClick).toHaveBeenCalledWith('+')
  })

  it('uses an accessible Backspace label', () => {
    render(<Button config={{ label: '⌫', type: 'function', value: 'backspace' }} onClick={vi.fn()} />)

    expect(screen.getByRole('button', { name: 'Backspace' })).toBeInTheDocument()
  })
})
