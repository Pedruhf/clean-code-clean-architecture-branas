export class Coupon {
  constructor(
    readonly code: string,
    readonly percentage: number,
    readonly expiredDate?: Date
  ) {}

  public isValid(now: Date = new Date()): boolean {
    if (!this.expiredDate) return true;
    return this.expiredDate.getTime() >= now.getTime();
  }

  public isExpired(now: Date = new Date()): boolean {
    return !this.isValid(now);
  }


  public getDiscountAmount(amount: number): number {
    if (this.isExpired()) return 0;
    return (amount * this.percentage) / 100;
  }
}
