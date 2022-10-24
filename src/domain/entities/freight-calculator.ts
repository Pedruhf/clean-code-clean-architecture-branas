import { Item } from "@/domain/entities";

export interface FreightCalculator {
  calculate(item: Item): number;
}
