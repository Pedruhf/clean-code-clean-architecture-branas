export class OrderCode {
  public readonly value: string;

  constructor(private readonly date: Date, private readonly sequence: number) {
    this.value = this.generateCode(this.date, this.sequence);
  }

  private generateCode(date: Date, sequence: number): string {
    const year = date.getFullYear();
    const formattedSequence = sequence.toString().padStart(8, "0");
    return `${year}${formattedSequence}`;
  }
}
