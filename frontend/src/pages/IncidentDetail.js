import { useEffect, useState } from "react";
import API from "../api";
import { useParams, Link } from "react-router-dom";

function IncidentDetail() {
  const { id } = useParams();

  const [incident, setIncident] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIncident = async () => {
      try {
        const res = await API.get(`/incidents/${id}`);
        setIncident(res.data);
      } catch (err) {
        console.error("Error fetching incident:", err);
        setIncident(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchIncident();
    }
  }, [id]);

  const handleChange = (e) => {
    setIncident({ ...incident, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await API.patch(`/incidents/${id}`, incident);
      alert("Updated successfully");
    } catch (err) {
      alert("Update failed");
    }
  };

  // 🔹 Loading UI
  if (loading) {
    return (
      <div className="container">
        <h2>Loading...</h2>
      </div>
    );
  }

  // 🔹 Not Found UI
  if (!incident) {
    return (
      <div className="container">
        <h2>Incident not found</h2>
        <Link to="/">
          <button style={{ marginTop: "15px" }}>Back to List</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Incident Detail</h2>

      <label>Title</label>
      <input
        name="title"
        value={incident.title}
        onChange={handleChange}
      />

      <label>Status</label>
      <select
        name="status"
        value={incident.status}
        onChange={handleChange}
      >
        <option value="OPEN">OPEN</option>
        <option value="MITIGATED">MITIGATED</option>
        <option value="RESOLVED">RESOLVED</option>
      </select>

      <label>Owner</label>
      <input
        name="owner"
        value={incident.owner || ""}
        onChange={handleChange}
      />

      <label>Summary</label>
      <textarea
        name="summary"
        value={incident.summary || ""}
        onChange={handleChange}
      />

      <button style={{ marginTop: "15px" }} onClick={handleUpdate}>
        Update
      </button>

      <Link to="/">
        <button style={{ marginLeft: "10px", backgroundColor: "#6b7280" }}>
          Back
        </button>
      </Link>
    </div>
  );
}

export default IncidentDetail;
