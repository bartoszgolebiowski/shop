import ApolloClient from "apollo-boost";
import { GRAPHQL_SERVER_URL_TEST } from "../../constants/server/constants";

export default function configureClient() {
  const client = new ApolloClient({
    uri: GRAPHQL_SERVER_URL_TEST,
    request: operation => {
      const token = localStorage.getItem("token");
      operation.setContext({
        headers: {
          authorization: token ? `Bearer ${token}` : ""
        }
      });
    }
  });

  return client;
}
