import pgPromise from "pg-promise";

import { Connection } from "@/infra/database";

export class PgPromiseConnectionAdapter implements Connection {
  public pgp: any;

  constructor () {
    this.pgp = pgPromise()("postgres://postgres:admin123456@localhost:5432/cc_ca_branas");
  }

  async query(statement: string, params: any[]): Promise<any> {
    return await this.pgp.query(statement, params);
  }
}
