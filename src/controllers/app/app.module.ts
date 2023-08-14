import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/users/user.service';
import { UserSchema } from '../../data/models/user';
import { ImageMiddleware } from '../../middlewares/file.middleware';
import { Seeder } from '../../data/db/seedAdmin';
import { ConvertToBool } from '../../utils/convertToBool';
import { ObjectIdValidator } from '../../utils/objectId.validator.utils';
import { PaystackService } from './../../services/paystack/paystack.service';
import { PaymentSchema } from '../../data/models/payment.model';
import { ContactSchema } from '../../data/models/contact.model';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from '../../services/app/app.service';
import { PaymentController } from '../payment/payment.controller';
import { ContactController } from '../contact/contact.controller';
import { APP_FILTER } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ContactService } from '../../services/contact/contact.service';
import { HttpExceptionFilter } from '../../middlewares/global.exc.handler';
import { UserController } from '../user/user.controller';
import { AuthController } from '../auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [
    AppController,
    PaymentController,
    ContactController,
    UserController,
    AuthController,
  ],
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_REMOTE_URI),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: config.get<string | number>('JWT_EXPIRES'),
            issuer: config.get<string>('JWT_ISSUER'),
          },
        };
      },
    }),
    MongooseModule.forFeature([{ name: 'Contact', schema: ContactSchema }]),
    MongooseModule.forFeature([{ name: 'Payment', schema: PaymentSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  providers: [
    AppService,
    ContactService,
    PaystackService,
    UserService,
    AuthService,
    ObjectIdValidator,
    ConvertToBool,
    Seeder,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule, OnApplicationBootstrap {
  constructor(private seeder: Seeder) {}
  onApplicationBootstrap() {
    this.seeder.seedAdmin();
  }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ImageMiddleware).forRoutes('uploads/users');
  }
}
