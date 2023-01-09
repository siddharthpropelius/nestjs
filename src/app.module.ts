import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configService } from './config/config.servcie';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from '@nestjs/config';
import { UserCreatedSeed } from './config/database/seeder/createProduct.seed';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    UserModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserCreatedSeed],
  exports: [UserCreatedSeed],
})
export class AppModule {}
