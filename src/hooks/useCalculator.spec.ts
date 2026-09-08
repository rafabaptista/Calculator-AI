import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useCalculator } from './useCalculator'

function input(result: { current: ReturnType<typeof useCalculator> }, values: string) {
  act(() => {
    for (const value of values) result.current.handleInput(value)
  })
}

describe('useCalculator', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('starts at zero and builds decimal values', () => {
    const { result } = renderHook(() => useCalculator())

    input(result, '123')
    act(() => result.current.handleInput('decimal'))
    input(result, '45')

    expect(result.current.display).toBe('123.45')
  })

  it('supports the four operations and equals', () => {
    for (const [operation, expected] of [['+', '15'], ['-', '9'], ['*', '36'], ['/', '4']] as const) {
      const { result } = renderHook(() => useCalculator())
      input(result, '12')
      act(() => result.current.handleInput(operation))
      input(result, '3')
      act(() => result.current.handleInput('equals'))
      expect(result.current.display).toBe(expected)
    }
  })

  it('returns Error for division by zero', () => {
    const { result } = renderHook(() => useCalculator())

    input(result, '1')
    act(() => result.current.handleInput('/'))
    input(result, '0')
    act(() => result.current.handleInput('equals'))

    expect(result.current.display).toBe('Error')
  })

  it('supports clear, backspace, sign toggle, and percent', () => {
    const { result } = renderHook(() => useCalculator())

    input(result, '123')
    act(() => result.current.handleInput('backspace'))
    expect(result.current.display).toBe('12')
    act(() => result.current.handleInput('toggle-sign'))
    expect(result.current.display).toBe('-12')
    act(() => result.current.handleInput('percent'))
    expect(result.current.display).toBe('-0.12')
    act(() => result.current.handleInput('clear'))
    expect(result.current.display).toBe('0')
  })

  it('blocks an eleventh digit and auto-hides the hint', () => {
    const { result } = renderHook(() => useCalculator())

    input(result, '1234567890')
    act(() => result.current.handleInput('1'))

    expect(result.current.display).toBe('1234567890')
    expect(result.current.hint).toBe('Maximum 10 digits')
    act(() => vi.advanceTimersByTime(3000))
    expect(result.current.hint).toBeNull()
  })

  it('starts a new entry after an operator or percent', () => {
    const { result } = renderHook(() => useCalculator())

    input(result, '1234567890')
    act(() => result.current.handleInput('+'))
    input(result, '5')
    expect(result.current.display).toBe('5')

    act(() => result.current.handleInput('percent'))
    input(result, '7')
    expect(result.current.display).toBe('7')
  })

  it('exposes operator feedback without changing the numeric display', () => {
    const { result } = renderHook(() => useCalculator())

    input(result, '12')
    act(() => result.current.handleInput('*'))
    expect(result.current.display).toBe('12')
    expect(result.current.operatorFeedback).toBe('×')

    input(result, '3')
    expect(result.current.display).toBe('3')
    expect(result.current.operatorFeedback).toBeNull()
  })
})
