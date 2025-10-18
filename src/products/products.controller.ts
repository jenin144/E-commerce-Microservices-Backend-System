import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus, NotFoundException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() product: Product) {
    return this.productsService.createProduct(product);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() product: Partial<Product>) {
    return this.productsService.updateProduct(Number(id), product);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.productsService.deleteProduct(Number(id));
  }
}
