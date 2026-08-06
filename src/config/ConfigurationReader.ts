import * as fs from 'fs';
import * as path from 'path';

class ConfigurationReader {
  private static instance: ConfigurationReader;
  private properties: Map<string, string> = new Map();

  private constructor() {
    const filePath = path.resolve(__dirname, '../../config/config.properties');
    const content = fs.readFileSync(filePath, 'utf-8');
    content.split(/\r?\n/).forEach(line => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;
      const [key, ...rest] = trimmed.split('=');
      this.properties.set(key.trim(), rest.join('=').trim());
    });
  }

  public static getInstance(): ConfigurationReader {
    if (!ConfigurationReader.instance) {
      ConfigurationReader.instance = new ConfigurationReader();
    }
    return ConfigurationReader.instance;
  }

  public get(key: string): string | undefined {
    return this.properties.get(key);
  }
}

export default ConfigurationReader;