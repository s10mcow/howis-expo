import { GraphQLClient } from "graphql-request/build/esm/index";
import crossFetch from "cross-fetch";
const endpoint = process.env["GRAPHQL_API_URL"];
console.log("endpoint", endpoint);
console.log("fetch", crossFetch);
export const client = new GraphQLClient(
  "https://6vx564r013.execute-api.us-east-2.amazonaws.com",
  { fetch: crossFetch }
);
console.log("client", client);
