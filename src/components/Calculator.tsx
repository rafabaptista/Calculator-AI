import { useCalculator } from '../hooks/useCalculator'
import { ButtonGrid } from './ButtonGrid'
import { Display } from './Display'

export function Calculator() {
  const { display, hint, calculationHistory, handleInput } = useCalculator()
  return <main className="calculator-card"><Display value={display} hint={hint} calculationHistory={calculationHistory} /><ButtonGrid onInput={handleInput} /></main>
}