import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ServicesModule } from './services/services.module';
import databaseConfig from './config/database.config';
import { ControllersModule } from './controllers/controllers.module';
import { HttpClientModule } from './config/http-client.module';
import { CacheModule } from '@nestjs/cache-manager';
import { HelpersModule } from './helpers/helpers.module';
import { GoogleRequestLogModule } from './models/google-reqest-log/google-request-log.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        config.get<TypeOrmModuleOptions>('database.config'),
    }),
    CacheModule.register({
      isGlobal: true,
    }),
    ServicesModule,
    ControllersModule,
    HttpClientModule,
    HelpersModule,
    GoogleRequestLogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
