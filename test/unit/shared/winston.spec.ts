import { Test } from '@nestjs/testing';
import * as winston from 'winston';
import { WinstonLogger } from '../../../src/shared/logger/winston.logger';

describe('Unit - WinstonLogger', () => {
  let logger: WinstonLogger;
  let mockCreateLogger: jest.SpyInstance;
  let mockInfo: jest.Mock;
  let mockError: jest.Mock;
  let mockWarn: jest.Mock;
  let mockDebug: jest.Mock;
  let mockVerbose: jest.Mock;

  beforeEach(async () => {
    mockInfo = jest.fn();
    mockError = jest.fn();
    mockWarn = jest.fn();
    mockDebug = jest.fn();
    mockVerbose = jest.fn();

    mockCreateLogger = jest.spyOn(winston, 'createLogger').mockImplementation(
      () =>
        ({
          info: mockInfo,
          error: mockError,
          warn: mockWarn,
          debug: mockDebug,
          verbose: mockVerbose,
        }) as any,
    );

    const module = await Test.createTestingModule({
      providers: [WinstonLogger],
    }).compile();

    logger = module.get<WinstonLogger>(WinstonLogger);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should be defined', () => {
    expect(logger).toBeDefined();
  });

  it('Should create a winston logger with correct configuration', () => {
    expect(mockCreateLogger).toHaveBeenCalledWith(
      expect.objectContaining({
        level: 'info',
        transports: expect.arrayContaining([
          expect.any(winston.transports.Console),
          expect.any(winston.transports.File),
          expect.any(winston.transports.File),
        ]),
      }),
    );
  });

  describe('Log methods', () => {
    it('Should call info method with correct parameters', () => {
      const message = 'Test info message';
      logger.log(message);
      expect(mockInfo).toHaveBeenCalledWith(message);
    });

    it('Should call error method with correct parameters', () => {
      const message = 'Test error message';
      const trace = 'Error trace';
      logger.error(message, trace);
      expect(mockError).toHaveBeenCalledWith(`${message} - ${trace}`);
    });

    it('Should call error method without trace', () => {
      const message = 'Test error message';
      logger.error(message);
      expect(mockError).toHaveBeenCalledWith(message);
    });

    it('Should call warn method with correct parameters', () => {
      const message = 'Test warn message';
      logger.warn(message);
      expect(mockWarn).toHaveBeenCalledWith(message);
    });

    it('Should call debug method with correct parameters', () => {
      const message = 'Test debug message';
      logger.debug(message);
      expect(mockDebug).toHaveBeenCalledWith(message);
    });

    it('Should call verbose method with correct parameters', () => {
      const message = 'Test verbose message';
      logger.verbose(message);
      expect(mockVerbose).toHaveBeenCalledWith(message);
    });
  });

  describe('Object and array logging', () => {
    it('Should properly stringify objects in log messages', () => {
      const obj = { key: 'value', nested: { nestedKey: 'nestedValue' } };
      logger.log('Logging object', obj);
      expect(mockInfo).toHaveBeenCalledWith('Logging object', obj);
    });

    it('Should properly stringify arrays in log messages', () => {
      const arr = [1, 2, { key: 'value' }];
      logger.log('Logging array', arr);
      expect(mockInfo).toHaveBeenCalledWith('Logging array', arr);
    });
  });
});
