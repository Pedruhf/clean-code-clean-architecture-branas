import { Item } from "@/domain/entities";

export interface ItemRepository {
  findById(idItem: number): Promise<Item | undefined>;
}
