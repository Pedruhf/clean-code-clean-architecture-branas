import { ItemRepository } from "@/domain/contracts/repositories";
import { Item } from "@/domain/entities";

export class ItemRepositoryMemory implements ItemRepository {
  public items: Item[];

  constructor() {
    this.items = [
      new Item(1, "Música", "CD", 30, 30, 30, 10, 0.3),
      new Item(2, "Vídeo", "DVD", 50, 40, 20, 10, 0.5),
      new Item(3, "Vídeo", "VHS", 10, 40, 20, 10, 0.5),
      new Item(4, "Instrumentos Musicais", "Guitarra", 1000, 100, 30, 10, 3),
      new Item(5, "Instrumentos Musicais", "Amplificador", 5000, 100, 50, 50, 20),
      new Item(6, "Instrumentos Musicais", "Cabo", 30, 10, 10, 10, 0.9),
    ];
  }

  async findById(idItem: number): Promise<Item | undefined> {
    return Promise.resolve(this.items.find((item) => item.id === idItem));
  }
}
