import {
  ItemRepository,
  CouponRepository,
  OrderRepository,
} from "@/domain/contracts/repositories";
import { RepositoryFactory } from "@/domain/factories";
import {
  CouponRepositoryMemory,
  ItemRepositoryMemory,
  OrderRepositoryMemory,
} from "@/infra/repositories/memory";

export class MemoryRepositoryFactory implements RepositoryFactory {
  createItemRepository(): ItemRepository {
    return new ItemRepositoryMemory();
  }
  createCouponRepository(): CouponRepository {
    return new CouponRepositoryMemory();
  }
  createOrderRepository(): OrderRepository {
    return new OrderRepositoryMemory();
  }
}
