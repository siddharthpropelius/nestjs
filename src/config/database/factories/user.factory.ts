import { define } from 'typeorm-seeding';
import { Product } from '../../../products/entities/product.entity';
import { randFullName } from '@ngneat/falso';

define(Product, () => {
  const product = new Product();
  product.name = randFullName();
  product.description = randFullName();
  return product;
});
