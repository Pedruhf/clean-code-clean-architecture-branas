import { OrderRepository } from "@/domain/contracts/repositories";
import { Order } from "@/domain/entities";
import { Connection } from "@/infra/database";

export class OrderRepositoryDatabase implements OrderRepository {
  constructor(private readonly connection: Connection) {}

  async save(order: Order): Promise<void> {
    const [orderData] = await this.connection.query(
      "INSERT INTO orders (code, cpf, issue_date, freight, sequence, coupon) value ($1, $2, $3, $4, $5, $6)",
      [
        order.getCode(),
        order.getCpf(),
        order.getDate(),
        order.getFreight(),
        order.getSequence(),
        order.coupon?.code,
      ]
    );
    for (const orderItem of order.getOrderItems()) {
      await this.connection.query(
        "INSERT INTO order_items (id_item, id_order, price, quantity) VALUES ($1, $2, $3, $4)",
        [
          orderItem.itemId,
          orderData.id_order,
          orderItem.price,
          orderItem.quantity,
        ]
      );
    }
  }

  async count(): Promise<number> {
    const [orderData] = await this.connection.query("SELECT COUNT(*)::int AS count FROM orders", []);
    return orderData.count;
  }


  async clear(): Promise<void> {
    await this.connection.query("DELETE FROM order_items", []);
    await this.connection.query("DELETE FROM orders", []);
  }
}
