import { CouponRepository } from "@/domain/contracts/repositories";
import { Coupon } from "@/domain/entities";

export class CouponRepositoryMemory implements CouponRepository {
  public coupons: Coupon[];

  constructor() {
    this.coupons = [
      new Coupon("VALE10", 10),
      new Coupon("VALE20", 20),
      new Coupon("VALE30", 30),
    ]
  }

  findByCode(coupon: string): Promise<Coupon | undefined> {
    return Promise.resolve(this.coupons.find((cpn) => cpn.code === coupon));
  }
}
