import {
  CouponRepository,
  ItemRepository,
  OrderRepository,
} from "@/domain/contracts/repositories";

export interface RepositoryFactory {
  createItemRepository(): ItemRepository;
  createCouponRepository(): CouponRepository;
  createOrderRepository(): OrderRepository;
}
