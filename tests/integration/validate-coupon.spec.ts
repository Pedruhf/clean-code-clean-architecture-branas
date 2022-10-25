import { ValidateCoupon } from "@/application/use-cases/validate-coupon";
import { CouponRepository } from "@/domain/contracts/repositories";
import { Connection, PgPromiseConnectionAdapter } from "@/infra/database";
import { CouponRepositoryDatabase } from "@/infra/repositories/database";

describe("ValidateCoupon", () => {
  let connection: Connection;
  let couponRepository: CouponRepository;

  beforeAll(() => {
    connection = PgPromiseConnectionAdapter.getInstance();
    couponRepository = new CouponRepositoryDatabase(connection);
  })

  test("Should validate a coupon", async () => {
    const sut = new ValidateCoupon(couponRepository);
    const isValid = await sut.execute("VALE20");

    expect(isValid).toBe(true);
  });
});
