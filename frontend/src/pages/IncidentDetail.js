import { useEffect, useState } from "react";
import API from "../api";
import { useParams } from "react-router-dom";

function IncidentDetail() {
  const { id } = useParams();
  const [incident, setIncident] = useState(null);

  useEffect(() => {
    fetchIncident();
  }, []);

  const fetchIncident = async () => {
    const res = await API.get(`/incidents/${id}`);
    setIncident(res.data);
  };

  const handleChange = (e) => {
    setIncident({ ...incident, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    await API.patch(`/incidents/${id}`, incident);
    alert("Updated successfully");
  };

  if (!incident) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Incident Detail</h2>

      <input name="title" value={incident.title} onChange={handleChange} />
      <br /><br />

      <select name="status" value={incident.status} onChange={handleChange}>
        <option value="OPEN">OPEN</option>
        <option value="MITIGATED">MITIGATED</option>
        <option value="RESOLVED">RESOLVED</option>
      </select>

      <br /><br />

      <input name="owner" value={incident.owner || ""} onChange={handleChange} />

      <br /><br />

      <textarea name="summary" value={incident.summary || ""} onChange={handleChange} />

      <br /><br />

      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}

export default IncidentDetail;
