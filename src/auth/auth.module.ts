import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt/dist';
import { Constants } from '../common/constants/constants';
import { JwtStrategy } from '../common/guards/jwt/jwt.strategy';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({
      // secret: Constants.JWT_SECRET_KEY,
      secret: 'This is my secret key',
      signOptions: {
        // expiresIn: Constants.JWT_EXPIRED_IN,
        expiresIn: '60m',
      },
    }),
  ],
  exports: [AuthService],
  controllers: [],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
