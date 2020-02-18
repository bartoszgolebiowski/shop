import ApolloClient from 'apollo-boost';
import { GRAPHQL_SERVER_URL_TEST} from '../../constants/server/constants'

export default function configureClient() {
    const client = new ApolloClient({
        uri: GRAPHQL_SERVER_URL_TEST,
    });

    return client;
}

export function configureClientTest() {
    const client = new ApolloClient({
        uri: GRAPHQL_SERVER_URL_TEST,
    });

    return client;
}
