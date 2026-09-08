import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders the calculator as the main application view', () => {
    render(<App />)

    expect(screen.getByRole('main')).toHaveClass('calculator-card')
    expect(screen.getByRole('status', { name: 'Calculator display' })).toHaveTextContent('0')
  })
})
