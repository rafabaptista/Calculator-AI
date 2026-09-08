export type ButtonType = 'number' | 'operator' | 'function' | 'equals'
export type Operation = '+' | '-' | '*' | '/'

export interface CalculatorState {
  display: string
  previousValue: number | null
  operation: Operation | null
  clearOnNext: boolean
  operatorFeedback: string | null
}

export interface ButtonConfig {
  label: string
  type: ButtonType
  value: string
}