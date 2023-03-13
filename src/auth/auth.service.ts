import { Injectable } from '@nestjs/common/decorators';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  login(body: any): object {
    const payload = {
      username: body.username,
    };

    // console.log(body.id);

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
