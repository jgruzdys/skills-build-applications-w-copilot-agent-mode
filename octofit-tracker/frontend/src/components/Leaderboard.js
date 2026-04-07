import React, { useEffect, useState } from 'react';

const API_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboards/`;


function Leaderboard() {
  const [leaderboards, setLeaderboards] = useState([]);

  useEffect(() => {
    console.log('Fetching from:', API_URL);
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setLeaderboards(results);
        console.log('Fetched leaderboards:', results);
      })
      .catch(err => console.error('Error fetching leaderboards:', err));
  }, []);

  return (
    <div className="card shadow-sm p-4 mb-4">
      <h1 className="display-6 mb-4 text-primary">Leaderboard</h1>
      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-primary">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Team</th>
              <th scope="col">Total Points</th>
            </tr>
          </thead>
          <tbody>
            {leaderboards.map((entry, idx) => (
              <tr key={entry.id || idx}>
                <th scope="row">{idx + 1}</th>
                <td>{entry.team ? (entry.team.name || entry.team) : ''}</td>
                <td>{entry.total_points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaderboard;
