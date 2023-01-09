import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly product: Repository<Product>,
  ) {}
  create(createProductDto: CreateProductDto) {
    return this.product
      .insert({
        name: createProductDto.name,
        description: createProductDto.description,
      })
      .then((res) => this.product.findOneBy(res.raw[0].id));
  }

  findAll() {
    return this.product.find();
  }

  findOne(id: number) {
    return this.product.findOneByOrFail({ id: id as unknown as string });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const updateItem = await this.product.update(id, updateProductDto);
    if (updateItem.affected == 1) {
      return 'update';
    }
  }

  async remove(id: number) {
    const deleteItem = await this.product.delete(id);
    if (deleteItem.affected == 1) {
      return 'deleted';
    }
  }

  async search(search: string) {
    const searchName = await this.product
      .createQueryBuilder('products')
      .select()
      .where('products.name ILIKE :search', { search: `%${search}%` })
      .orWhere('products.description ILIKE :search', { search: `%${search}%` })
      .getMany();
    return searchName;
  }

  async order() {
    const orderBy = await this.product.find({ order: { name: 'ASC' } });
    return orderBy;
  }
}
