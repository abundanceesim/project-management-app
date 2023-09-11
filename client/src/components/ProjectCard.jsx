import { FaMinusCircle, FaRegClock, FaRegCheckCircle} from 'react-icons/fa'
export default function ProjectCard({ project }) {
  return (
    <>
      {project.name ? (
        <div className="col-md-6">
          <div className="card mb-3 project-card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="card-title">{project.name}</h5>
                <a className="btn btn-dark" href={`/projects/${project.id}`}>
                  View
                </a>
              </div>
              <p className="small">
                Status: <strong> {project.status}{" "} </strong> 
                  {(() => {
                    switch (project.status) {
                      case "Not Started":
                        return <FaMinusCircle style={{ color:"red", marginBottom: "2px"}}/>;
                      case "In Progress":
                        return (
                          <FaRegClock
                            style={{ color: "#656e69", marginBottom: "2px" }}
                          />
                        );
                      case "Completed":
                        return (
                          <FaRegCheckCircle
                            style={{ color: "#05ed43", marginBottom: "2px" }}
                          />
                        );
                      default:
                        return (
                          <FaMinusCircle style={{ marginBottom: "2px" }} />
                        );
                    }
                  })()}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="col-md-6">
          <div className="card mb-3 no-projects">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <h6 className="card-title mt-3 mb-3">
                  <i>No projects available</i>
                </h6>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
