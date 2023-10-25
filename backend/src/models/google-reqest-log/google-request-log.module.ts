import { Module } from '@nestjs/common';
import { GoogleRequestLogService } from './google-request-log.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoogleRequestLog } from './entities/google-request-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GoogleRequestLog])],
  providers: [GoogleRequestLogService],
  exports: [GoogleRequestLogService],
})
export class GoogleRequestLogModule {}
