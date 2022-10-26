import { OrderRepository } from "@/domain/contracts/repositories";
import { Coupon, DefaultFreightCalculator, Item, Order } from "@/domain/entities";
import { Connection } from "@/infra/database";

export class OrderRepositoryDatabase implements OrderRepository {
  constructor(private readonly connection: Connection) {}

  async save(order: Order): Promise<void> {
    const [orderData] = await this.connection.query(
      "INSERT INTO orders (code, cpf, freight, issue_date, total, coupon_code, coupon_percentage, sequence) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        order.getCode(),
        order.getCpf(),
        order.getFreight(),
        order.getDate(),
        order.getTotal(),
        order.coupon?.code,
        order.coupon?.percentage,
        order.getSequence(),
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

  async get(code: string): Promise<Order> {
    const [orderData] = await this.connection.query(
      "SELECT * FROM orders WHERE code = $1",
      [code]
    );
    if (!orderData) throw new Error("Order not found");

    const orderItemsData = await this.connection.query(
      "SELECT * FROM order_items WHERE id_order = $1",
      [orderData.id_order]
    );
    const order = new Order(
      orderData.cpf,
      orderData.issue_date,
      new DefaultFreightCalculator(),
      orderData.sequence
    );

    for (const orderItemData of orderItemsData) {
      const [itemData] = await this.connection.query(
        "SELECT * FROM items WHERE id_item = $1",
        [orderItemData.id_item]
      );
      const item = new Item(
        itemData.id_item,
        itemData.category,
        itemData.description,
        Number(itemData.price),
        itemData.width,
        itemData.height,
        itemData.length,
        itemData.weight
      );
      order.addItem(item, orderItemData.quantity);
    }

    if (orderData.coupon_code) {
      const [couponData] = await this.connection.query(
        "SELECT * FROM coupons WHERE code = $1",
        [orderData.coupon_code]
      );
      const coupon = new Coupon(couponData.code, couponData.percentage, couponData.expires_date);
      order.addCoupon(coupon);
    }

    return order;
  }

  async count(): Promise<number> {
    const [orderData] = await this.connection.query(
      "SELECT COUNT(*)::int AS count FROM orders",
      []
    );
    return orderData.count;
  }

  async clear(): Promise<void> {
    await this.connection.query("DELETE FROM order_items", []);
    await this.connection.query("DELETE FROM orders", []);
  }
}
