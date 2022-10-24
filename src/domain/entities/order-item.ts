export class OrderItem {
  constructor (
    readonly itemId: number,
    readonly price: number,
    readonly quantity: number,
  ) {}

  getTotal(): number {
    return this.price * this.quantity;
  }
}
