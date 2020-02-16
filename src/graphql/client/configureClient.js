import ApolloClient from 'apollo-boost';
import { GRAPHQL_SERVER_URL } from '../../constants/server/constants'

export default function configureClient() {
    const client = new ApolloClient({
        uri: GRAPHQL_SERVER_URL,
    });

    return client;
}
