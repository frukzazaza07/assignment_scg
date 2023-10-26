import {
    CanActivate,
    ExecutionContext,
    Injectable,
    ForbiddenException,
} from '@nestjs/common';
import { HelpersService } from '../helpers/helpers.service';
import { GoogleMapService } from 'src/services/google-map/google-map/google-map.service';

@Injectable()
export class CaptchaGuard implements CanActivate {
    constructor(
        private readonly googleMapService: GoogleMapService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.headers['g-recaptcha-response'];
        const response = await this.googleMapService.googleValidateCaptcha(token);
        if (!response.tokenProperties?.valid) {
            throw new ForbiddenException('Please captcha check');
        }
        return true;
    }
}
