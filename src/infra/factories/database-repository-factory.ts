import {
  ItemRepository,
  CouponRepository,
  OrderRepository,
} from "@/domain/contracts/repositories";
import { RepositoryFactory } from "@/domain/factories";
import { Connection } from "@/infra/database";
import {
  CouponRepositoryDatabase,
  ItemRepositoryDatabase,
  OrderRepositoryDatabase,
} from "@/infra/repositories/database";

export class DatabaseRepositoryFactory implements RepositoryFactory {
  constructor(private readonly connection: Connection) {}

  createItemRepository(): ItemRepository {
    return new ItemRepositoryDatabase(this.connection);
  }
  createCouponRepository(): CouponRepository {
    return new CouponRepositoryDatabase(this.connection);
  }
  createOrderRepository(): OrderRepository {
    return new OrderRepositoryDatabase(this.connection);
  }
}
