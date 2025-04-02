import { APOLLO_OPTIONS } from "apollo-angular";
import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import { HttpLink } from "@apollo/client/core";

const uri = 'http://localhost:4000/graphql';

export function createApollo() {
    return new ApolloClient({
        link: new HttpLink({ uri }),
        cache: new InMemoryCache(),
    });
}

export const apolloProvider = {
    provide: APOLLO_OPTIONS,
    useFactory: createApollo,
};