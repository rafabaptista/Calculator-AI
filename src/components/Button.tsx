import type { ButtonConfig } from '../utils/types'

interface ButtonProps { config: ButtonConfig; onClick: (value: string) => void }

export function Button({ config, onClick }: ButtonProps) {
  return (
    <button className={`calculator-button calculator-button--${config.type}`} type="button" aria-label={config.value === 'backspace' ? 'Backspace' : config.label} onClick={() => onClick(config.value)}>
      {config.label}
    </button>
  )
}