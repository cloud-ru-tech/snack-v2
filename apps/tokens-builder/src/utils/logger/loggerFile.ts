// eslint-disable-next-line no-control-regex -- ANSI escape codes for stripping colors
const ANSI_ESCAPE = /\x1b\[[0-9;]*m/g;
const isNode = typeof process !== 'undefined' && process.versions?.node !== undefined;

export function stripAnsi(str: string): string {
  return str.replace(ANSI_ESCAPE, '');
}

export function formatArgsForFile(args: unknown[]): string {
  if (args.length === 0) return '';
  return ' ' + args.map(arg => (typeof arg === 'string' ? arg : JSON.stringify(arg))).join(' ');
}

export type LogFileWriter = {
  write(message: string): void;
  close(): void;
  readonly writable: boolean;
};

export async function createLogFileWriter(filePath: string): Promise<LogFileWriter | null> {
  if (!isNode) return null;
  try {
    const fs = await import('fs');
    const path = await import('path');
    const dir = path.dirname(filePath);
    if (dir !== '.' && dir !== filePath) fs.mkdirSync(dir, { recursive: true });
    const stream = fs.createWriteStream(filePath, { flags: 'a' });
    stream.on('error', (err: Error) => console.error(`Error writing to log file ${filePath}:`, err));
    const timestamp = new Date().toISOString();
    stream.write(stripAnsi(`\n=== Build started at ${timestamp} ===\n`));
    return {
      get writable() {
        return stream.writable;
      },
      write(message: string) {
        if (stream.writable) stream.write(stripAnsi(message) + '\n');
      },
      close() {
        stream.write(stripAnsi(`\n=== Build finished at ${new Date().toISOString()} ===\n`));
        if (typeof stream.end === 'function') stream.end();
      },
    };
  } catch (err) {
    console.error(`Failed to open log file ${filePath}:`, err);
    return null;
  }
}
