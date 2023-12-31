import { useNavigate } from 'react-router-dom'
import { FaTrashAlt } from 'react-icons/fa'
import { GET_PROJECTS } from '../queries/projectQueries'
import { DELETE_PROJECT } from '../mutations/projectMutations'
import { useMutation } from '@apollo/client'

export default function DeleteProjectButton({ projectId }) {

  const navigate = useNavigate()

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: projectId },
    onCompleted: () => navigate("/"),
    refetchQueries: [{ query: GET_PROJECTS }],
  });


  return (
      <button className="btn btn-danger" onClick={deleteProject}>
        <div className="d-flex  ms-auto  align-items-center">
          <FaTrashAlt className="icon" /> Delete
        </div>
      </button>
  );
}
