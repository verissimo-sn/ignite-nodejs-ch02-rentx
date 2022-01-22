import 'dotenv/config';
import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (host = 'database_rentx'): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      host: process.env.DB_HOST || host,
      database:
        process.env.NODE_ENV === 'test'
          ? 'rentx_test'
          : defaultOptions.database,
    })
  );
};
