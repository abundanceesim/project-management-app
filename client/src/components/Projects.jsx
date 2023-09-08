import Spinner from "./Spinner"
import { useQuery } from '@apollo/client'
import { GET_PROJECTS } from "../queries/projectQueries"
import ProjectCard from "./ProjectCard"

export default function Projects() {
  const { loading, error, data } = useQuery(GET_PROJECTS)

  if (loading) return <Spinner/>
  if (error) return <p>Something Went Wrong</p>

  const emptyProject = ''

  return (
    <>
        {data.projects.length > 0 ? (
            <div className="row mt-4 ">
                { data.projects.map((project) => (
                    <ProjectCard key={project.id} project={project}/>
                )) }
            </div>
        ): (<div className="row mt-4 mb-3"><ProjectCard project={emptyProject}/></div>)}
    </>
  )
}
