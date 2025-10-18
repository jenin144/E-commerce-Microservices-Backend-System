import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CartController } from './cart/cart.controller';
import { CartService } from './cart/cart.service';
import { CartModule } from './cart/cart.module';
import { OrdersService } from './orders/orders.service';
import { OrdersModule } from './orders/orders.module';
import { OrdersController } from './orders/orders.controller';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ProductsModule,
    CartModule,
    OrdersModule,
    OrdersModule,
  ],
  controllers: [AppController, CartController, OrdersController],
  providers: [AppService, CartService, OrdersService],
})
export class AppModule {}
