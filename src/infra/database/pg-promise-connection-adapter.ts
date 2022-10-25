import pgPromise from "pg-promise";

import { Connection } from "@/infra/database";

export class PgPromiseConnectionAdapter implements Connection {
  static instance: PgPromiseConnectionAdapter;
  public pgp: any;

  private constructor () {
    this.pgp = pgPromise()("postgres://postgres:admin123456@localhost:5432/cc_ca_branas");
  }

  static getInstance() {
    if (!PgPromiseConnectionAdapter.instance) {
      PgPromiseConnectionAdapter.instance = new PgPromiseConnectionAdapter();
    }

    return PgPromiseConnectionAdapter.instance;
  }

  async query(statement: string, params: any[]): Promise<any> {
    return await this.pgp.query(statement, params);
  }
}
