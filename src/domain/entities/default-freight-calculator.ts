import { Item, FreightCalculator } from "@/domain/entities";

export class DefaultFreightCalculator implements FreightCalculator {
  public readonly minFreight = 10;

  calculate(item: Item): number {
    if (!item.weight || !item.height || !item.length || !item.weight) return 0;
    const freight = 1000 * item.getVolume() * (item.getDensity() / 100);
    return Math.max(this.minFreight, freight);
  }
}
