import { SimulateFreight } from "@/application/use-cases/simulate-freight";
import { FreightCalculator } from "@/domain/entities";
import { ItemRepositoryDatabase } from "@/infra/repositories/database";

export class SimulateFreightController {
  constructor(
    private readonly itemRepository: ItemRepositoryDatabase,
    private readonly freightCalculator: FreightCalculator
  ) {}

  async handle(params: any, body: any) {
    const input = Object.assign(body, {
      date: new Date(body.date),
    });
    const simulateFreight = new SimulateFreight(this.itemRepository, this.freightCalculator);
    const output = await simulateFreight.execute(input);
    return output;
  }
}
