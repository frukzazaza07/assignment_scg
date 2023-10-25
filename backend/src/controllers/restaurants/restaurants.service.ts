import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { HelpersService } from 'src/helpers/helpers.service';
import { GoogleRequestLog } from 'src/models/google-reqest-log/entities/google-request-log.entity';
import { GoogleRequestLogService } from 'src/models/google-reqest-log/google-request-log.service';
import { GoogleMapService } from 'src/services/google-map/google-map/google-map.service';

@Injectable()
export class RestaurantsService {
  constructor(
    private readonly services: GoogleMapService,
    private readonly helpersService: HelpersService,
  ) { }

  async getDefaultLocation() {
    return { lat: 13.803286999767622, lng: 100.53851260000002, title: 'Bang sue' };
  }

  async loadMap(req: Request) {
    return await this.services.loadMap(req);
  }

  async findPlaceFromText(searchPlace: string, req: Request) {
    const options = {
      fields: 'formatted_address,name,rating,opening_hours,geometry',
      input: searchPlace,
      inputtype: 'textquery',
    };
    // set query string
    const query = new URLSearchParams(options).toString();
    // call google map service
    const results = await this.services.findPlaceFromText(query, req)
    return results;
  }

  async nearbySearch(searchPlace: string, req: Request) {
    // check if have place cache
    const placeCache = await this.helpersService.getCachData(`places_${searchPlace.toLocaleLowerCase()}`)
    if (placeCache) return placeCache

    const data = await this.findPlaceFromText(searchPlace, req);

    if (data.candidates.length === 0) {
      throw new BadRequestException(`Not found ${searchPlace}`);
    }
    const locationLatLng = data.candidates[0].geometry.location;
    const options: any = {
      keyword: searchPlace,
      location: Object.values(locationLatLng).join(','),
      radius: '100000',
      type: 'restaurant',
    };

    // set query string
    const query = new URLSearchParams(options).toString();
    // call google map service
    const serviceData = await this.services.nearbySearch(query, req)
    const timeCache = 1000 * 60 * 60 * 24 * 7 // 7days
    await this.helpersService.setCachData(`places_${searchPlace}`, serviceData, timeCache)
    return serviceData
  }

  async textSearch(searchPlace: string) {
    // not use
    const options = {
      query: searchPlace,
      type: 'restaurant',
    };

    const query = new URLSearchParams(options).toString();
    return await this.services.textSearch(query);
  }

  async placePhoto(photoRef: string, maxWidth: string, req: Request) {
    const options = {
      maxwidth: maxWidth,
      photo_reference: photoRef,
    };

    // set query string
    const query = new URLSearchParams(options).toString();
    // call google map service
    return await this.services.placePhoto(query, req)
  }


}
