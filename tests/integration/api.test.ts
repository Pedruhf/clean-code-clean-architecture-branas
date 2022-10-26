import request from "supertest";

import { expressAdapter } from "@/main/config";

describe("API", () => {
  test("Should test API (POST /orders)", async () => {
    const { body } = await request(expressAdapter.app)
      .post("/orders")
      .send({
        cpf: "053.249.510-13",
        orderItems: [
          { idItem: 1, quantity: 1 },
          { idItem: 2, quantity: 1 },
          { idItem: 3, quantity: 3 },
        ],
        date: new Date(),
        coupon: "VALE20",
      });

    expect(body.code).toBe("202200000001");
    expect(body.total).toBe(128);
  });

  // test("Should test API (POST /simulate-freight)", async () => {
  //   const { body } = await request(expressAdapter.app)
  //     .post("/simulate-freight")
  //     .send({
  //       items: [
  //         { idItem: 4, quantity: 1 },
  //         { idItem: 5, quantity: 1 },
  //         { idItem: 6, quantity: 3 },
  //       ],
  //     });
  //   expect(body.amount).toBe(260);
  // });
});
