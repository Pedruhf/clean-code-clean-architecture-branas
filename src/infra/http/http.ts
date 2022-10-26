export type AcceptedHttpMethods = "get" | "post" | "put" | "delete";

export interface Http {
  on(url: string, method: AcceptedHttpMethods, fn: any): void;
  listen(port: number): void;
}
