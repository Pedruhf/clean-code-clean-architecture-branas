import { Item, FreightCalculator } from "@/domain/entities";

export class FixedFreightCalculator implements FreightCalculator {
  public readonly minFreight = 20;

  calculate(item: Item): number {
    return this.minFreight;
  }
}
