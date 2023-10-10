"use client";
import client from "@/lib/ApolloClient";
import { ApolloProvider } from "@apollo/client";
import { ReactNode } from "react";

const BaseProviders: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default BaseProviders;
