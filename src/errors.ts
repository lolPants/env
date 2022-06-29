import { type MonoEnvironment as Environment } from './type.js'

class EnvironmentError extends Error {
  public readonly prop: string
  public readonly environment: Environment

  constructor(prop: string, environment: Environment, message?: string) {
    super(message)

    this.prop = prop
    this.environment = environment
  }
}

export class RequiredError extends EnvironmentError {
  constructor(prop: string, environment: Environment) {
    const name = environment.name ?? prop
    const message = `Missing environment variable: ${name}`

    super(prop, environment, message)
  }
}

export class ParseError extends EnvironmentError {
  constructor(type: string, prop: string, environment: Environment) {
    const name = environment.name ?? prop
    const message = `Invalid environment variable: ${name}, expected type \`${type}\``

    super(prop, environment, message)
  }
}

export class ValidateError extends EnvironmentError {
  public readonly reason: string

  constructor(reason: string, prop: string, environment: Environment) {
    const name = environment.name ?? prop
    const message = `Invalid environment variable: ${name}\n${reason}`

    super(prop, environment, message)
    this.reason = reason
  }
}
