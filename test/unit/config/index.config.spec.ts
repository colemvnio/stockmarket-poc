import { getConfig, extendConfig } from '../../../src/config/index.config';
import { ConfigInterface } from '../../../src/core/interfaces/config.interface';

describe('Configuration', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  describe('getConfig', () => {
    it('Should return the default configuration when no environment variables are set', () => {
      const config = getConfig();
      expect(config).toBeDefined();
      expect(config.database).toBeDefined();
      expect(config.database.host).toBe('localhost');
      expect(config.database.port).toBe(5432);
    });

    it('Should use environment variables when they are set', () => {
      process.env.DB_HOST = 'testhost';
      process.env.DB_PORT = '5433';
      process.env.DB_USERNAME = 'testuser';
      process.env.DB_PASSWORD = 'testpass';
      process.env.DB_NAME = 'testdb';

      // Re-import to reset the configuration content
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { getConfig } = require('../../../src/config/index.config');
      const config = getConfig();
      expect(config.database.host).toBe('testhost');
      expect(config.database.port).toBe(5433);
      expect(config.database.username).toBe('testuser');
      expect(config.database.password).toBe('testpass');
      expect(config.database.database).toBe('testdb');
    });
  });

  describe('extendConfig', () => {
    it('Should extend the configuration with new values', () => {
      const initialConfig = getConfig();
      expect(Object.isFrozen(initialConfig)).toBe(false);

      const extensionConfig: Partial<ConfigInterface> = {
        database: {
          ...initialConfig.database,
          host: 'newhost',
          port: 5434,
        },
      };

      extendConfig(extensionConfig);
      const updatedConfig = getConfig();

      expect(updatedConfig.database.host).toBe('newhost');
      expect(updatedConfig.database.port).toBe(5434);
      expect(updatedConfig.database.username).toBe(
        initialConfig.database.username,
      );
    });

    it('Should not allow extending config after it has been frozen', () => {
      const initialConfig = getConfig();
      extendConfig({});

      const extensionConfig: Partial<ConfigInterface> = {
        database: {
          ...initialConfig.database,
          host: 'anotherhost',
        },
      };

      extendConfig(extensionConfig);
      const updatedConfig = getConfig();

      expect(Object.isFrozen(updatedConfig)).toBe(true);
      expect(updatedConfig.database.host).toBe(initialConfig.database.host);
    });
  });
});
