import { GetOrder } from "@/application/use-cases/get-order";
import {
  PlaceOrder,
  PlaceOrderInput,
} from "@/application/use-cases/place-order";
import { RepositoryFactory } from "@/domain/factories";
import { Connection, PgPromiseConnectionAdapter } from "@/infra/database";
import { DatabaseRepositoryFactory } from "@/infra/factories";
import { OrderRepositoryDatabase } from "@/infra/repositories/database";

describe("PlaceOrder", () => {
  let input: PlaceOrderInput;
  let connection: Connection;
  let orderRepository: OrderRepositoryDatabase;
  let repositoryFactory: RepositoryFactory;
  let placeOrder: PlaceOrder
  let sut: GetOrder;

  beforeAll(() => {
    input = new PlaceOrderInput(
      "005.899.640-03",
      [
        { idItem: 1, quantity: 1 },
        { idItem: 2, quantity: 1 },
        { idItem: 3, quantity: 3 },
      ],
      new Date(),
      "VALE20"
    );
  });

  beforeEach(() => {
    connection = PgPromiseConnectionAdapter.getInstance();
    orderRepository = new OrderRepositoryDatabase(connection);
    repositoryFactory = new DatabaseRepositoryFactory(connection);
    placeOrder = new PlaceOrder(repositoryFactory);
    sut = new GetOrder(repositoryFactory);
  });

  afterEach(async () => {
    await orderRepository.clear();
  });

  test("Should get a order by code", async () => {
    const output = await placeOrder.execute(input);
    const order = await sut.execute(output.code);
    expect(order.code).toBe("202200000001");
    expect(order.total).toBe(128);
  });
});
