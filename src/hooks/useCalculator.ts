import { useEffect, useRef, useState } from 'react'
import { calculate, formatNumber } from '../utils/calculatorLogic'
import type { CalculatorState, Operation } from '../utils/types'

const INITIAL_STATE: CalculatorState = {
  display: '0', previousValue: null, operation: null, clearOnNext: false,
}
const MAX_DIGITS = 10
const DIGIT_LIMIT_HINT = 'Maximum 10 digits'

function formatOperation(operation: Operation) {
  return operation === '*' ? '×' : operation === '-' ? '−' : operation
}

export function useCalculator() {
  const [state, setState] = useState(INITIAL_STATE)
  const [hint, setHint] = useState<string | null>(null)
  const hintTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => {
    if (hintTimer.current) clearTimeout(hintTimer.current)
  }, [])

  function showHint(message: string) {
    if (hintTimer.current) clearTimeout(hintTimer.current)
    setHint(message)
    hintTimer.current = setTimeout(() => {
      setHint(null)
      hintTimer.current = null
    }, 3000)
  }

  function inputDigit(digit: string) {
    if (!state.clearOnNext && (state.display.match(/\d/g) ?? []).length >= MAX_DIGITS) {
      showHint(DIGIT_LIMIT_HINT)
      return
    }

    setState((current) => ({
      ...current,
      display: current.clearOnNext || current.display === 'Error' ? digit : current.display === '0' ? digit : current.display + digit,
      clearOnNext: false,
    }))
  }

  function inputDecimal() {
    setState((current) => ({
      ...current,
      display: current.clearOnNext || current.display === 'Error' ? '0.' : current.display.includes('.') ? current.display : `${current.display}.`,
      clearOnNext: false,
    }))
  }

  function clear() {
    setState(INITIAL_STATE)
    setHint(null)
  }

  function backspace() {
    setState((current) => ({ ...current, display: current.display.length > 1 ? current.display.slice(0, -1) : '0', clearOnNext: false }))
  }

  function toggleSign() {
    setState((current) => ({
      ...current,
      display: current.display === '0' || current.display === 'Error' ? current.display : current.display.startsWith('-') ? current.display.slice(1) : `-${current.display}`,
    }))
  }

  function percent() {
    setState((current) => ({ ...current, display: formatNumber(Number(current.display) / 100), clearOnNext: true }))
  }

  function chooseOperation(operation: Operation) {
    setState((current) => ({ ...current, previousValue: Number(current.display), operation, clearOnNext: true }))
  }

  function evaluate() {
    setState((current) => {
      if (current.previousValue === null || current.operation === null) return current
      const result = calculate(current.previousValue, Number(current.display), current.operation)
      return { display: result === null ? 'Error' : formatNumber(result), previousValue: null, operation: null, clearOnNext: true }
    })
  }

  function handleInput(value: string) {
    if (/^\d$/.test(value)) inputDigit(value)
    else if (value === 'decimal') inputDecimal()
    else if (value === 'clear') clear()
    else if (value === 'backspace') backspace()
    else if (value === 'toggle-sign') toggleSign()
    else if (value === 'percent') percent()
    else if (value === 'equals') evaluate()
    else chooseOperation(value as Operation)
  }

  const calculationHistory = state.previousValue !== null && state.operation !== null
    ? `${formatNumber(state.previousValue)} ${formatOperation(state.operation)}`
    : null

  return { display: state.display, hint, calculationHistory, handleInput }
}