import { Http } from "./http";

import { PlaceOrderController, SimulateFreightController } from "@/infra/controllers";
import { RepositoryFactory } from "@/domain/factories";

export class RouteConfig {
  constructor(
    private readonly http: Http,
    private readonly repositoryFactory: RepositoryFactory
  ) {
    this.http.on("/orders", "post", async (params: any, body: any) => {
      const placeOrderController = new PlaceOrderController(
        this.repositoryFactory
      );
      return placeOrderController.handle(params, body);
    });

    // this.http.on(
    //   "/simulate-freight",
    //   "post",
    //   async (params: any, body: any) => {
    //     const simulateFreightController = new SimulateFreightController();
    //     const output = await simulateFreight.execute(input);
    //     return output;
    //   }
    // );
  }
}
