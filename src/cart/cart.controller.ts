import { Controller, Get, Post, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { CartService } from './cart.service';
import { AuthGuard } from '../../gateway/src/common/auth/auth.guard';

@Controller('cart')
@UseGuards(AuthGuard)
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  getCart(@Request() req) {
    return this.cartService.getCart(req.user.sub);
  }

  @Post('add')
  addItem(@Request() req, @Body() body: { productId: number; quantity: number }) {
    return this.cartService.addItem(req.user.sub, body.productId, body.quantity);
  }

  @Delete('remove/:productId')
  removeItem(@Request() req, @Param('productId') productId: string) {
    return this.cartService.removeItem(req.user.sub, Number(productId));
  }

  @Delete('clear')
  clearCart(@Request() req) {
    return this.cartService.clearCart(req.user.sub);
  }
}
