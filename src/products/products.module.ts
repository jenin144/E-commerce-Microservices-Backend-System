// products/products.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // 1. استيراد
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './product.entity'; // 2. استيراد الـ Entity

@Module({
  imports: [TypeOrmModule.forFeature([Product])], // 3. إضافة الـ Entity هنا
  providers: [ProductsService],
  controllers: [ProductsController],
  exports: [ProductsService],
})
export class ProductsModule {}