import {gql} from '@apollo/client'

const DELETE_CLIENT = gql`
    mutation deleteClient($id: ID!){
        deleteClient(id: $id){
            id
            name
            email
            phone
        }
    }
`
// line 5 is you actually calling the mutation and passing in the id

const ADD_CLIENT = gql`
  mutation addClient($name: String!, $email: String!, $phone: String!) {
    addClient(name: $name, email: $email, phone: $phone) {
      id
      name
      email
      phone
    }
  }
`;


export {ADD_CLIENT, DELETE_CLIENT}