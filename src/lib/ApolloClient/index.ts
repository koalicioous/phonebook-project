import { Contact } from "@/services/contact/types";
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_PHONEBOOK_GRAPHQL_URI,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          contact: {
            keyArgs: false,
            merge(
              existing: {
                __ref: string;
              }[] = [],
              incoming: {
                __ref: string;
              }[]
            ) {
              const uniqueContactIds = new Set(
                existing.map((contact) => contact.__ref)
              );

              const filteredIncoming = incoming.filter(
                (contact) => !uniqueContactIds.has(contact.__ref)
              );

              return [...existing, ...filteredIncoming];
            },
          },
        },
      },
    },
  }),
});

export const cache = client.cache;

export default client;
