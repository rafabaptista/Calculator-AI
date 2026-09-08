import type { Operation } from './types'

const numberFormatter = new Intl.NumberFormat('en-US', {
  maximumSignificantDigits: 12,
})

export function calculate(left: number, right: number, operation: Operation) {
  switch (operation) {
    case '+': return left + right
    case '-': return left - right
    case '*': return left * right
    case '/': return right === 0 ? null : left / right
  }
}

export function formatNumber(value: number) {
  if (!Number.isFinite(value)) return 'Error'
  return numberFormatter.format(value).replaceAll(',', ' ')
}