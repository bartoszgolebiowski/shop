import gql from "graphql-tag";

export const GET_RATES = gql`
  {
    rates(currency: "USD") {
      currency
    }
  }
`;
