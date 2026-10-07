import React, { useEffect, useState } from 'react';

function StatusDashboard() {
  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const res = await fetch("http://localhost:3000/status"); // backend endpoint
        const data = await res.json();
        setStatuses(data);
      } catch (err) {
        console.error("Error fetching statuses:", err);
      }
    };

    // Initial fetch
    fetchStatuses();

    // Poll every 5 seconds
    const interval = setInterval(fetchStatuses, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="status-dashboard">
      <h2>Campaign Status Dashboard</h2>
      {statuses.length === 0 ? (
        <p>No campaigns yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Platform</th>
              <th>Caption</th>
              <th>Status</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {statuses.map((s, idx) => (
              <tr key={idx}>
                <td>{s.platform}</td>
                <td>{s.caption}</td>
                <td>{s.status}</td>
                <td>{s.updatedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default StatusDashboard;
