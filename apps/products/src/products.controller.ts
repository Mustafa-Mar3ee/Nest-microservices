import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '@app/common/auth';
import { CurrentUser, User } from '@app/common';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createProductDto: CreateProductDto, @CurrentUser() user: User) {
    return this.productsService.create(createProductDto, user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('sortBy') sortBy: string = 'price',
    @Query('name') name: string = ''
  ) {
    return this.productsService.findAll(page, limit, sortBy, name);
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
