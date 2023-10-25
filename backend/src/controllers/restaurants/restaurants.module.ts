import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsController } from './restaurants.controller';
import { GoogleRequestLogModule } from 'src/models/google-reqest-log/google-request-log.module';

@Module({
  controllers: [RestaurantsController],
  providers: [RestaurantsService],
  imports: [GoogleRequestLogModule],
})
export class RestaurantsModule {}
