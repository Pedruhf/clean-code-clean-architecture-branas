import {
  SimulateFreight,
  SimulateFreightInput,
} from "@/application/use-cases/simulate-freight";
import { ItemRepository } from "@/domain/contracts/repositories";
import { DefaultFreightCalculator, FreightCalculator } from "@/domain/entities";
import { Connection, PgPromiseConnectionAdapter } from "@/infra/database";
import { ItemRepositoryDatabase } from "@/infra/repositories/database";

describe("SimulateFreight", () => {
  let connection: Connection;
  let itemRepository: ItemRepository;
  let freightCalculator: FreightCalculator;

  beforeEach(() => {
    connection = PgPromiseConnectionAdapter.getInstance();
    freightCalculator = new DefaultFreightCalculator();
    itemRepository = new ItemRepositoryDatabase(connection);
  });

  test("Should simulate a freight", async () => {
    const sut = new SimulateFreight(itemRepository, freightCalculator);
    const input = new SimulateFreightInput([
      { idItem: 4, quantity: 1, },
      { idItem: 5, quantity: 1, },
      { idItem: 6, quantity: 3, },
    ]);

    const output = await sut.execute(input);
    expect(output.amount).toBe(260);
  });
});
