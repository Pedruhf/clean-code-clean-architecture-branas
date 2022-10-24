import { OrderItem } from "@/domain/entities";

describe("OrderItem", () => {
  let sut: OrderItem;

  beforeEach(() => {
    sut = new OrderItem(1, 10, 2);
  });


  test("Should create a orderItem", () => {
    expect(sut.getTotal()).toBe(20);
  });
});
