import { useCalculator } from '../hooks/useCalculator'
import { ButtonGrid } from './ButtonGrid'
import { Display } from './Display'

export function Calculator() {
  const { display, hint, operatorFeedback, handleInput } = useCalculator()
  return <main className="calculator-card"><Display value={display} hint={hint} operatorFeedback={operatorFeedback} /><ButtonGrid onInput={handleInput} /></main>
}