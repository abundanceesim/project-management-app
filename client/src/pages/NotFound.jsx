import { FaExclamationTriangle} from 'react-icons/fa'
import {Link} from 'react-router-dom'

export default function NotFound() {
  return (
    <div className='d-flex flex-column justify-content-center
    align-items-center mt-5 not-found'>
        <FaExclamationTriangle className='text-danger' size='5em' />
        <h1>404</h1>
        <h5 className='mb-4'>Sorry, this page does not exist</h5>
        <Link to='/' className='btn btn-primary'>Go Back</Link>
    </div>
  )
}
