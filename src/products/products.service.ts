// products/products.service.ts

import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  // 1. إزالة المصفوفة
  // private products: Product[] = [ ... ];
  
  // 2. حقن الـ Repository
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productsRepository.findOneBy({ id: id });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async createProduct(product: Product): Promise<Product> {
    // التحقق من ID ليس ضرورياً إذا كان PrimaryGeneratedColumn
    const newProduct = this.productsRepository.create(product);
    return this.productsRepository.save(newProduct);
  }

  async updateProduct(id: number, update: Partial<Product>): Promise<Product> {
    const product = await this.findOne(id); // سيعطي خطأ NotFound إذا لم يكن موجوداً
    
    Object.assign(product, update);
    return this.productsRepository.save(product);
  }

  async deleteProduct(id: number): Promise<void> {
    const product = await this.findOne(id); // تأكد أنه موجود
    await this.productsRepository.remove(product);
  }

  async decreaseQuantity(id: number, qty: number): Promise<void> {
    const product = await this.findOne(id);
    if (product.quantity < qty)
      throw new BadRequestException('Not enough stock');
      
    product.quantity -= qty;
    await this.productsRepository.save(product);
  }

  async increaseQuantity(id: number, qty: number): Promise<void> {
    const product = await this.findOne(id);
    product.quantity += qty;
    await this.productsRepository.save(product);
  }
}