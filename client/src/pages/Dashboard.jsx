import { useEffect, useState } from "react";
import { getAnalytics } from "../services/api";
import Navbar from "../components/Navbar";

function Dashboard() {

  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {

    getAnalytics()
  .then((data) => setAnalytics(data))
  .catch((err) => console.log(err));

  }, []);

  if (!analytics) {
    return <h1>Loading...</h1>;
  }

  return (
     <div className="dashboard-page">

    <Navbar />

    <div className="dashboard">

      <h1>JixxCafe Analytics ☕</h1>

      <div className="stats-container">

        <div className="stat-card">
          <h2>Total Users</h2>
          <p>{analytics.totalUsers}</p>
        </div>

      </div>

      <div className="personality-section">

        <h2>Personality Distribution</h2>

        {Object.entries(analytics.personalityCount).map(
          ([type, count]) => (

            <div key={type} className="personality-card">

              <h3>{type}</h3>

              <p>{count} users</p>

            </div>

          )
        )}

      </div>

    </div>

    </div>

  );
}

export default Dashboard;