export class ParseValueError extends TypeError {
  public readonly type: string

  constructor(type: string) {
    super()
    this.type = type
  }
}

type ParseFn<T> = (value: string) => T

const trueValues = new Set(['true', 't', '1', 'yes', 'y'])
const falseValues = new Set(['false', 'f', '0', 'no', 'n'])

export const parseBoolValue: ParseFn<boolean> = value => {
  const isTrue = trueValues.has(value.toLowerCase())
  const isFalse = falseValues.has(value.toLowerCase())

  if (isTrue) return true
  if (isFalse) return false

  throw new ParseValueError('bool')
}

export const parseIntValue: ParseFn<number> = value => {
  const parsed = Number.parseInt(value, 10)
  if (Number.isNaN(parsed)) {
    throw new ParseValueError('int')
  }

  return parsed
}

export const parseFloatValue: ParseFn<number> = value => {
  const parsed = Number.parseFloat(value)
  if (Number.isNaN(parsed)) {
    throw new ParseValueError('float')
  }

  return parsed
}
