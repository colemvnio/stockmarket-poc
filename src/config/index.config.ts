import { ConfigInterface } from '../core/interfaces/config.interface';

const staticConfig: ConfigInterface = {
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'user',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'stockmarket_poc',
    schema: process.env.DB_SCHEMA || 'public',
    ssl: process.env.DB_SSL === 'true',
    connectionTimeoutMillis: parseInt(
      process.env.DB_CONNECTION_TIMEOUT || '0',
      10,
    ),
    idleTimeoutMillis: parseInt(process.env.DB_IDLE_TIMEOUT || '10000', 10),
    max: parseInt(process.env.DB_MAX_CONNECTIONS || '10', 10),
  },
};

export function getConfig(): ConfigInterface {
  return staticConfig;
}

export function extendConfig(config: Partial<ConfigInterface>) {
  if (Object.isFrozen(staticConfig)) return;

  Object.assign(staticConfig, config);
  Object.freeze(staticConfig);
}
