import { client } from "./gqlClient";

import { CognitoUser } from "amazon-cognito-identity-js";
import { Auth } from "aws-amplify";
import { secondsToMilliseconds } from "date-fns";
import { Variables, GraphQLClient } from "graphql-request/build/esm/index";

import { QueryFunctionContext } from "react-query";

const CLIENT_TIMEOUT = secondsToMilliseconds(90);
const SERVER_TIMEOUT = secondsToMilliseconds(25);

const TIMEOUT_MS =
  typeof window !== "undefined" ? CLIENT_TIMEOUT : SERVER_TIMEOUT;

const getClientAccessToken = async () => {
  return getAccessToken(Auth);
};

const getAccessToken = async (auth) => {
  let token = "";
  try {
    console.log("servicing/fetcher:getAccessToken - getting cognito user");
    const user: CognitoUser = await auth.currentAuthenticatedUser();
    token = user.getSignInUserSession()?.getAccessToken().getJwtToken() ?? "";
  } catch (e) {
    console.log(`servicing/fetcher:getAccessToken - user is not authenticated`);
    token = "";
  }
  return token;
};

export const fetchData = <TData, TVariables extends Variables>(
  query: string,
  variables?: TVariables,
  headers?: RequestInit["headers"]
): ((context?: QueryFunctionContext) => Promise<TData>) => {
  return async (context) => {
    console.log("fetch", fetch);

    const client = new GraphQLClient(
      "https://6vx564r013.execute-api.us-east-2.amazonaws.com",
      { fetch }
    );
    console.log("context", context);
    const requestId = 1;
    console.log(`servicing/fetcher:fetchData - start`, {
      requestId,
      query,
      variables,
      headers,
    });
    console.log("headers", headers);
    const abortController = new AbortController();
    const abortTimeout = setTimeout(() => abortController.abort(), TIMEOUT_MS);

    try {
      let token = await getClientAccessToken();

      if (!token) {
        throw new Error("Auth token not present");
      }

      const signal = abortController.signal;

      console.log("made it here", token);

      const data = await client.request<TData>({
        document: query,
        variables,
        signal,
        requestHeaders: {
          authorization: (token && `Bearer ${token}`) ?? "",
          ...headers,
        },
      });

      console.log(`servicing/fetcher:fetchData - success`, { requestId });

      return data;
    } catch (error) {
      if (abortController.signal.aborted) {
        console.log(
          "servicing/fetcher:fetchData - request was aborted",
          error,
          { requestId }
        );
      } else {
        console.log("servicing/fetcher:fetchData - fetch data error", error, {
          requestId,
        });
      }
      throw error;
    } finally {
      clearTimeout(abortTimeout);
    }
  };
};
