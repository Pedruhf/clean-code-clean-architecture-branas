import { CouponRepository } from "@/domain/contracts/repositories";
import { Coupon } from "@/domain/entities";
import { Connection } from "@/infra/database";

export class CouponRepositoryDatabase implements CouponRepository {
  constructor (private readonly connection: Connection) {}

  async findByCode(coupon: string): Promise<Coupon | undefined> {
    const [couponData] = await this.connection.query("SELECT * FROM coupons WHERE code = $1", [coupon]);
    if (!couponData) return;
    return new Coupon(couponData.code, couponData.percentage, couponData.expire_date);
  }
}
