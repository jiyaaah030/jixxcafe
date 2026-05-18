import { useNavigate } from "react-router-dom";
import { useState } from "react";

import Navbar from "../components/Navbar";

function Home() {

  const [name, setName] = useState("");

  const navigate = useNavigate();

  return (
    <div className="home-page">

  <Navbar />

    <div className="home">

      <div className="blob blob1"></div>
      <div className="blob blob2"></div>

      <div className="hero">

        <h1>
          Discover Your <br /> Coffee Personality
        </h1>

        <p>
          Take a fun little quiz and find the drink
          that matches your vibe perfectly.
        </p>

        <input
  type="text"
  placeholder="Enter your name..."
  className="name-input"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>

        <button
  onClick={() =>
    navigate("/quiz", {
      state: { name }
    })
  }
>
  Start Your Quiz
</button>

      </div>

    </div>
    </div>
  );
}

export default Home;