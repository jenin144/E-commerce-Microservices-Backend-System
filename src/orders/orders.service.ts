import { Injectable } from '@nestjs/common';
import { CartService } from '../cart/cart.service';
import { ProductsService } from '../products/products.service';
import { Order } from './order.entity';

export type OrderItem = { productId: number; quantity: number; price: number };
export type OrderStatus = 'pending' | 'completed' | 'canceled';

@Injectable()
export class OrdersService {
  private orders: Order[] = [];
  private idCounter = 1;

  constructor(
    private cartService: CartService,
    private productsService: ProductsService,
  ) {}

  async createOrder(userId: number): Promise<Order> {
    const cart = await this.cartService.getCart(userId);
    if (cart.items.length === 0) throw new Error('Cart is empty');

    const items: OrderItem[] = [];
    let totalPrice = 0;

    for (const i of cart.items) {
      const product = await this.productsService.findOne(i.productId);
      if (i.quantity > product.quantity)
        throw new Error(`Not enough stock for product ${product.name}`);
      items.push({
        productId: product.id,
        quantity: i.quantity,
        price: product.price,
      });
      totalPrice += product.price * i.quantity;

      product.quantity -= i.quantity;
    }

    const order: Order = {
      id: this.idCounter++,
      userId,
      items,
      totalPrice,
      status: 'pending',
    };

    this.orders.push(order);
    await this.cartService.clearCart(userId);
    return order;
  }

  async findAll(userId: number): Promise<Order[]> {
    return this.orders.filter((o) => o.userId === userId);
  }

  async updateStatus(orderId: number, status: OrderStatus): Promise<Order> {
    const order = this.orders.find((o) => o.id === orderId);
    if (!order) throw new Error('Order not found');
    order.status = status;
    return order;
  }
}
