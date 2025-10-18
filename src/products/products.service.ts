import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Laptop',
      description: 'Gaming Laptop',
      price: 1200,
      quantity: 10,
    },
    {
      id: 2,
      name: 'Mouse',
      description: 'Wireless Mouse',
      price: 50,
      quantity: 20,
    },
  ];

  async findAll(): Promise<Product[]> {
    return this.products;
  }

  async findOne(id: number): Promise<Product> {
    const product = this.products.find((p) => p.id === id);
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async createProduct(product: Product): Promise<Product> {
    const exists = this.products.find((p) => p.id === product.id);
    if (exists) throw new BadRequestException('Product ID already exists');
    this.products.push(product);
    return product;
  }

  async updateProduct(id: number, update: Partial<Product>): Promise<Product> {
    const product = await this.findOne(id);
    if (!product) throw new NotFoundException('Product not found');

    Object.assign(product, update);
    return product;
  }

  async deleteProduct(id: number): Promise<void> {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) throw new NotFoundException('Product not found');
    this.products.splice(index, 1);
  }
  
  async decreaseQuantity(id: number, qty: number): Promise<void> {
    const product = await this.findOne(id);
    if (!product) throw new NotFoundException('Product not found');
    if (product.quantity < qty)
      throw new BadRequestException('Not enough stock');
    product.quantity -= qty;
  }

  async increaseQuantity(id: number, qty: number): Promise<void> {
    const product = await this.findOne(id);
    if (!product) throw new NotFoundException('Product not found');
    product.quantity += qty;
  }
}
