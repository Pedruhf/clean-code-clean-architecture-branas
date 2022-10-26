import { Order } from "@/domain/entities";

export interface OrderRepository {
  save(order: Order): Promise<void>;
  get(code: string): Promise<Order>;
  count(): Promise<number>;
  clear(): Promise<void>;
}
