import { Controller, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from 'src/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // @Post()
  @MessagePattern({ cmd: 'create-product' })
  create(@Payload() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  // @Get()
  @MessagePattern({ cmd: 'find-all-products' })
  findAll(@Payload() pagination: PaginationDto) {
    return this.productsService.findAll(pagination);
  }

  // @Get(':id')
  @MessagePattern({ cmd: 'find-one-product' })
  findOne(@Payload('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  // @Patch(':id')
  @MessagePattern({ cmd: 'update-product' })
  update(
    // @Param('id', ParseIntPipe) id: number,
    @Payload() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(updateProductDto.id, updateProductDto);
  }

  // @Delete(':id')
  @MessagePattern({ cmd: 'delete-products' })
  remove(@Payload('id') id: string) {
    return this.productsService.remove(+id);
  }

  @MessagePattern({ cmd: 'validate_products' })
  validateProducts(@Payload() ids: number[]) {
    return this.productsService.validateProducts(ids);
  }
}
