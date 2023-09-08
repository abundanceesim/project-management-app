
export default function ProjectCard({ project }) {
  return (
    <>
      {project.name ? (
        <div className="col-md-6">
          <div
            className="card mb-3"
            style={{ backgroundColor: "rgba(243, 243, 243, 0.61)" }}
          >
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="card-title">{project.name}</h5>
                <a className="btn btn-dark" href={`/projects/${project.id}`}>
                  View
                </a>
              </div>
              <p className="small">
                Status: <strong>{project.status}</strong>
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
