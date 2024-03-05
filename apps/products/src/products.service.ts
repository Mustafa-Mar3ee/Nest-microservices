import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsRepository } from './products.repository';
import { Product } from './models/product.entity';

@Injectable()
export class ProductsService {
  constructor(private readonly productRepository: ProductsRepository) { }
  create(createProductDto: CreateProductDto, userId: number) {
    const product = new Product({
      ...createProductDto,
      userId
    })
    return this.productRepository.create(product)
  }

  async findAll(page: number, limit: number, sortBy: string, name: string) {
    let queryBuilder = await this.productRepository.queryBuilder('product')

    if (name) {
      queryBuilder = queryBuilder.where('product.name LIKE :name', {
        name: `%${name}%`,
      });
    }
    queryBuilder = queryBuilder.orderBy(`product.${sortBy}`, 'ASC');

    const products = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();

    return products;

  }

  findOne(id: number) {
    return this.productRepository.findOne({ id })
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.productRepository.findOneAndUpdate({ id }, updateProductDto)
  }

  remove(id: number) {
    return this.productRepository.findOneAndDelete({ id })
  }
}
