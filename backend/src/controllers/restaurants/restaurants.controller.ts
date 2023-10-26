import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Res,
  UseGuards,
  Req,
} from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { HttpService } from '@nestjs/axios';
import { Request } from 'express';
import { CaptchaGuard } from 'src/guards/captcha.guard';
@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly services: RestaurantsService) { }

  @Get('default-location')
  async getDefaultLocation() {
    return await this.services.getDefaultLocation();
  }

  @Get('load-map')
  async loadMap(@Req() req: Request) {
    // init map
    return await this.services.loadMap(req);
  }

  @UseGuards(CaptchaGuard)
  @Post('find-places')
  async findPlaces(@Body('searchPlace') searchPlace: string = 'Bang sue', @Req() req: Request) {
    // find restaurants near place
    return await this.services.nearbySearch(searchPlace, req);
  }

  @Post('text-search')
  async textSearch(@Body('searchPlace') searchPlace: string = 'Bang sue') {
    // not use
    return await this.services.textSearch(searchPlace);
  }

  @Get('place-photo')
  async placePhoto(@Query('photoRef') photoRef: string, @Query('maxWidth') maxWidth: string = '600', @Res() res: any, @Req() req:Request) {
    // get place image
    const response: any = await this.services.placePhoto(photoRef, maxWidth, req)
    response.data.pipe(res);
  }
}
