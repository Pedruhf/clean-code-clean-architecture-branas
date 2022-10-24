import { Cpf } from "@/domain/entities";

describe("CPF", () => {
  let cpf: string;
  let sut: Cpf;

  beforeAll(() => {
    cpf = "005.899.640-03"
  });

  beforeEach(() => {
    sut = new Cpf(cpf);
  });

  test("Should throw when CPF is invalid", () => {
    const invalidCpf = "invalid_cpf";
    expect(() => new Cpf(invalidCpf)).toThrow(new Error("Invalid cpf"));
  });

  test("Should throw when CPF is invalid", () => {
    const invalidCpf = "001.002.003-00";
    expect(() => new Cpf(invalidCpf)).toThrow(new Error("Invalid cpf"));
  });

  test("Should throw when CPF is blocked", () => {
    const blockedCpf = "000.000.000-00";
    expect(() => new Cpf(blockedCpf)).toThrow(new Error("Invalid cpf"));
  });

  test("Should throw when CPF is falsy", () => {
    const blockedCpf = null;
    expect(() => new Cpf(blockedCpf as any)).toThrow(new Error("Invalid cpf"));
  });
});
