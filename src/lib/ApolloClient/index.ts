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
            merge(existing: Contact[] = [], incoming: Contact[]) {
              const uniqueContactIds = new Set(
                existing.map((contact) => contact.id)
              );

              const filteredIncoming = incoming.filter(
                (contact) => !uniqueContactIds.has(contact.id)
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
