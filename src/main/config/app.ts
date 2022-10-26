import { PgPromiseConnectionAdapter } from "@/infra/database";
import { DatabaseRepositoryFactory } from "@/infra/factories";
import { ExpressAdapter } from "@/infra/http";
import { RouteConfig } from "@/infra/http/route-config";

const expressAdapter = new ExpressAdapter();

const connection = PgPromiseConnectionAdapter.getInstance();
const repositoryFactory = new DatabaseRepositoryFactory(connection);
new RouteConfig(expressAdapter, repositoryFactory);

export { expressAdapter };
