import { Module, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import helmet from 'helmet';
// Yeni middleware'leri import edin
import { rateLimiter } from './middleware/rate-limiter.middleware';
//import { IpFilterMiddleware } from './middleware/ip-filter.middleware';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // .env dosyası
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: +configService.get<number>('DATABASE_PORT'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        autoLoadEntities: true,
        synchronize: true,
        logging: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    FilesModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // Helmet güvenlik başlıklarını eklemek için
    consumer
      .apply(helmet())
      .forRoutes('*');
    // Rate limiter middleware'i uygulamak
    consumer
      .apply(rateLimiter)
      .forRoutes('*');
    // IP filtreleme middleware'i uygulamak
   /* consumer
      .apply(IpFilterMiddleware)
      .forRoutes('*');
      */
  }
      
}