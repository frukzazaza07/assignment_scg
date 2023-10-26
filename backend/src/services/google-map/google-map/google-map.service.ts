import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, lastValueFrom, map } from 'rxjs';
import { AxiosResponse } from 'axios';
import { Request } from 'express';
import { GoogleRequestLogService } from 'src/models/google-reqest-log/google-request-log.service';
@Injectable()
export class GoogleMapService {
  constructor(
    private readonly httpService: HttpService,
    private readonly googleRequestLogService: GoogleRequestLogService
  ) { }

  async loadMap(req: Request) {
    const url = `${process.env.GOOGLE_MAP_API_ENDPOINT}/api/js?key=${process.env.GOOGLE_MAP_API_KEY}`
    const columInsertLog: any = {
      gml_user_ip: req.ip,
      gml_request_url: req.url,
      gml_request_payload: '',
      gml_google_key: process.env.GOOGLE_MAP_API_KEY,
      gml_google_url: url,
      gml_google_request: url,
      gml_google_request_method: 'get',
      gml_google_response: '',
    }
    const request = this.httpService
      .get(
        url,
      )
      .pipe(map((res) => res.data))
      .pipe(
        catchError((err) => {
          columInsertLog.gml_google_response = String(err.response)
          this.googleRequestLogService.create(columInsertLog)
          throw new ServiceUnavailableException('API not available');
        }),
      );
    const results = await lastValueFrom(request)
    columInsertLog.gml_google_response = results
    this.googleRequestLogService.create(columInsertLog)
    return results;
  }

  async nearbySearch(query: string, req: Request) {
    // url call google map service
    const url = `${process.env.GOOGLE_MAP_API_ENDPOINT}/api/place/nearbysearch/json?${query}&key=${process.env.GOOGLE_MAP_API_KEY}`
    // payload insert request google service log
    const columInsertLog: any = {
      gml_user_ip: req.ip,
      gml_request_url: req.url,
      gml_request_payload: '',
      gml_google_key: process.env.GOOGLE_MAP_API_KEY,
      gml_google_url: url,
      gml_google_request: url,
      gml_google_request_method: 'post',
      gml_google_response: '',
    }
    const request = this.httpService
      .post(
        url,
      )
      .pipe(map((res) => res.data))
      .pipe(
        catchError((err) => {
          columInsertLog.gml_google_response = String(err.response)
          this.googleRequestLogService.create(columInsertLog)
          throw new ServiceUnavailableException('API not available');
        }),
      );
    const results = await lastValueFrom(request)
    columInsertLog.gml_google_response = JSON.stringify(results)
    // insert request google map service log
    this.googleRequestLogService.create(columInsertLog)
    return results;
  }

  async findPlaceFromText(query: string, req: Request) {
    // url call google map service
    const url = `${process.env.GOOGLE_MAP_API_ENDPOINT}/api/place/findplacefromtext/json?${query}&key=${process.env.GOOGLE_MAP_API_KEY}`
    // payload insert request google service log
    const columInsertLog: any = {
      gml_user_ip: req.ip,
      gml_request_url: req.url,
      gml_request_payload: '',
      gml_google_key: process.env.GOOGLE_MAP_API_KEY,
      gml_google_url: url,
      gml_google_request: url,
      gml_google_request_method: 'post',
      gml_google_response: '',
    }
    const request = this.httpService
      .post(
        url,
      )
      .pipe(map((res) => res.data))
      .pipe(
        catchError((err) => {
          columInsertLog.gml_google_response = String(err.response)
          this.googleRequestLogService.create(columInsertLog)
          throw new ServiceUnavailableException('API not available');
        }),
      );
    const results = await lastValueFrom(request)
    columInsertLog.gml_google_response = JSON.stringify(results)
    // insert request google map service log
    this.googleRequestLogService.create(columInsertLog)
    return results;
  }

  async textSearch(query: string) {
    // not use
    const request = this.httpService
      .post(
        `${process.env.GOOGLE_MAP_API_ENDPOINT}/api/place/textsearch/json?${query}&key=${process.env.GOOGLE_MAP_API_KEY}`,
      )
      .pipe(map((res) => res.data))
      .pipe(
        catchError((err) => {
          throw new ServiceUnavailableException('API not available');
        }),
      );
    return await lastValueFrom(request);
  }

  async placePhoto(query: string, req: Request) {

    try {
      // url call google map service
      const url = `${process.env.GOOGLE_MAP_API_ENDPOINT}/api/place/photo?${query}&key=${process.env.GOOGLE_MAP_API_KEY}`
      // payload insert request google service log
      const columInsertLog: any = {
        gml_user_ip: req.ip,
        gml_request_url: req.url,
        gml_request_payload: '',
        gml_google_key: process.env.GOOGLE_MAP_API_KEY,
        gml_google_url: url,
        gml_google_request: url,
        gml_google_request_method: 'post',
        gml_google_response: 'image file',
      }
      const response: AxiosResponse<any> = await this.httpService.axiosRef({
        url: url,
        method: 'GET',
        responseType: 'stream',
      });

      // insert request google map service log
      this.googleRequestLogService.create(columInsertLog)
      return response
    } catch (e) {
      throw new ServiceUnavailableException('API not available');
    }

  }
  async googleValidateCaptcha(token: string) {
    const payload = {
      "event": {
        "token": token,
        "siteKey": process.env.GOOGLE_RECAPTCHA_API_KEY,
      }
    }
    const request = this.httpService
      .post(
        `${process.env.GOOGLE_RECAPTCHA_API_ENDPOINT}/assessments?key=${process.env.GOOGLE_MAP_API_KEY}`,
        payload
      )
      .pipe(map((res) => res.data))
      .pipe(
        catchError((err) => {
          throw new ServiceUnavailableException(err?.response?.data);
        }),
      );
    const res = await lastValueFrom(request);
    return res;
  }
}
