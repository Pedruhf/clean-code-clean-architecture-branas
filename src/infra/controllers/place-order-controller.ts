import { DatabaseRepositoryFactory } from "@/infra/factories";
import { PlaceOrder } from "@/application/use-cases/place-order";
import { RepositoryFactory } from "@/domain/factories";

export class PlaceOrderController {
  constructor (private readonly repositoryFactory: RepositoryFactory)
 {}
  async handle(params: any, body: any) {
    const input = Object.assign(body, {
      date: new Date(body.date),
    });
    const placeOrder = new PlaceOrder(this.repositoryFactory);
    const output = await placeOrder.execute(input);
    return output;
  }
}
