import { Order } from "@/domain/entities";

export interface OrderRepository {
  save(order: Order): Promise<void>;
  count(): Promise<number>;
}
