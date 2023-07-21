import { gql } from "@apollo/client";
// gql variables are written in upper case by convention
const GET_CLIENTS = gql`
  query getClients {
    clients {
      id
      name
      email
      phone
    }
  }
`;

export {GET_CLIENTS}