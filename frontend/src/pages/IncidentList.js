import { useEffect, useState } from "react";
import API from "../api";
import { Link } from "react-router-dom";

function IncidentList() {
  const [incidents, setIncidents] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [severity, setSeverity] = useState("");
  const [status, setStatus] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");

  // Sorting handler
  const handleSort = (field) => {
    if (sortBy === field) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setOrder("asc");
    }
  };

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  // Reset page when filters/search change
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, severity, status]);

  // Fetch data (moved inside useEffect to fix ESLint warning)
  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        setLoading(true);

        const res = await API.get("/incidents", {
          params: {
            page,
            limit: 10,
            search: debouncedSearch,
            severity,
            status,
            sortBy,
            order,
          },
        });

        setIncidents(res.data.incidents || []);
        setTotalPages(res.data.totalPages || 1);
      } catch (err) {
        console.error("Error fetching incidents:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchIncidents();
  }, [page, debouncedSearch, severity, status, sortBy, order]);

  return (
    <div className="container">
      {/* Top Bar */}
      <div className="top-bar">
        <h2>Incident Tracker</h2>
        <Link to="/create">
          <button>Create Incident</button>
        </Link>
      </div>

      {/* Filters */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={severity} onChange={(e) => setSeverity(e.target.value)}>
          <option value="">All Severities</option>
          <option value="SEV1">SEV1</option>
          <option value="SEV2">SEV2</option>
          <option value="SEV3">SEV3</option>
          <option value="SEV4">SEV4</option>
        </select>

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All Status</option>
          <option value="OPEN">OPEN</option>
          <option value="MITIGATED">MITIGATED</option>
          <option value="RESOLVED">RESOLVED</option>
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <p style={{ textAlign: "center" }}>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort("title")}>Title</th>
              <th>Service</th>
              <th onClick={() => handleSort("severity")}>Severity</th>
              <th onClick={() => handleSort("status")}>Status</th>
              <th>Owner</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {incidents.length > 0 ? (
              incidents.map((inc) => (
                <tr key={inc._id}>
                  <td>{inc.title}</td>
                  <td>{inc.service}</td>

                  <td>
                    <span className={`badge severity-${inc.severity}`}>
                      {inc.severity}
                    </span>
                  </td>

                  <td>
                    <span className={`badge status-${inc.status}`}>
                      {inc.status}
                    </span>
                  </td>

                  <td>{inc.owner || "-"}</td>

                  <td>
                    <Link to={`/incident/${inc._id}`}>View</Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No incidents found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* Pagination */}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>

        <span style={{ margin: "0 10px" }}>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default IncidentList;
