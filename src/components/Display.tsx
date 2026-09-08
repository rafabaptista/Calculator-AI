interface DisplayProps {
  value: string
  hint: string | null
  calculationHistory?: string | null
}

function formatDisplayValue(value: string) {
  if (!/^-?\d*\.?\d+$/.test(value)) return value

  const [integerPart, decimalPart] = value.split('.')
  const sign = integerPart.startsWith('-') ? '-' : ''
  const unsignedInteger = integerPart.replace('-', '') || '0'
  const formattedInteger = unsignedInteger.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

  return decimalPart === undefined ? `${sign}${formattedInteger}` : `${sign}${formattedInteger}.${decimalPart}`
}

export function Display({ value, hint, calculationHistory = null }: DisplayProps) {
  return (
    <>
      <p className="calculator-history" aria-label="Calculation history">{calculationHistory}</p>
      <output className="calculator-display" aria-label="Calculator display">{formatDisplayValue(value)}</output>
      <p className={`calculator-hint${hint ? ' calculator-hint--visible' : ''}`} aria-live="polite">{hint}</p>
    </>
  )
}