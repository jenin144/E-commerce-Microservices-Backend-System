import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(@Inject('PRODUCTS_SERVICE') private readonly productsClient: ClientProxy) {}

  async findAll(): Promise<Product[]> {
    return lastValueFrom(this.productsClient.send({ cmd: 'getAllProducts' }, {}));
  }

  async findOne(id: number): Promise<Product | null> {
    const product = await lastValueFrom(this.productsClient.send({ cmd: 'getProductById' }, { id }));
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async createProduct(product: Product): Promise<Product> {
    return lastValueFrom(this.productsClient.send({ cmd: 'createProduct' }, product));
  }

  async updateProduct(id: number, update: Partial<Product>): Promise<Product | null> {
    const product = await this.findOne(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    Object.assign(product, update); 
    return lastValueFrom(this.productsClient.send({ cmd: 'updateProduct' }, { id, update }));
  }

  async deleteProduct(id: number): Promise<boolean> {
    const product = await this.findOne(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    await lastValueFrom(this.productsClient.send({ cmd: 'deleteProduct' }, { id }));
    return true;
  }

async decreaseQuantity(id: number, qty: number): Promise<void> {
  const product = await this.findOne(id);
  
  if (!product) {
    throw new NotFoundException('Product not found');
  }

  if (product.quantity < qty) {
    throw new BadRequestException('Not enough stock');
  }
  
  product.quantity -= qty;
  
  await lastValueFrom(this.productsClient.send({ cmd: 'decreaseQuantity' }, { id, qty }));
}

async increaseQuantity(id: number, qty: number): Promise<void> {
  const product = await this.findOne(id);
  
  if (!product) {
    throw new NotFoundException('Product not found');
  }

  product.quantity += qty;
  
  await lastValueFrom(this.productsClient.send({ cmd: 'increaseQuantity' }, { id, qty }));
}

}
