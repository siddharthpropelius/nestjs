import { DataSource } from 'typeorm';

import { Factory, Seeder } from 'typeorm-seeding';
import { Product } from '../../../products/entities/product.entity';

export class UserCreatedSeed implements Seeder {
  public async run(factory: Factory, connection: DataSource): Promise<void> {
    await factory(Product)().createMany(20);
  }
}
