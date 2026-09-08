import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { BUTTON_CONFIG } from '../utils/constants'
import { ButtonGrid } from './ButtonGrid'

describe('ButtonGrid', () => {
  it('renders the complete calculator keypad', () => {
    render(<ButtonGrid onInput={vi.fn()} />)

    expect(screen.getAllByRole('button')).toHaveLength(BUTTON_CONFIG.length)
    expect(screen.getByRole('button', { name: /^AC$/ })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /^=$/ })).toBeInTheDocument()
  })

  it('forwards button values to onInput', () => {
    const onInput = vi.fn()
    render(<ButtonGrid onInput={onInput} />)

    fireEvent.click(screen.getByRole('button', { name: /^\+$/ }))

    expect(onInput).toHaveBeenCalledWith('+')
  })
})
