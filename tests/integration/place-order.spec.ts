import { PlaceOrder, PlaceOrderInput } from "@/application/use-cases/place-order";
import { Connection, PgPromiseConnectionAdapter } from "@/infra/database";
import { CouponRepositoryDatabase, ItemRepositoryDatabase, OrderRepositoryDatabase } from "@/infra/repositories/database";

describe("PlaceOrder", () => {
  let input: PlaceOrderInput;
  let connection: Connection;
  let itemRepository: ItemRepositoryDatabase;
  let couponRepository: CouponRepositoryDatabase;
  let orderRepository: OrderRepositoryDatabase;
  let sut: PlaceOrder;

  beforeAll(() => {
    input = new PlaceOrderInput(
      "005.899.640-03",
      [
        { idItem: 1, quantity: 1},
        { idItem: 2, quantity: 1},
        { idItem: 3, quantity: 3},
      ],
      new Date(),
      "INVALID_COUPON",
    );
  });

  beforeEach(() => {
    connection = PgPromiseConnectionAdapter.getInstance();
    itemRepository = new ItemRepositoryDatabase(connection);
    couponRepository = new CouponRepositoryDatabase(connection);
    orderRepository = new OrderRepositoryDatabase(connection);
    sut = new PlaceOrder(itemRepository, orderRepository, couponRepository);
  });

  afterEach(async () => {
    await orderRepository.clear();
  })

  test("Should place a order", async () => {
    const output = await sut.execute(input);
    // (1000 * 1) Guitarra + (5000 * 1) Amplificador + (30 * 3) Cabo + 260 frete
    expect(output.total).toBe(6350);
  });

  test("Should place a order with freight", async () => {
    const input = new PlaceOrderInput(
      "005.899.640-03",
      [
        { idItem: 4, quantity: 1},
        { idItem: 5, quantity: 1},
        { idItem: 6, quantity: 3},
      ],
      new Date(),
    );
    const output = await sut.execute(input);
    // 260 + 6090 = 6350
    expect(output.total).toBe(6350);
  });

  test("Should throw if item not found", async () => {
    const input = new PlaceOrderInput(
      "005.899.640-03",
      [ { idItem: -1, quantity: 1} ],
      new Date(),
    );
    const outputPromise = sut.execute(input);
    await expect(outputPromise).rejects.toThrow(new Error("Item not found"));
  });

  test("Should place a order with code", async () => {
    const output = await sut.execute(input);
    expect(output.code).toBe("202200000001");
  });
});
