import { Coupon } from "@/domain/entities";

export interface CouponRepository {
  findByCode(coupon: string): Promise<Coupon | undefined>;
}
