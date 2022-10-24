import { Coupon, Item, Order, FixedFreightCalculator } from "@/domain/entities";

describe("Order", () => {
  let cpf: string;
  let sut: Order;

  beforeAll(() => {
    cpf = "005.899.640-03"
  })

  beforeEach(() => {
    sut = new Order(cpf);
  })

  test("Should throw when cpf is invalid", () => {
    const invalidCpf = "invalid_cpf";
    expect(() => new Order(invalidCpf)).toThrow(new Error("Invalid cpf"));
  });

  test("Should create a order with 3 items", () => {
    sut.addItem(new Item(1, "Informatica", "Mouse", 150), 1);
    sut.addItem(new Item(2, "Informatica", "Teclado", 250), 1);
    sut.addItem(new Item(3, "Drogas", "Cigarro", 5.60), 3);
    expect(sut.getTotal()).toBe(416.8);
  });

  test("Should create a order with discount cupon", () => {
    sut.addItem(new Item(1, "Doce", "Bigbig", 0.50), 10);
    sut.addItem(new Item(2, "Doce", "Pelota pop", 0.50), 10);
    sut.addItem(new Item(3, "Doce", "Fini", 5.00), 10);
    sut.addCoupon(new Coupon("VALE10PORCENTO", 10));
    expect(sut.getTotal()).toBe(54);
  });

  test("Should create a order with expired cupon", () => {
    const order = new Order(cpf, new Date("2022-10-20"));
    order.addItem(new Item(1, "Doce", "Bigbig", 0.50), 10);
    order.addItem(new Item(2, "Doce", "Pelota pop", 0.50), 10);
    order.addItem(new Item(3, "Doce", "Fini", 5.00), 10);
    order.addCoupon(new Coupon("VALE10PORCENTO", 10, new Date("2021-10-22")));
    expect(order.getTotal()).toBe(60);
  });

  test("Should create a order with freight with default freight strategy", () => {
    const order = new Order(cpf, new Date("2022-10-20"));
    order.addItem(new Item(1, "Instrumentos Musicais", "Guitarra", 1000, 100, 30, 10, 3), 1);
    order.addItem(new Item(2, "Instrumentos Musicais", "Amplificador", 5000, 100, 50, 50, 20), 1);
    order.addItem(new Item(3, "Instrumentos Musicais", "Cabo", 30, 10, 10, 10, 0.9), 3);
    expect(order.getFreight()).toBe(260);
  });

  test("Should create a order with freight with fixed freight strategy", () => {
    const order = new Order(cpf, new Date("2022-10-20"), new FixedFreightCalculator());
    order.addItem(new Item(1, "Instrumentos Musicais", "Guitarra", 1000, 100, 30, 10, 3), 1);
    order.addItem(new Item(2, "Instrumentos Musicais", "Amplificador", 5000, 100, 50, 50, 20), 1);
    order.addItem(new Item(3, "Instrumentos Musicais", "Cabo", 30, 10, 10, 10, 0.9), 3);
    expect(order.getFreight()).toBe(100);
  });

  test("Should create a order with code", () => {
    expect(sut.getCode()).toBe("202200000001");
  });
});
