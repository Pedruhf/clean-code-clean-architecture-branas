import { OrderCode } from "@/domain/entities";

describe("OrderCode", () => {
  test("Should create a order code", () => {
    const date = new Date("2021-10-21");
    const sequence = 1;
    const sut = new OrderCode(date, sequence);

    expect(sut.value).toBe("202100000001");
  });
});
