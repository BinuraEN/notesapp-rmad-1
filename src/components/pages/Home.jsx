import { ChevronRight } from "@mui/icons-material";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container w-50 p-5 d-flex justify-content-center align-items-center elevation-0">
      <div className="card">
        <div className="card-body">
          <div className="d-flex flex-column align-items-center justify-content-center">
            <img
              src="/img/sticky-notes.png"
              alt="notes"
              srcset=""
              width="400px"
              height="400px"
              className="mb-2"
            />
            <h4 className="display-6 mb-2">Welcome to Notes app</h4>
            <Link to="/add-note">
              <button className="btn btn-primary">
                Create note <ChevronRight />{" "}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
