import type { ButtonConfig } from './types'

export const BUTTON_CONFIG: ButtonConfig[] = [
  { label: 'AC', type: 'function', value: 'clear' },
  { label: '⌫', type: 'function', value: 'backspace' },
  { label: '%', type: 'operator', value: 'percent' },
  { label: '÷', type: 'operator', value: '/' },
  { label: '7', type: 'number', value: '7' },
  { label: '8', type: 'number', value: '8' },
  { label: '9', type: 'number', value: '9' },
  { label: '×', type: 'operator', value: '*' },
  { label: '4', type: 'number', value: '4' },
  { label: '5', type: 'number', value: '5' },
  { label: '6', type: 'number', value: '6' },
  { label: '−', type: 'operator', value: '-' },
  { label: '1', type: 'number', value: '1' },
  { label: '2', type: 'number', value: '2' },
  { label: '3', type: 'number', value: '3' },
  { label: '+', type: 'operator', value: '+' },
  { label: '±', type: 'function', value: 'toggle-sign' },
  { label: '0', type: 'number', value: '0' },
  { label: '.', type: 'number', value: 'decimal' },
  { label: '=', type: 'equals', value: 'equals' },
]