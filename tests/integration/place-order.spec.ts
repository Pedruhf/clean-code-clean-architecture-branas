import {
  PlaceOrder,
  PlaceOrderInput,
} from "@/application/use-cases/place-order";
import { RepositoryFactory } from "@/domain/factories";
import { Connection, PgPromiseConnectionAdapter } from "@/infra/database";
import { MemoryRepositoryFactory } from "@/infra/factories";
import { OrderRepositoryDatabase } from "@/infra/repositories/database";

describe("PlaceOrder", () => {
  let input: PlaceOrderInput;
  let connection: Connection;
  let orderRepository: OrderRepositoryDatabase;
  let repositoryFactory: RepositoryFactory;
  let sut: PlaceOrder;

  beforeAll(() => {
    input = new PlaceOrderInput(
      "005.899.640-03",
      [
        { idItem: 1, quantity: 1 },
        { idItem: 2, quantity: 1 },
        { idItem: 3, quantity: 3 },
      ],
      new Date(),
      "INVALID_COUPON"
    );
  });

  beforeEach(() => {
    connection = PgPromiseConnectionAdapter.getInstance();
    orderRepository = new OrderRepositoryDatabase(connection);
    // repositoryFactory = new DatabaseRepositoryFactory(connection);
    repositoryFactory = new MemoryRepositoryFactory();
    sut = new PlaceOrder(repositoryFactory);
  });

  afterEach(async () => {
    await orderRepository.clear();
  });

  test("Should place a order", async () => {
    const output = await sut.execute(input);
    // (30 * 1) CD + (50 * 1) DVD + (10 * 3) VHS + 70 frete
    expect(output.total).toBe(160);
  });

  test("Should place a order with freight", async () => {
    const input = new PlaceOrderInput(
      "005.899.640-03",
      [
        { idItem: 4, quantity: 1 },
        { idItem: 5, quantity: 1 },
        { idItem: 6, quantity: 3 },
      ],
      new Date()
    );
    const output = await sut.execute(input);
    // 260 + 6090 = 6350
    expect(output.total).toBe(6350);
  });

  test("Should throw if item not found", async () => {
    const input = new PlaceOrderInput(
      "005.899.640-03",
      [{ idItem: -1, quantity: 1 }],
      new Date()
    );
    const outputPromise = sut.execute(input);
    await expect(outputPromise).rejects.toThrow(new Error("Item not found"));
  });

  test("Should place a order with code", async () => {
    const output = await sut.execute(input);
    expect(output.code).toBe("202200000001");
  });
});
