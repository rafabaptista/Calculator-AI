import { describe, expect, it } from 'vitest'
import { calculate, formatNumber } from './calculatorLogic'

describe('calculate', () => {
  it.each([
    ['+', 7, 3, 10],
    ['-', 7, 3, 4],
    ['*', 7, 3, 21],
    ['/', 7, 2, 3.5],
  ] as const)('performs %s', (operation, left, right, expected) => {
    expect(calculate(left, right, operation)).toBe(expected)
  })

  it('returns null when dividing by zero', () => {
    expect(calculate(7, 0, '/')).toBeNull()
  })
})

describe('formatNumber', () => {
  it('groups thousands with spaces and keeps a dot decimal separator', () => {
    expect(formatNumber(1234567.67)).toBe('1 234 567.67')
  })

  it('formats negative values', () => {
    expect(formatNumber(-1234567.5)).toBe('-1 234 567.5')
  })

  it('limits output to twelve significant digits', () => {
    expect(formatNumber(1234567890123)).toBe('1 234 567 890 120')
  })

  it.each([Infinity, -Infinity, NaN])('returns Error for %s', (value) => {
    expect(formatNumber(value)).toBe('Error')
  })
})
