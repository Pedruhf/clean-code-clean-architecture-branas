import express, { Express, Request, Response } from "express";

import { AcceptedHttpMethods, Http } from "./http";

export class ExpressAdapter implements Http {
  public app: Express;

  constructor() {
    this.app = express();
    this.app.use(express.json());
  }

  on(url: string, method: AcceptedHttpMethods, fn: any): void {
    this.app[method](url, async (req: Request, res: Response) => {
      const output = await fn(req.params, req.body);
      res.json(output);
    });
  }

  listen(port: number): void {
    this.app.listen(port);
  }
}
