import { describe, expect, it } from 'vitest'
import { BUTTON_CONFIG } from './constants'

describe('BUTTON_CONFIG', () => {
  it('defines a complete 4 by 5 keypad with unique keys', () => {
    expect(BUTTON_CONFIG).toHaveLength(20)
    expect(new Set(BUTTON_CONFIG.map(({ value }) => value)).size).toBe(BUTTON_CONFIG.length)
    expect(BUTTON_CONFIG.map(({ value }) => value)).toEqual([
      'clear', 'backspace', 'percent', '/', '7', '8', '9', '*', '4', '5', '6', '-', '1', '2', '3', '+', 'toggle-sign', '0', 'decimal', 'equals',
    ])
  })
})
