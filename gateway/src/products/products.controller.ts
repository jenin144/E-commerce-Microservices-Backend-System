import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus, NotFoundException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() product: Product) {
    return this.productsService.createProduct(product);
  }

  @Get()
  async findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const product = await this.productsService.findOne(Number(id)); 
    return product;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() product: Partial<Product>) {
    const updatedProduct = await this.productsService.updateProduct(Number(id), product);
    if (!updatedProduct) throw new NotFoundException('Product not found');
    return updatedProduct;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    const result = await this.productsService.deleteProduct(Number(id));
    if (!result) throw new NotFoundException('Product not found');
    return;
  }
}
