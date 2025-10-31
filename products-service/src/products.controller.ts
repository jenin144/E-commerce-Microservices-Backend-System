import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern({ cmd: 'getAllProducts' })
  async getAllProducts() {
    return this.productsService.findAll();
  }

  @MessagePattern({ cmd: 'getProductById' })
  async getProductById(@Payload() data: { id: number }) {
    return this.productsService.findOne(data.id);
  }

  @MessagePattern({ cmd: 'createProduct' })
  async createProduct(@Payload() product: Product) {
    return this.productsService.createProduct(product);
  }

  @MessagePattern({ cmd: 'updateProduct' })
  async updateProduct(@Payload() data: { id: number; update: Partial<Product> }) {
    return this.productsService.updateProduct(data.id, data.update);
  }

  @MessagePattern({ cmd: 'deleteProduct' })
  async deleteProduct(@Payload() data: { id: number }) {
    return this.productsService.deleteProduct(data.id);
  }

  @MessagePattern({ cmd: 'decreaseQuantity' })
  async decreaseQuantity(@Payload() data: { id: number; qty: number }) {
    return this.productsService.decreaseQuantity(data.id, data.qty);
  }

  @MessagePattern({ cmd: 'increaseQuantity' })
  async increaseQuantity(@Payload() data: { id: number; qty: number }) {
    return this.productsService.increaseQuantity(data.id, data.qty);
  }
}
