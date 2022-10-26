import { OrderRepository } from "@/domain/contracts/repositories";
import { RepositoryFactory } from "@/domain/factories";
import { GetOrderOutput } from "./get-order-output";

export class GetOrder {
  private readonly orderRepository: OrderRepository;

  constructor(private readonly repositoryFactory: RepositoryFactory) {
    this.orderRepository = repositoryFactory.createOrderRepository();
  }

  async execute(code: string): Promise<GetOrderOutput> {
    const order = await this.orderRepository.get(code);
    return new GetOrderOutput(order.getCode(), order.getTotal());
  }
}
