import { BUTTON_CONFIG } from '../utils/constants'
import { Button } from './Button'

interface ButtonGridProps { onInput: (value: string) => void }

export function ButtonGrid({ onInput }: ButtonGridProps) {
  return <div className="button-grid">{BUTTON_CONFIG.map((config) => <Button key={config.value + config.label} config={config} onClick={onInput} />)}</div>
}