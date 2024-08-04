interface ConfigDatabaseInterface {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  schema?: string;
  ssl?: boolean;
  connectionTimeoutMillis?: number;
  idleTimeoutMillis?: number;
  max?: number;
}

export interface ConfigInterface {
  database: ConfigDatabaseInterface;
}
