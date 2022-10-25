import { DefaultFreightCalculator, Order } from "@/domain/entities";
import { CouponRepository, ItemRepository, OrderRepository } from "@/domain/contracts/repositories";
import { PlaceOrderInput, PlaceOrderOutput } from "@/application/use-cases/place-order";
import { RepositoryFactory } from "@/domain/factories";

export class PlaceOrder {
  private readonly itemRepository: ItemRepository;
  private readonly couponRepository: CouponRepository;
  private readonly orderRepository: OrderRepository;


  constructor (private readonly repositoryFactory: RepositoryFactory) {
    this.itemRepository = repositoryFactory.createItemRepository();
    this.couponRepository = repositoryFactory.createCouponRepository();
    this.orderRepository = repositoryFactory.createOrderRepository();
  }

  async execute({ cpf, date, orderItems, coupon }: PlaceOrderInput): Promise<PlaceOrderOutput> {
    const sequence = await this.orderRepository.count() + 1;
    const order = new Order(cpf, date, new DefaultFreightCalculator(), sequence);
    for (const orderItem of orderItems) {
      const item = await this.itemRepository.findById(orderItem.idItem);
      if (!item) throw new Error("Item not found");
      order.addItem(item, orderItem.quantity)
    }
    if (coupon) {
      const cpn = await this.couponRepository.findByCode(coupon);
      if (cpn) order.addCoupon(cpn);
    }
    await this.orderRepository.save(order);
    const total = order.getTotal();
    const output = new PlaceOrderOutput(order.getCode(), total);
    return output;
  }
}
