import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsService } from '../products/products.service';

export type CartItem = { productId: number; quantity: number };
export type Cart = { userId: number; items: CartItem[] };

@Injectable()
export class CartService {
  private carts: Cart[] = [];

  constructor(private productsService: ProductsService) {}

  async getCart(userId: number): Promise<Cart> {
    let cart = this.carts.find((c) => c.userId === userId);
    if (!cart) {
      cart = { userId, items: [] };
      this.carts.push(cart);
    }
    return cart;
  }

  async addItem(
    userId: number,
    productId: number,
    quantity: number,
  ): Promise<Cart> {
    const product = await this.productsService.findOne(productId);
    if (quantity > product.quantity) throw new Error('Not enough stock');

    const cart = await this.getCart(userId);
    const item = cart.items.find((i) => i.productId === productId);
    if (item) item.quantity += quantity;
    else cart.items.push({ productId, quantity });

    return cart;
  }

  async removeItem(userId: number, productId: number): Promise<Cart> {
    const cart = await this.getCart(userId);
    cart.items = cart.items.filter((i) => i.productId !== productId);
    return cart;
  }

  async clearCart(userId: number): Promise<Cart> {
    const cart = await this.getCart(userId);
    cart.items = [];
    return cart;
  }
}
