import { ConfigService, registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export enum DbTypeEnum {
  mysql = 'mysql',
}
function typeormModuleOptions(): TypeOrmModuleOptions {
  return {
    type: DbTypeEnum.mysql,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    autoLoadEntities: true,
    timezone: '+07:00',
    synchronize: false,
    logging: true,
    logger: 'file',
  };
}

export default registerAs('database', () => ({
  config: typeormModuleOptions(),
}));
