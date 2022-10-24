import { ItemRepository } from "@/domain/contracts/repositories";
import { SimulateFreightInput, SimulateFreightOutput } from "@/application/use-cases/simulate-freight";
import { FreightCalculator } from "@/domain/entities";

export class SimulateFreight {
  constructor (private readonly itemRepository: ItemRepository, private readonly freightCalculator: FreightCalculator) {}

  async execute({ items }: SimulateFreightInput): Promise<SimulateFreightOutput> {
    let amount = 0;
    for (const inputItem of items) {
      const item = await this.itemRepository.findById(inputItem.idItem);
      if (!item) throw new Error("Item not found");
      amount += this.freightCalculator.calculate(item) * inputItem.quantity;
    }
    return new SimulateFreightOutput(amount);
  }
}
