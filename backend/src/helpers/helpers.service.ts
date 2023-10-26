import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, ServiceUnavailableException } from '@nestjs/common';
import { catchError, lastValueFrom, map } from 'rxjs';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
@Injectable()
export class HelpersService {
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) { }
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
