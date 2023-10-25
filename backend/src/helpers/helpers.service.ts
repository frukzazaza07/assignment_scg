import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, ServiceUnavailableException } from '@nestjs/common';
import { catchError, lastValueFrom, map } from 'rxjs';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
@Injectable()
export class HelpersService {
    constructor(private readonly httpService: HttpService, @Inject(CACHE_MANAGER) private cacheManager: Cache) { }
    async googleValidateCaptcha(token: string, req: any) {
        const secret = process.env.CAPTCHA_SECRET;
        const remoteIp = req.connection.remoteAddress || null;
        const request = this.httpService
            .get(
                `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}&remoteip=${remoteIp}`,
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

    async setCachData(key: string, data: any, time: number = 0) {
        await this.cacheManager.set(
          key,
          data,
          time,
        );
      }
      async getCachData(key: string) {
        return await this.cacheManager.get(key);
      }
}
