import AddClientModal from "../components/AddClientModal";
import AddProjectModal from "../components/AddProjectModal";
import Projects from "../components/Projects";
import Clients from "../components/Clients";

export default function Home() {
  return (
    <>
      <div className="modal-container mt-3">
        <div className="d-flex gap-2 modals">
          <AddClientModal />
          <AddProjectModal />
        </div>
      </div>
      <div className="card mt-3">
        <div className="card-body">
          <h5 className="header">PROJECTS</h5>
          <Projects />
        </div>
      </div>

      <div className="card mt-3">
        <div className="card-body">
          <h5 className="header">CLIENTS</h5>
          <Clients />
        </div>
      </div>
    </>
  );
}
