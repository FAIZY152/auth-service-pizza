import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Config } from './fileImport';

const isCompiled = __dirname.includes('dist');

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: Config.DB_HOST,
  port: Number(Config.DB_PORT),
  username: Config.DB_USERNAME,
  password: Config.DB_PASSWORD,
  database: Config.DB_NAME,
  synchronize: false,
  logging: false,
  entities: [isCompiled ? 'dist/entity/**/*.js' : 'src/entity/**/*.ts'],
  migrations: [isCompiled ? 'dist/migration/**/*.js' : 'src/migration/**/*.ts'],
  subscribers: [],
});
