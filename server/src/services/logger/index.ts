type LogLevel = 'info' | 'warn' | 'error' | 'debug'

export class Logger {
  constructor(
    private readonly prefix = 'server',
    private readonly _debug = false
  ) {}

  private log(level: LogLevel, message: string, info?: any) {
    const date = new Date().toISOString()

    let args = ''

    if (typeof info === 'object' && info !== null) {
      args = Object.entries(info)
        .map(
          ([key, value]) =>
            `${key}=${
              typeof value === 'object'
                ? JSON.stringify(value)
                : typeof value === 'string'
                ? `"${value}"`
                : value
            }`
        )
        .join(' ')
    } else {
      args = String(info)
    }

    const log = `date="${date}" app=${this.prefix} level=${level} message="${message}" ${args}`

    if (level === 'error') console.error(log)
    else if (level === 'warn') console.warn(log)
    else console.log(log)
  }

  public info(message: string, info?: any) {
    this.log('info', message, info)
  }

  public warn(message: string, info?: any) {
    this.log('warn', message, info)
  }

  public error(message: string, info?: any) {
    this.log('error', message, info)
  }

  public debug(message: string, info?: any) {
    if (this._debug) this.log('debug', message, info)
  }
}

export const logger = new Logger('logger')
