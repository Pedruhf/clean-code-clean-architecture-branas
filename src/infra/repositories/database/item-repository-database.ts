import { ItemRepository } from "@/domain/contracts/repositories";
import { Item } from "@/domain/entities";
import { Connection } from "@/infra/database";

export class ItemRepositoryDatabase implements ItemRepository {
  constructor (private readonly connection: Connection) {}

  async findById(idItem: number): Promise<Item | undefined> {
    const [item] = await this.connection.query("SELECT * FROM items WHERE id_item = $1", [idItem]);
    if (!item) return;
    return new Item(item.id_item, item.category, item.description, item.price, item.width, item.height, item.length, item.weight);
  }
}
