import {gql, useQuery} from '@apollo/client'
// gql is used to make the queries, but useQuery is used to 
// use the query and get the data, states etc
import ClientRow from './ClientRow';
import { GET_CLIENTS } from '../queries/clientQueries';
import Spinner from './Spinner';

export default function Clients() {
//   destructure for application state after query is executed
  const { loading, error, data } = useQuery(GET_CLIENTS);

  if (loading) return <Spinner/>
  if (error) return <p>Something Went Wrong</p>

  return (
    <>
      {!loading && !error && (
        <table className="table table-hover mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th></th>
            </tr>
          </thead>
          <tbody> {/*pass in the client as a prop*/}
            {data.clients.map(client => (
                <ClientRow key={client.id} client={client}/>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

