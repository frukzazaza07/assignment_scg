import { Global, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.get<string>('http.baseURL'),
        timeout: configService.get<number>('http.timeout'),
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [HttpModule],
})
export class HttpClientModule {}
