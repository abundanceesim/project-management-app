import { Link, useParams } from 'react-router-dom'
// useParams can be used to retrieve params from a link
import { FaArrowLeft} from 'react-icons/fa'
import Spinner from '../components/Spinner'
import { useQuery} from '@apollo/client'
import { GET_PROJECT } from '../queries/projectQueries'
import ClientInfo from '../components/ClientInfo'
import DeleteProjectButton from '../components/DeleteProjectButton'
import EditProjectForm from '../components/EditProjectForm'

export default function Project() {
    const { id } = useParams()
    const { loading, error, data} = useQuery(GET_PROJECT, 
        { variables: {id}})

    if (loading) return <Spinner/>
    if (error) return <p>Something Went Wrong</p>
  return (
    <>
      {!loading && !error && (
        <div className="mx-auto w-75 card p-4 mt-4">
          <Link to="/" className="btn btn-dark btn-sm w-auto d-inline ms-auto">
            <div className="d-flex justify-content-center align-items-center">
              <FaArrowLeft className="icon" /> Home
            </div>
          </Link>

          <h5>Project Details</h5>
          <div className="card">
            <div className="card-body">
              <div className="card">
                <div className="card-body project-card">
                  <h6>Name</h6>
                  <p>{data.project.name}</p>
                </div>
              </div>
              <div className="card mt-3">
                <div className="card-body project-card">
                  <h6>Description</h6>
                  <p>{data.project.description}</p>
                </div>
              </div>
              <div className="card mt-3">
                <div className="card-body project-card">
                  <h6>Status</h6>
                  <p>{data.project.status}</p>
                </div>
              </div>

              <div className="modal-container mt-2">
                <div className="modals">
                  <DeleteProjectButton projectId={data.project.id} />
                </div>
              </div>
            </div>
          </div>

          <ClientInfo client={data.project.client} />

          <EditProjectForm project={data.project} />
        </div>
      )}
    </>
  );
}
