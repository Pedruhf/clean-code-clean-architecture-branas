import { Coupon } from "@/domain/entities/coupon";

describe("Coupon", () => {
  let sut: Coupon;

  beforeEach(() => {
    sut = new Coupon("VALE10PORCENTO", 10, new Date("2023-10-20"));
  })

  test("Should create a coupon", () => {
    expect(sut.isValid()).toBe(true);
  });

  test("Should create a expired coupon", () => {
    const coupon = new Coupon("VALE10PORCENTO", 10, new Date("2022-10-21"));
    expect(coupon.isExpired()).toBe(true);
  });

  test("Should get discount amount", () => {
    const amount = 500;
    expect(sut.getDiscountAmount(amount)).toBe(50);
  });

  test("Should not get discount amount when is expired", () => {
    const coupon = new Coupon("VALE10PORCENTO", 10, new Date("2022-10-21"));
    const amount = 500;
    expect(coupon.getDiscountAmount(amount)).toBe(0);
  });
});
