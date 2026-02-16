import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function CreateIncident() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    service: "",
    severity: "SEV1",
    owner: "",
    summary: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/incidents", form);
      navigate("/");
    } catch (err) {
      alert("Error creating incident");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Create Incident</h2>

      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" onChange={handleChange} required />
        <br /><br />

        <input name="service" placeholder="Service" onChange={handleChange} required />
        <br /><br />

        <select name="severity" onChange={handleChange}>
          <option value="SEV1">SEV1</option>
          <option value="SEV2">SEV2</option>
          <option value="SEV3">SEV3</option>
          <option value="SEV4">SEV4</option>
        </select>

        <br /><br />

        <input name="owner" placeholder="Owner" onChange={handleChange} />
        <br /><br />

        <textarea name="summary" placeholder="Summary" onChange={handleChange} />

        <br /><br />

        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateIncident;
