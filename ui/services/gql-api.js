import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  gql
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { HttpLink } from '@apollo/client/link/http';

import { GRAPHQL_URI, APPSYNC_API_KEY } from "@env";

const graphqlUri = GRAPHQL_URI;
const appsyncApiKey = APPSYNC_API_KEY;

export default class GraphqlAPI {
  static async query(query_string) {
    console.log("query string", query_string);
    return GraphqlAPI.request("query", query_string);
  }
  static async mutation(query_string) {
    return GraphqlAPI.request("mutation", query_string);
  }

  static async request(method, query_string) {
    console.log(appsyncApiKey);
    try{
    const httpLink = new HttpLink({ uri: graphqlUri });
    const authMiddleware = new ApolloLink((operation, forward) => {
      // add the authorization to the headers
      operation.setContext(() => ({
        headers: {
          "X-Api-Key": appsyncApiKey,
        },
      }));

      return forward(operation);
    });

    console.log("authMiddleware",authMiddleware)

    const errorLink = handleErrors();

    const client = new ApolloClient({
      cache: new InMemoryCache({
        addTypename: false,
      }),
      link: ApolloLink.from([errorLink, authMiddleware, httpLink]),
    });

    if (method == "query") {
      return client.query({
        query: gql`
          ${query_string}
        `,
      });
    } else if (method == "mutation") {
      console.log(query_string)
      return client.mutate({
        mutation: gql`
          ${query_string}
        `,
      });
    }

    }
    catch(err){
      console.log("Error creating graphql request", err)
    }
    
  }
}

const handleErrors = () => {
  return onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        if (
          err.message === "Valid authorization header not provided." ||
          err.message === "Token has expired."
        ) {
          console.error("Valid ID token not present or token expired");
        }
      }
    }
    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  });
};
