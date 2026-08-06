export default class Logger {
  static info(message: string): void {
    console.info(`[INFO] ${message}`);
  }

  static error(message: string): void {
    console.error(`[ERROR] ${message}`);
  }

  static debug(message: string): void {
    console.debug(`[DEBUG] ${message}`);
  }
}