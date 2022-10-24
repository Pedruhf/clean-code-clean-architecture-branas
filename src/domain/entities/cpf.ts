export class Cpf {
  constructor (private readonly value: string) {
    if (!this.validate(this.value)) throw new Error("Invalid cpf");
  }

  calculateDigit(cpf: string, factor: number): number {
    let total = 0;
    for (const digit of cpf) {
      if (factor > 1) total += parseInt(digit) * factor--;
    }
    const rest = total % 11;
    return (rest < 2) ? 0 : 11 - rest;
  }

  clean(cpf: string): string {
    return cpf.replace(/\D/g, "");
  }

  hasValidLength(cpf: string): boolean {
    return cpf.length === 11;
  }

  isBlocked(cpf: string): boolean {
    const [firstDigit] = cpf;
    return [...cpf].every(digit => digit === firstDigit);
  }

  validate(cpf: string): boolean {
    if (!cpf) return false;
    cpf = this.clean(cpf);
    if (!this.hasValidLength(cpf)) return false;
    if (this.isBlocked(cpf)) return false;
    const digit1 = this.calculateDigit(cpf, 10);
    const digit2 = this.calculateDigit(cpf, 11);
    const calculateDigit = `${digit1}${digit2}`;
    const actualDigit = cpf.slice(9);
    return actualDigit === calculateDigit;
  }

  getValue(): string {
    return this.value;
  }
}
