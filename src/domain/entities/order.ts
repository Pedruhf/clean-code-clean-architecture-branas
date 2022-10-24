import { Coupon, Cpf, Item, OrderItem, DefaultFreightCalculator, FreightCalculator } from "@/domain/entities";
import { OrderCode } from "./order-code";

export class Order {
  private cpf: Cpf;
  public orderItems: OrderItem[];
  public coupon?: Coupon;
  private freight: number;
  private code: OrderCode;

  constructor (
    cpf: string,
    private readonly date: Date = new Date(),
    private readonly freightCalculator: FreightCalculator = new DefaultFreightCalculator(),
    private readonly sequence: number = 1
    ) {
    this.cpf = new Cpf(cpf);
    this.orderItems = [];
    this.freight = 0;
    this.code = new OrderCode(date, sequence);
  }

  addItem(item: Item, quantity: number): void {
    this.freight += this.freightCalculator.calculate(item) * quantity;
    this.orderItems.push(new OrderItem(item.id, item.price, quantity));
  }

  addCoupon(coupon: Coupon): void {
    if (coupon.isExpired(this.date)) return;
    this.coupon = coupon;
  }

  getFreight(): number {
    return this.freight;
  }

  getCode(): string {
    return this.code.value;
  }

  getCpf(): string {
    return this.cpf.getValue();
  }

  getOrderItems(): OrderItem[] {
    return this.orderItems;
  }

  getDate(): Date {
    return this.date;
  }

  getSequence(): number {
    return this.sequence;
  }

  getTotal(): number {
    let total = 0;
    for (const orderItem of this.orderItems) {
      total += orderItem.getTotal();
    }

    if (this.coupon) {
      total -= this.coupon.getDiscountAmount(total);
    }

    const roundedTotal = Math.round((total + Number.EPSILON) * 100) / 100;
    return roundedTotal + this.getFreight();
  }
}
