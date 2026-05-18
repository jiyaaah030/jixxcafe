import { useLocation, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

function Result() {

  const location = useLocation();
  const navigate = useNavigate();

  const personality = location.state?.personality;
  const name = location.state?.name;

  return (

    <div className="result-page">

      <Navbar />

      <div className="result-container">

        <div className="quiz-box result-box">

          <p className="result-tag">
            {name}, your coffee personality is
          </p>

          <h1 className="result-title">
            {personality}
          </h1>

          <p className="result-description">
            You are spontaneous, adventurous,
            and effortlessly cool.
          </p>

          <button
            className="retry-btn"
            onClick={() => navigate("/")}
          >
            Take Quiz Again
          </button>

        </div>

      </div>

    </div>

  );
}

export default Result;