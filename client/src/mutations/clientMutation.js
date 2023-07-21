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

export {DELETE_CLIENT}