import { FaUserTimes } from 'react-icons/fa'
import { useMutation } from '@apollo/client'
import { DELETE_CLIENT } from '../mutations/clientMutation';
import { GET_CLIENTS } from '../queries/clientQueries';
import { GET_PROJECTS } from '../queries/projectQueries';

function ClientRow({ client }) {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: {id: client.id}, //add variables object if you need to pass arguments
    refetchQueries: [{query: GET_CLIENTS}, {query: GET_PROJECTS}] //query to run after mutation is complete
    // update(cache, {data: {deleteClient}}){
    //     const {clients} = cache.readQuery({ query:GET_CLIENTS});
    //     cache.writeQuery({
    //         query: GET_CLIENTS,
    //         data: {clients: clients.filter(client => client.id !== deleteClient.id)}
    //     })
    // }
  })

  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <button className="btn btn-danger" onClick={deleteClient}>
          <div className="d-flex gap-2 align-items-center ">
            {" "}
            Remove
            <FaUserTimes />
          </div>
        </button>
      </td>
    </tr>
  );
}

export default ClientRow